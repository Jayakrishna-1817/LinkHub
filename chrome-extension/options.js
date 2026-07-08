// Options page script

// Default categories
const defaultCategories = [
  { name: 'Social Media', emoji: '📱', enabled: true },
  { name: 'Technology', emoji: '💻', enabled: true },
  { name: 'Entertainment', emoji: '🎬', enabled: true },
  { name: 'Shopping', emoji: '🛒', enabled: true },
  { name: 'News', emoji: '📰', enabled: true },
  { name: 'Education', emoji: '📚', enabled: true },
  { name: 'Productivity', emoji: '⚡', enabled: true },
  { name: 'Finance', emoji: '💰', enabled: true },
  { name: 'Health & Fitness', emoji: '💪', enabled: true },
  { name: 'Travel', emoji: '✈️', enabled: true },
];

// Load settings on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadStats();
  await loadCategories();
  setupEventListeners();
});

// Load all settings
async function loadSettings() {
  const settings = await chrome.storage.sync.get({
    autoOrganize: true,
    notifyUser: true,
    usePageContent: false,
    organizationMode: 'hierarchical',
    defaultLocation: 'bookmarks-bar',
    enabledCategories: defaultCategories
  });
  
  document.getElementById('autoOrganize').checked = settings.autoOrganize;
  document.getElementById('notifyUser').checked = settings.notifyUser;
  document.getElementById('usePageContent').checked = settings.usePageContent;
  document.getElementById('organizationMode').value = settings.organizationMode;
  document.getElementById('defaultLocation').value = settings.defaultLocation;
}

// Load statistics
async function loadStats() {
  chrome.runtime.sendMessage({ action: 'getStats' }, (stats) => {
    if (!stats) return;
    
    document.getElementById('totalOrganized').textContent = stats.totalOrganized || 0;
    
    const categories = Object.keys(stats).filter(key => key !== 'totalOrganized');
    document.getElementById('categoriesUsed').textContent = categories.length;
    
    // Estimate folders created (categories * average sub-folders)
    const foldersCreated = categories.length * 2; // Rough estimate
    document.getElementById('foldersCreated').textContent = foldersCreated;
  });
}

// Load and display categories
async function loadCategories() {
  const settings = await chrome.storage.sync.get({
    enabledCategories: defaultCategories
  });
  
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = settings.enabledCategories.map((cat, index) => `
    <div class="category-toggle">
      <label>
        <input type="checkbox" class="category-checkbox" data-index="${index}" ${cat.enabled ? 'checked' : ''}>
        <span class="category-label">
          <span class="category-emoji">${cat.emoji}</span>
          <span class="category-name">${cat.name}</span>
        </span>
      </label>
    </div>
  `).join('');
  
  // Add event listeners to category checkboxes
  document.querySelectorAll('.category-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', saveCategorySettings);
  });
}

// Save category settings
async function saveCategorySettings() {
  const settings = await chrome.storage.sync.get({ enabledCategories: defaultCategories });
  const categories = settings.enabledCategories;
  
  document.querySelectorAll('.category-checkbox').forEach(checkbox => {
    const index = parseInt(checkbox.dataset.index);
    categories[index].enabled = checkbox.checked;
  });
  
  await chrome.storage.sync.set({ enabledCategories: categories });
  showSaveStatus('Categories updated ✓');
}

// Setup all event listeners
function setupEventListeners() {
  // General settings
  document.getElementById('autoOrganize').addEventListener('change', saveSettings);
  document.getElementById('notifyUser').addEventListener('change', saveSettings);
  document.getElementById('usePageContent').addEventListener('change', saveSettings);
  document.getElementById('organizationMode').addEventListener('change', saveSettings);
  document.getElementById('defaultLocation').addEventListener('change', saveSettings);
  
  // Actions
  document.getElementById('organizeAll').addEventListener('click', organizeAllBookmarks);
  document.getElementById('exportSettings').addEventListener('click', exportSettings);
  document.getElementById('importSettings').addEventListener('click', importSettings);
  document.getElementById('resetSettings').addEventListener('click', resetSettings);
  document.getElementById('resetStats').addEventListener('click', resetStats);
}

// Save settings
async function saveSettings() {
  const settings = {
    autoOrganize: document.getElementById('autoOrganize').checked,
    notifyUser: document.getElementById('notifyUser').checked,
    usePageContent: document.getElementById('usePageContent').checked,
    organizationMode: document.getElementById('organizationMode').value,
    defaultLocation: document.getElementById('defaultLocation').value
  };
  
  await chrome.storage.sync.set(settings);
  showSaveStatus('Settings saved ✓');
}

// Organize all bookmarks
async function organizeAllBookmarks() {
  const button = document.getElementById('organizeAll');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = '⏳ Organizing...';
  
  chrome.runtime.sendMessage({ action: 'organizeExisting' }, async (result) => {
    button.disabled = false;
    button.textContent = originalText;
    
    if (result) {
      showSaveStatus(`✓ Organized ${result.organized} bookmarks!`, 'success');
      await loadStats();
    } else {
      showSaveStatus('Failed to organize bookmarks', 'error');
    }
  });
}

// Export settings
async function exportSettings() {
  const settings = await chrome.storage.sync.get(null);
  const stats = await new Promise(resolve => {
    chrome.runtime.sendMessage({ action: 'getStats' }, resolve);
  });
  
  const exportData = {
    settings,
    stats,
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bookmark-organizer-settings-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  showSaveStatus('Settings exported ✓');
}

// Import settings
function importSettings() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    
    try {
      const importData = JSON.parse(text);
      
      if (importData.settings) {
        await chrome.storage.sync.set(importData.settings);
        await loadSettings();
        await loadCategories();
        showSaveStatus('Settings imported ✓', 'success');
      }
    } catch (error) {
      showSaveStatus('Invalid settings file', 'error');
    }
  };
  
  input.click();
}

// Reset settings
async function resetSettings() {
  if (!confirm('Reset all settings to defaults?')) return;
  
  await chrome.storage.sync.clear();
  await chrome.storage.sync.set({
    autoOrganize: true,
    notifyUser: true,
    usePageContent: false,
    organizationMode: 'hierarchical',
    defaultLocation: 'bookmarks-bar',
    enabledCategories: defaultCategories
  });
  
  await loadSettings();
  await loadCategories();
  showSaveStatus('Settings reset to defaults ✓');
}

// Reset statistics
async function resetStats() {
  if (!confirm('Clear all statistics?')) return;
  
  await chrome.storage.local.set({ stats: {} });
  await loadStats();
  showSaveStatus('Statistics cleared ✓');
}

// Show save status
function showSaveStatus(message, type = 'success') {
  const status = document.getElementById('saveStatus');
  status.textContent = message;
  status.className = `save-status ${type}`;
  status.classList.remove('hidden');
  
  setTimeout(() => {
    status.classList.add('hidden');
  }, 3000);
}
