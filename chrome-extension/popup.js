// Popup Script for Smart Bookmark Organizer

// Load settings and stats on popup open
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadStats();
  setupEventListeners();
});

// Load settings
async function loadSettings() {
  const settings = await chrome.storage.sync.get({
    autoOrganize: true,
    notifyUser: true
  });
  
  document.getElementById('autoOrganizeToggle').checked = settings.autoOrganize;
  document.getElementById('notifyToggle').checked = settings.notifyUser;
}

// Load statistics
async function loadStats() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'getStats' });
    const stats = response || {};
    
    console.log('📊 Loaded stats:', stats);
    
    // Update total organized (default to 0 if undefined)
    const totalOrganized = stats.totalOrganized || 0;
    document.getElementById('totalOrganized').textContent = totalOrganized;
    
    // Calculate number of categories
    const categories = Object.keys(stats).filter(key => key !== 'totalOrganized');
    document.getElementById('categoriesUsed').textContent = categories.length;
    
    // Show top categories
    displayTopCategories(stats);
  } catch (error) {
    console.error('Error loading stats:', error);
    // Set defaults on error
    document.getElementById('totalOrganized').textContent = '0';
    document.getElementById('categoriesUsed').textContent = '0';
  }
}

// Display top categories
function displayTopCategories(stats) {
  const categoriesContainer = document.getElementById('topCategories');
  
  // Remove totalOrganized from categories
  const categories = Object.entries(stats)
    .filter(([key]) => key !== 'totalOrganized')
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5
  
  if (categories.length === 0) {
    categoriesContainer.innerHTML = '<div class="empty-state">No bookmarks organized yet</div>';
    return;
  }
  
  categoriesContainer.innerHTML = categories.map(([category, count]) => `
    <div class="category-item">
      <span class="category-name">${getCategoryEmoji(category)} ${category}</span>
      <span class="category-count">${count}</span>
    </div>
  `).join('');
}

// Get emoji for category
function getCategoryEmoji(category) {
  const emojiMap = {
    'Social Media': '📱',
    'Technology': '💻',
    'Entertainment': '🎬',
    'Shopping': '🛒',
    'News': '📰',
    'Education': '📚',
    'Productivity': '⚡',
    'Finance': '💰',
    'Health & Fitness': '💪',
    'Travel': '✈️',
    'Other': '📂'
  };
  return emojiMap[category] || '📁';
}

// Setup event listeners
function setupEventListeners() {
  // Auto-organize toggle
  document.getElementById('autoOrganizeToggle').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({ autoOrganize: e.target.checked });
    showStatus(e.target.checked ? '✓ Auto-organize enabled' : '⏸️ Auto-organize disabled', 'success');
  });
  
  // Notify toggle
  document.getElementById('notifyToggle').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({ notifyUser: e.target.checked });
    showStatus(e.target.checked ? '✓ Notifications enabled' : '🔕 Notifications disabled', 'success');
  });
  
  // Organize existing bookmarks
  document.getElementById('organizeExisting').addEventListener('click', async () => {
    const button = document.getElementById('organizeExisting');
    button.disabled = true;
    button.innerHTML = '<span>⏳</span> Organizing...';
    
    showStatus('Organizing all bookmarks...', 'info');
    
    try {
      const result = await chrome.runtime.sendMessage({ action: 'organizeExisting' });
      
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError.message);
      }
      
      showStatus(`✓ Successfully organized ${result.organized} bookmarks!`, 'success');
      button.disabled = false;
      button.innerHTML = '<span>📁</span> Organize All Existing Bookmarks';
      
      // Reload stats after a short delay to ensure they're updated
      setTimeout(async () => {
        await loadStats();
      }, 500);
    } catch (error) {
      showStatus('❌ Error: ' + error.message, 'error');
      button.disabled = false;
      button.innerHTML = '<span>📁</span> Organize All Existing Bookmarks';
    }
  });
  
  // Open options
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

// Show status message
function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.classList.remove('hidden');
  
  setTimeout(() => {
    statusDiv.classList.add('hidden');
  }, 3000);
}
