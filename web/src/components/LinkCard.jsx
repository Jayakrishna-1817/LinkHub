import { linkAPI } from '../services/api';
import { useLinkStore } from '../store/linkStore';
import toast from 'react-hot-toast';

const sourceIcons = {
  youtube: '🎥',
  github: '💻',
  medium: '📝',
  twitter: '🐦',
  stackoverflow: '💡',
  reddit: '🔴',
  other: '🔗'
};

const sourceColors = {
  youtube: 'bg-red-50 text-red-700',
  github: 'bg-gray-50 text-gray-700',
  medium: 'bg-green-50 text-green-700',
  twitter: 'bg-blue-50 text-blue-700',
  stackoverflow: 'bg-orange-50 text-orange-700',
  reddit: 'bg-orange-50 text-orange-700',
  other: 'bg-purple-50 text-purple-700'
};

export default function LinkCard({ link }) {
  const { updateLink, deleteLink } = useLinkStore();

  // Add safe defaults
  const safeLink = {
    ...link,
    source: link.source || 'other',
    tags: link.tags || [],
    title: link.title || 'Untitled',
    url: link.url || '#'
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await linkAPI.delete(link._id);
      deleteLink(link._id);
      toast.success('Link deleted');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const response = await linkAPI.update(link._id, {
        ...link,
        isFavorite: !link.isFavorite
      });
      updateLink(response.data);
    } catch (error) {
      toast.error('Failed to update link');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
      {safeLink.thumbnail && (
        <img
          src={safeLink.thumbnail}
          alt={safeLink.title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}

      <div className="flex items-start justify-between mb-2">
        <div className={`px-2 py-1 rounded text-xs font-semibold ${sourceColors[safeLink.source] || sourceColors.other}`}>
          {sourceIcons[safeLink.source] || sourceIcons.other} {safeLink.source.toUpperCase()}
        </div>
        <button
          onClick={handleToggleFavorite}
          className="text-xl"
        >
          {safeLink.isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
        {safeLink.title}
      </h3>

      {safeLink.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {safeLink.description}
        </p>
      )}

      {safeLink.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {safeLink.tags.slice(0, 3).map((tag, index) => (
            <span
              key={`${link._id}-tag-${index}`}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <a
          href={safeLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition text-center"
        >
          Open
        </a>
        <button
          onClick={handleDelete}
          className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
