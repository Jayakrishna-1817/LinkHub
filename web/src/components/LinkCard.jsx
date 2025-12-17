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
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-2xl hover:scale-105 hover:border-blue-300 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      {safeLink.thumbnail && (
        <img
          src={safeLink.thumbnail}
          alt={safeLink.title}
          className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md"
        />
      )}

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${sourceColors[safeLink.source] || sourceColors.other}`}>
          {sourceIcons[safeLink.source] || sourceIcons.other} {safeLink.source.toUpperCase()}
        </div>
        <button
          onClick={handleToggleFavorite}
          className="text-2xl hover:scale-125 transition-transform duration-200"
        >
          {safeLink.isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors relative z-10">
        {safeLink.title}
      </h3>

      {safeLink.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed relative z-10">
          {safeLink.description}
        </p>
      )}

      {safeLink.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {safeLink.tags.slice(0, 3).map((tag, index) => (
            <span
              key={`${link._id}-tag-${index}`}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 relative z-10">
        <a
          href={safeLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-center"
        >
          🔗 Open
        </a>
        <button
          onClick={handleDelete}
          className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 text-sm font-bold rounded-xl hover:from-red-100 hover:to-pink-100 hover:scale-105 transition-all duration-200"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
