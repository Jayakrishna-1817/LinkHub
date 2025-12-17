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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Folder</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React Tutorials"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {folderIcons.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`text-2xl p-2 rounded-lg transition ${
                    icon === i ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Color
            </label>
            <div className="flex flex-wrap gap-2">
              {folderColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg transition ${
                    color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
