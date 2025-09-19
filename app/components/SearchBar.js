'use client';

export default function SearchBar() {
  return (
    <div className="bg-gray-100 p-6 sm:p-8 rounded-lg my-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Otel, restoran, güzellik salonu ara..."
          className="w-full p-4 text-md sm:text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}