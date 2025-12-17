const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const authMiddleware = require('../middleware/auth');

// Get all folders for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new folder
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, color, icon, description } = req.body;

    const folder = new Folder({
      name,
      color,
      icon,
      description,
      userId: req.userId
    });

    await folder.save();

    // Emit socket event
    const io = req.app.get('io');
    io.emit('folder:created', { folder, userId: req.userId });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update folder
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, color, icon, description } = req.body;

    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, color, icon, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Emit socket event
    const io = req.app.get('io');
    io.emit('folder:updated', { folder, userId: req.userId });

    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete folder permanently
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const Link = require('../models/Link');
    
    const folder = await Folder.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Delete all child folders
    await Folder.deleteMany({ parentId: req.params.id, userId: req.userId });
    
    // Delete all links in this folder and child folders
    const childFolders = await Folder.find({ parentId: req.params.id, userId: req.userId });
    const folderIds = [req.params.id, ...childFolders.map(f => f._id)];
    await Link.deleteMany({ folderId: { $in: folderIds }, userId: req.userId });
    
    // Delete the folder itself
    await Folder.findByIdAndDelete(req.params.id);

    // Emit socket event
    const io = req.app.get('io');
    io.emit('folder:deleted', { folderId: req.params.id, userId: req.userId });

    res.json({ message: 'Folder and all contents deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
