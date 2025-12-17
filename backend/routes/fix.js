const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const Folder = require('../models/Folder');
const authMiddleware = require('../middleware/auth');

// Fix existing data - set isDeleted to false for all items that don't have it set
router.post('/fix-data', authMiddleware, async (req, res) => {
  try {
    // Update all links without isDeleted set
    const linksResult = await Link.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false } }
    );

    // Update all folders without isDeleted set
    const foldersResult = await Folder.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false } }
    );

    res.json({
      message: 'Data fixed successfully',
      linksUpdated: linksResult.modifiedCount,
      foldersUpdated: foldersResult.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fixing data', error: error.message });
  }
});

module.exports = router;
