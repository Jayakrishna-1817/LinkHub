import { useState } from 'react';
import { linkAPI } from '../services/api';
import { useLinkStore } from '../store/linkStore';
import toast from 'react-hot-toast';

export default function AddLinkModal({ onClose }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { addLink } = useLinkStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      // Send without folderId - backend will auto-create folders
      const response = await linkAPI.create({ url });
      toast.success(response.data.message || 'Link added successfully!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Link</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Link URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
              required
              autoFocus
            />
            <p className="mt-2 text-xs text-gray-500">
              🤖 Folders will be created automatically based on link content
            </p>
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
              {loading ? 'Adding...' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
