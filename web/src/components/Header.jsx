export default function Header({ onAddLink }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Links</h2>
          <p className="text-sm text-gray-600 mt-1">
            Save and organize your links automatically
          </p>
        </div>

        <button
          onClick={onAddLink}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Link
        </button>
      </div>
    </header>
  );
}
