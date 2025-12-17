import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLinkStore } from '../store/linkStore';
import Logo from './Logo';

import { folderAPI } from '../services/api';

export default function Sidebar({ folders, onAddFolder, onFolderDeleted }) {
  const { user, logout } = useAuthStore();
  const { selectedFolder, setSelectedFolder } = useLinkStore();
  const [expandedFolders, setExpandedFolders] = useState({});

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleDeleteFolder = async (e, folderId) => {
    e.stopPropagation();
    if (window.confirm('Delete this folder and all its contents?')) {
      try {
        await folderAPI.delete(folderId);
        if (selectedFolder?._id === folderId) {
          setSelectedFolder(null);
        }
        if (onFolderDeleted) onFolderDeleted(folderId);
      } catch (error) {
        console.error('Delete folder error:', error);
        alert('Failed to delete folder');
      }
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={() => setSelectedFolder(null)}
          className="flex items-center gap-3 text-2xl font-bold text-gray-800 hover:text-blue-600 transition group"
        >
          <Logo size={40} className="group-hover:scale-110 transition-transform" />
          <span>LinkHub</span>
        </button>
        <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase">Folders</h2>
          <button
            onClick={onAddFolder}
            className="text-blue-600 hover:text-blue-700 text-xl"
            title="Add folder"
          >
            +
          </button>
        </div>

        {folders.filter(f => !f.parentId).map((folder) => {
          const subFolders = folders.filter(sub => sub.parentId === folder._id);
          const hasSubFolders = subFolders.length > 0;
          const isExpanded = expandedFolders[folder._id];
          
          return (
            <div key={folder._id}>
              <div className="flex items-center group">
                {hasSubFolders && (
                  <button
                    onClick={() => toggleFolder(folder._id)}
                    className="px-2 py-3 text-gray-500 hover:text-gray-700"
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedFolder(folder);
                    if (hasSubFolders && !isExpanded) {
                      toggleFolder(folder._id);
                    }
                  }}
                  className={`flex-1 text-left px-4 py-3 rounded-lg mb-1 transition ${
                    !hasSubFolders ? 'ml-8' : ''
                  } ${
                    selectedFolder?._id === folder._id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{folder.icon}</span>
                  {folder.name}
                  {hasSubFolders && (
                    <span className="ml-2 text-xs text-gray-500">({subFolders.length})</span>
                  )}
                </button>
                <button
                  onClick={(e) => handleDeleteFolder(e, folder._id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 px-2 text-sm transition"
                  title="Delete folder"
                >
                  🗑️
                </button>
              </div>
              
              {isExpanded && subFolders.map((subFolder) => (
                <div key={subFolder._id} className="flex items-center group">
                  <button
                    onClick={() => setSelectedFolder(subFolder)}
                    className={`flex-1 text-left px-4 py-3 pl-12 rounded-lg mb-1 transition text-sm ${
                      selectedFolder?._id === subFolder._id
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{subFolder.icon}</span>
                    {subFolder.name}
                  </button>
                  <button
                    onClick={(e) => handleDeleteFolder(e, subFolder._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 px-2 text-sm transition"
                    title="Delete folder"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
