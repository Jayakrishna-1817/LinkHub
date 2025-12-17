import { Menu } from 'lucide-react';

export default function Header({ onAddLink, onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sm:py-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">My Links</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="animate-pulse flex-shrink-0">✨</span>
            <span className="hidden sm:inline">Save and organize your links automatically with AI</span>
            <span className="sm:hidden">AI-powered organization</span>
          </p>
        </div>

        <button
          onClick={onAddLink}
          className="px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2 sm:gap-3 group text-sm sm:text-base whitespace-nowrap touch-manipulation"
        >
          <span className="text-xl sm:text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
          <span className="hidden sm:inline">Add Link</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
