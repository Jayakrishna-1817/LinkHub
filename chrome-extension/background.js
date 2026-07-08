// Background Service Worker for Smart Bookmark Organizer

console.log('🚀 Smart Bookmark Organizer - Background script loading...');
console.log('📅 Loading at:', new Date().toLocaleString());
console.log('🔧 Extension ID:', chrome.runtime.id);

// Import classifier (note: in manifest v3, we need to load it differently)
try {
  importScripts('classifier.js');
  console.log('✅ Classifier loaded successfully');
  console.log('📦 classifyBookmark function available:', typeof classifyBookmark);
} catch (error) {
  console.error('❌ Failed to load classifier:', error);
  console.error('❌ Error details:', error.message, error.stack);
}

// Test that we can listen for events
console.log('👂 Setting up bookmark listener...');

// Test that we can listen for events
console.log('👂 Setting up bookmark listener...');

// Listen for bookmark creation
chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
  console.log('');
  console.log('='.repeat(60));
  console.log('🎯 BOOKMARK EVENT TRIGGERED!');
  console.log('='.repeat(60));
  console.log('   ID:', id);
  console.log('   Bookmark object:', bookmark);
  console.log('   Title:', bookmark.title);
  console.log('   URL:', bookmark.url);
  console.log('   Parent ID:', bookmark.parentId);
  
  // Only process actual bookmarks (not folders)
  if (!bookmark.url) {
    console.log('⏭️ Skipping - this is a folder, not a bookmark');
    return;
  }
  
  console.log('📌 New bookmark detected:', bookmark.title, bookmark.url);
  
  // Get settings
  const settings = await chrome.storage.sync.get({
    autoOrganize: true,
    notifyUser: true,
    usePageContent: false
  });
  
  if (!settings.autoOrganize) {
    console.log('⏸️ Auto-organize is disabled');
    return;
  }
  
  try {
    // Get page content if needed (for better classification)
    let pageContent = '';
    if (settings.usePageContent) {
      try {
        const tabs = await chrome.tabs.query({ url: bookmark.url });
        if (tabs.length > 0) {
          const result = await chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageContent' });
          pageContent = result?.content || '';
        }
      } catch (e) {
        console.log('Could not get page content:', e.message);
      }
    }
    
    // Classify the bookmark
    const classification = classifyBookmark(bookmark.url, bookmark.title, pageContent);
    
    console.log('🎯 Classification:', classification);
    console.log('📂 Creating folders:', classification.mainFolder, '→', classification.subFolder);
    
    // Get or create folder hierarchy
    const targetFolderId = await getOrCreateFolderPath(
      classification.mainFolder,
      classification.subFolder
    );
    
    console.log('📁 Target folder ID:', targetFolderId);
    
    // Small delay to ensure folder is fully created
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get current bookmark location before move
    const beforeMove = await chrome.bookmarks.get(id);
    console.log('📍 Bookmark location BEFORE move - Parent:', beforeMove[0].parentId);
    
    // Move bookmark to the organized folder
    console.log('🔄 Moving bookmark', id, 'to folder', targetFolderId);
    const movedBookmark = await chrome.bookmarks.move(id, { parentId: targetFolderId });
    
    // Verify the move worked
    const afterMove = await chrome.bookmarks.get(id);
    console.log('📍 Bookmark location AFTER move - Parent:', afterMove[0].parentId);
    
    if (afterMove[0].parentId !== targetFolderId) {
      console.error('❌ MOVE FAILED! Expected parent:', targetFolderId, 'Got:', afterMove[0].parentId);
      // Try moving again
      console.log('🔄 Retrying move...');
      await chrome.bookmarks.move(id, { parentId: targetFolderId });
    }
    
    console.log('✅ Bookmark organized successfully!');
    console.log('📍 Final location - Bookmark ID:', movedBookmark.id, 'Parent ID:', movedBookmark.parentId);
    console.log('📍 Bookmark URL:', movedBookmark.url);
    console.log('📍 Bookmark Title:', movedBookmark.title);
    
    // Show notification if enabled
    if (settings.notifyUser) {
      try {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'Bookmark Organized',
          message: `Moved to ${classification.mainFolder} → ${classification.subFolder}`,
          priority: 1
        });
      } catch (notifError) {
        console.log('Could not show notification:', notifError.message);
      }
    }
    
    // Update statistics
    updateStats(classification.mainFolder);
    
  } catch (error) {
    console.error('❌ Error organizing bookmark:', error);
    
    // Show error notification
    try {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Bookmark Organization Failed',
        message: 'Could not auto-organize this bookmark',
        priority: 1
      });
    } catch (notifError) {
      console.log('Could not show error notification:', notifError.message);
    }
  }
});

console.log('✅ Bookmark listener registered successfully!');
console.log('🎯 Ready to auto-organize bookmarks');
console.log('');

// Handle extension icon click - AUTOMATIC BOOKMARKING
chrome.action.onClicked.addListener(async (tab) => {
  console.log('');
  console.log('🌟 EXTENSION ICON CLICKED - AUTO BOOKMARK MODE');
  console.log('📄 Current tab:', tab.title);
  console.log('🔗 URL:', tab.url);
  
  try {
    // Classify the page
    const classification = classifyBookmark(tab.url, tab.title, '');
    console.log('🎯 Classification:', classification);
    
    // Get or create the target folder
    const targetFolderId = await getOrCreateFolderPath(
      classification.mainFolder,
      classification.subFolder
    );
    
    console.log('📁 Target folder:', targetFolderId);
    
    // Create bookmark directly in the correct folder
    const bookmark = await chrome.bookmarks.create({
      parentId: targetFolderId,
      title: tab.title,
      url: tab.url
    });
    
    console.log('✅ Bookmark created directly in correct folder!');
    console.log('📍 Bookmark ID:', bookmark.id);
    console.log('📍 Parent folder:', bookmark.parentId);
    
    // Show success notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: '✓ Bookmark Added!',
      message: `${tab.title}\n📂 ${classification.mainFolder} → ${classification.subFolder}`,
      priority: 2
    });
    
    // Update stats
    updateStats(classification.mainFolder);
    
  } catch (error) {
    console.error('❌ Error creating bookmark:', error);
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: '❌ Bookmark Failed',
      message: 'Could not create bookmark',
      priority: 1
    });
  }
});

console.log('🖱️ Extension icon click listener registered!');
console.log('💡 Click the extension icon to auto-bookmark current page!');
console.log('');

// Update statistics
async function updateStats(category) {
  try {
    const result = await chrome.storage.local.get('stats');
    const currentStats = result.stats || {};
    
    currentStats[category] = (currentStats[category] || 0) + 1;
    currentStats.totalOrganized = (currentStats.totalOrganized || 0) + 1;
    
    await chrome.storage.local.set({ stats: currentStats });
    console.log('📊 Stats updated:', currentStats);
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'organizeExisting') {
    organizeExistingBookmarks().then(result => {
      sendResponse(result);
    });
    return true; // Async response
  }
  
  if (request.action === 'getStats') {
    chrome.storage.local.get('stats').then(data => {
      console.log('📊 Sending stats to popup:', data.stats);
      sendResponse(data.stats || {});
    }).catch(error => {
      console.error('Error getting stats:', error);
      sendResponse({});
    });
    return true;
  }
});

// Organize existing bookmarks
async function organizeExistingBookmarks() {
  try {
    const tree = await chrome.bookmarks.getTree();
    let organized = 0;
    let failed = 0;
    
    async function processNode(node) {
      if (node.url) {
        // It's a bookmark
        try {
          const classification = classifyBookmark(node.url, node.title);
          const targetFolderId = await getOrCreateFolderPath(
            classification.mainFolder,
            classification.subFolder
          );
          await chrome.bookmarks.move(node.id, { parentId: targetFolderId });
          organized++;
        } catch (e) {
          console.error('Failed to organize:', node.title, e);
          failed++;
        }
      } else if (node.children) {
        // It's a folder, process children
        for (const child of node.children) {
          await processNode(child);
        }
      }
    }
    
    await processNode(tree[0]);
    
    return { organized, failed };
  } catch (error) {
    console.error('Error organizing existing bookmarks:', error);
    throw error;
  }
}

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      autoOrganize: true,
      notifyUser: true,
      usePageContent: false
    });
    
    // Open welcome page
    chrome.tabs.create({ url: 'popup.html' });
  }
});

console.log('🚀 Smart Bookmark Organizer loaded!');
