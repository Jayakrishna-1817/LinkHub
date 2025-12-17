const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    enum: ['youtube', 'github', 'medium', 'twitter', 'stackoverflow', 'reddit', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  metadata: {
    author: String,
    publishedDate: Date,
    duration: String,
    views: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

linkSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

linkSchema.index({ userId: 1, createdAt: -1 });
linkSchema.index({ tags: 1 });

module.exports = mongoose.model('Link', linkSchema);
