import { useState } from 'react';
import { folderAPI } from '../services/api';
import { useLinkStore } from '../store/linkStore';
import toast from 'react-hot-toast';

const folderIcons = ['📁', '📚', '🎥', '💻', '🎨', '📝', '🔧', '🎯', '🚀', '⭐'];
const folderColors = ['#3B82F6', '#8B5CF6', '#10B981', '#EF4444', '#F59E0B', '#EC4899', '#06B6D4', '#6366F1'];

export default function AddFolderModal({ onClose }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📁');
  const [color, setColor] = useState('#3B82F6');
  const [loading, setLoading] = useState(false);
  const { addFolder } = useLinkStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    try {
      const response = await folderAPI.create({ name, icon, color });
      addFolder(response.data);
      toast.success('Folder created!');
      onClose();
    } catch (error) {
      toast.error('Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scaleIn">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <span className="text-3xl">📁</span>
          Create New Folder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Folder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-gray-700 font-semibold"
              placeholder="e.g., React Tutorials"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Choose Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {folderIcons.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`text-3xl p-3 rounded-xl transition-all duration-200 ${
                    icon === i ? 'bg-gradient-to-r from-blue-100 to-purple-100 ring-4 ring-blue-300 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Choose Color
            </label>
            <div className="flex flex-wrap gap-3">
              {folderColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 ${
                    color === c ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-5 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:scale-100 font-bold"
            >
              {loading ? '⏳ Creating...' : '✨ Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
