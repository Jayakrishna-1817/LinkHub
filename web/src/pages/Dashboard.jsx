import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLinkStore } from '../store/linkStore';
import { folderAPI, linkAPI } from '../services/api';
import { getSocket } from '../services/socket';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LinkGrid from '../components/LinkGrid';
import AddLinkModal from '../components/AddLinkModal';
import AddFolderModal from '../components/AddFolderModal';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { links, folders, selectedFolder, setSelectedFolder, setLinks, setFolders, addLink, updateLink, deleteLink, addFolder, updateFolder, deleteFolder } = useLinkStore();
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    setupSocketListeners();
  }, []);

  const loadData = async () => {
    try {
      const [foldersRes, linksRes] = await Promise.all([
        folderAPI.getAll(),
        linkAPI.getAll()
      ]);
      setFolders(foldersRes.data);
      setLinks(linksRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    const socket = getSocket();

    socket.on('link:created', ({ link, userId }) => {
      if (userId === user.id) {
        loadData();
      }
    });

    socket.on('link:updated', ({ link, userId }) => {
      if (userId === user.id) {
        updateLink(link);
      }
    });

    socket.on('link:deleted', ({ linkId, userId }) => {
      if (userId === user.id) {
        deleteLink(linkId);
      }
    });

    socket.on('folder:created', ({ folder, userId }) => {
      if (userId === user.id) {
        loadData();
      }
    });

    socket.on('folder:updated', ({ folder, userId }) => {
      if (userId === user.id) {
        updateFolder(folder);
      }
    });

    socket.on('folder:deleted', ({ folderId, userId }) => {
      if (userId === user.id) {
        deleteFolder(folderId);
        loadData();
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
      <Sidebar 
        folders={folders} 
        onAddFolder={() => setShowAddFolder(true)}
        onFolderDeleted={loadData}
      />
      
      <div className="flex-1 flex flex-col">
        <Header onAddLink={() => setShowAddLink(true)} />
        
        <main className="flex-1 p-8">
          {selectedFolder && !selectedFolder.isSubFolder ? (
            // Show sub-folders if main folder is selected
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span className="text-4xl">{selectedFolder.icon}</span>
                {selectedFolder.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders
                  .filter(f => f.parentId === selectedFolder._id)
                  .map(subFolder => (
                    <button
                      key={subFolder._id}
                      onClick={() => setSelectedFolder(subFolder)}
                      className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-400 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{subFolder.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {subFolder.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        📎 {links.filter(l => l.folderId?._id === subFolder._id).length} links
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          ) : selectedFolder ? (
            // Show links for selected sub-folder
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span className="text-4xl">{selectedFolder.icon}</span>
                {selectedFolder.name}
              </h2>
              <LinkGrid links={links.filter(l => l.folderId?._id === selectedFolder._id)} />
            </div>
          ) : (
            // Show all main folders when nothing is selected
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span className="text-4xl">📂</span>
                All Folders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders
                  .filter(f => !f.parentId)
                  .map(folder => (
                    <button
                      key={folder._id}
                      onClick={() => setSelectedFolder(folder)}
                      className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-400 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{folder.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {folder.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        📁 {folders.filter(sub => sub.parentId === folder._id).length} sub-folders
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {showAddLink && (
        <AddLinkModal 
          onClose={() => setShowAddLink(false)} 
        />
      )}

      {showAddFolder && (
        <AddFolderModal onClose={() => setShowAddFolder(false)} />
      )}
    </div>
  );
}
