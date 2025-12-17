const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const Folder = require('../models/Folder');
const authMiddleware = require('../middleware/auth');
const { extractLinkMetadata } = require('../utils/linkExtractor');
const { suggestHierarchicalFolder, predictCategory } = require('../utils/mlClassifier');

// Get all links for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { folderId, search, tag } = req.query;
    
    let query = { userId: req.userId };
    
    if (folderId) {
      query.folderId = folderId;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tag) {
      query.tags = tag;
    }

    const links = await Link.find(query)
      .populate('folderId')
      .sort({ deletedAt: -1, createdAt: -1 });
    
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper functions for folder icons and colors
function getIconForSource(source) {
  const iconMap = {
    'ChatGPT': '💬', 'YouTube': '🎥', 'GitHub': '💻', 'Medium': '📝',
    'Stack Overflow': '💡', 'GeeksforGeeks': '🤓', 'W3Schools': '📘',
    'MDN': '🦖', 'LeetCode': '🧩', 'HackerRank': '👨‍💻', 'CodePen': '✏️',
    'Dev.to': '📰', 'Reddit': '🔴', 'Twitter': '🐦', 'Onlinegdb': '⚙️',
    'Online': '🌐', 'Compiler': '⚙️', 'Other': '🔗'
  };
  return iconMap[source] || '🔗';
}

function getColorForSource(source) {
  const colorMap = {
    'ChatGPT': '#10A37F', 'YouTube': '#FF0000', 'GitHub': '#1F2937',
    'Medium': '#00AB6C', 'Stack Overflow': '#F48024', 'GeeksforGeeks': '#2F8D46',
    'W3Schools': '#04AA6D', 'MDN': '#83D0F2', 'LeetCode': '#FFA116',
    'HackerRank': '#00EA64', 'CodePen': '#000000', 'Dev.to': '#0A0A0A',
    'Reddit': '#FF4500', 'Twitter': '#1DA1F2', 'Onlinegdb': '#3B82F6',
    'Online': '#3B82F6', 'Compiler': '#3B82F6', 'Other': '#6B7280'
  };
  return colorMap[source] || '#6B7280';
}

function getIconForCategory(category) {
  const iconMap = {
    'Operating Systems': '🖥️', 'Computer Networks': '🌐', 'Data Structures': '🔢',
    'Database Management': '🗄️', 'Artificial Intelligence': '🤖',
    'React': '⚛️', 'JavaScript': '📜', 'Python': '🐍', 'Java': '☕',
    'C Programming': '©️', 'C++': '➕', 'Web Development': '🌍',
    'DevOps': '🔧', 'Mobile Development': '📱', 'Cyber Security': '🔒',
    'Cloud Computing': '☁️', 'Software Engineering': '⚙️', 'Blockchain': '⛓️',
    'Programming Tools': '🛠️', 'Development Tools': '🔨',
    'Interview Preparation': '📝', 'Salesforce': '☁️', 'Career & Jobs': '💼',
    'General': '📂'
  };
  return iconMap[category] || '📁';
}

function getColorForCategory(category) {
  const colorMap = {
    'Operating Systems': '#0078D4', 'Computer Networks': '#2196F3', 'Data Structures': '#9C27B0',
    'Database Management': '#14B8A6', 'Artificial Intelligence': '#8B5CF6',
    'React': '#61DAFB', 'JavaScript': '#F7DF1E', 'Python': '#3776AB', 'Java': '#007396',
    'C Programming': '#A8B9CC', 'C++': '#00599C', 'Web Development': '#10B981',
    'DevOps': '#F59E0B', 'Mobile Development': '#06B6D4', 'Cyber Security': '#EF4444',
    'Cloud Computing': '#4285F4', 'Software Engineering': '#6366F1', 'Blockchain': '#F2A900',
    'Interview Preparation': '#10B981', 'Salesforce': '#00A1E0', 'Career & Jobs': '#7C3AED'
  };
  return colorMap[category] || '#3B82F6';
}

// Create new link with hierarchical ML-based auto-classification
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { url, folderId } = req.body;

    // Extract metadata from URL
    const metadata = await extractLinkMetadata(url);

    let targetFolderId = folderId;
    let mlPrediction = null;
    let createdFolders = [];

    // If no folder specified, use ML to create hierarchical folder structure
    if (!folderId) {
      // Get hierarchical folder suggestion
      const hierarchy = suggestHierarchicalFolder(
        url,
        metadata.title || url,
        metadata.description || ''
      );

      mlPrediction = {
        mainFolder: hierarchy.mainFolder,
        subFolder: hierarchy.subFolder,
        confidence: hierarchy.confidence
      };

      // Find or create main folder (e.g., "ChatGPT")
      let mainFolder = await Folder.findOne({
        userId: req.userId,
        name: hierarchy.mainFolder,
        parentId: null
      });

      if (!mainFolder) {
        mainFolder = new Folder({
          name: hierarchy.mainFolder,
          icon: getIconForSource(hierarchy.mainFolder),
          color: getColorForSource(hierarchy.mainFolder),
          userId: req.userId,
          parentId: null,
          isSubFolder: false
        });
        await mainFolder.save();
        createdFolders.push(mainFolder);

        // Emit folder creation event
        const io = req.app.get('io');
        io.emit('folder:created', { folder: mainFolder, userId: req.userId });
      }

      // Find or create sub-folder (e.g., "Operating Systems" under "ChatGPT")
      let subFolder = await Folder.findOne({
        userId: req.userId,
        name: hierarchy.subFolder,
        parentId: mainFolder._id
      });

      if (!subFolder) {
        subFolder = new Folder({
          name: hierarchy.subFolder,
          icon: getIconForCategory(hierarchy.subFolder),
          color: getColorForCategory(hierarchy.subFolder),
          userId: req.userId,
          parentId: mainFolder._id,
          isSubFolder: true
        });
        await subFolder.save();
        createdFolders.push(subFolder);

        // Emit folder creation event
        const io = req.app.get('io');
        io.emit('folder:created', { folder: subFolder, userId: req.userId });
      }

      targetFolderId = subFolder._id;
    }

    // Verify folder belongs to user
    const folder = await Folder.findOne({ _id: targetFolderId, userId: req.userId });
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    const link = new Link({
      url,
      title: metadata.title || url,
      description: metadata.description || '',
      thumbnail: metadata.thumbnail || '',
      source: metadata.source || 'other',
      tags: metadata.tags || [],
      metadata: metadata.additionalInfo || {},
      folderId: targetFolderId,
      userId: req.userId
    });

    await link.save();

    // Populate folder info
    await link.populate('folderId');

    // Emit socket event
    const io = req.app.get('io');
    io.emit('link:created', { link, userId: req.userId });

    res.status(201).json({
      link,
      mlPrediction,
      createdFolders,
      message: createdFolders.length > 0 
        ? `Created ${createdFolders.length} folder(s): ${createdFolders.map(f => f.name).join(' > ')}` 
        : 'Added to existing folder'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update link
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, tags, folderId, isFavorite } = req.body;

    const link = await Link.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, tags, folderId, isFavorite, updatedAt: Date.now() },
      { new: true }
    ).populate('folderId');

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Emit socket event
    const io = req.app.get('io');
    io.emit('link:updated', { link, userId: req.userId });

    res.json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete link permanently
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Emit socket event
    const io = req.app.get('io');
    io.emit('link:deleted', { linkId: req.params.id, userId: req.userId });

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
