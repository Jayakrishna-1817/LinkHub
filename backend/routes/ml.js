const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Folder = require('../models/Folder');
const { predictCategory, suggestFolderName, categoryKeywords } = require('../utils/mlClassifier');

// Analyze a URL and suggest folder
router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { title, description, tags, source } = req.body;

    // Get user's existing folders
    const userFolders = await Folder.find({ userId: req.userId });

    // Predict category
    const prediction = predictCategory(title, description, tags);

    // Suggest folder name
    const suggestedName = suggestFolderName(title, description, source);

    // Find matching existing folders
    const matchingFolders = userFolders.filter(folder => {
      const folderNameLower = folder.name.toLowerCase();
      const predictedLower = prediction.predictedCategory.toLowerCase();
      return folderNameLower.includes(predictedLower) || 
             predictedLower.includes(folderNameLower);
    });

    res.json({
      prediction,
      suggestedFolderName: suggestedName,
      matchingFolders,
      message: matchingFolders.length > 0 
        ? `Found ${matchingFolders.length} matching folder(s)` 
        : 'No matching folders found. New folder will be created.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get available categories
router.get('/categories', (req, res) => {
  res.json({
    categories: Object.keys(categoryKeywords),
    totalCategories: Object.keys(categoryKeywords).length
  });
});

module.exports = router;
