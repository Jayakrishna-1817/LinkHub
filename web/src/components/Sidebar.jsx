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
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700/50 backdrop-blur-sm">
        <button 
          onClick={() => setSelectedFolder(null)}
          className="flex items-center gap-3 text-2xl font-bold text-white hover:text-blue-400 transition-all duration-300 group"
        >
          <Logo size={40} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LinkHub</span>
        </button>
        <p className="text-base font-semibold text-slate-200 mt-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
          {user?.name}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Folders</h2>
          <button
            onClick={onAddFolder}
            className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-110 transition-transform duration-200 text-lg font-bold shadow-lg"
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
                  className={`flex-1 text-left px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                    !hasSubFolders ? 'ml-8' : ''
                  } ${
                    selectedFolder?._id === folder._id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg scale-105'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-102'
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
                    className={`flex-1 text-left px-4 py-3 pl-12 rounded-xl mb-2 transition-all duration-200 text-sm ${
                      selectedFolder?._id === subFolder._id
                        ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white font-semibold shadow-md'
                        : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'
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

      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}
