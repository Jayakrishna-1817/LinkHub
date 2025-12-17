export default function Header({ onAddLink }) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Links</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="animate-pulse">✨</span>
            Save and organize your links automatically with AI
          </p>
        </div>

        <button
          onClick={onAddLink}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold flex items-center gap-3 group"
        >
          <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
          <span>Add Link</span>
        </button>
      </div>
    </header>
  );
}
