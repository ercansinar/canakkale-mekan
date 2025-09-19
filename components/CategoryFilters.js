'use client';

const categories = ['Tümü', 'restaurant', 'cafe', 'hotel', 'beauty', 'shop', 'tourism'];

export default function CategoryFilters({ selectedCategory, onSelectCategory }) {
  return (
    <div className="py-4 mb-4 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => {
          const isActive = selectedCategory === category;
          const activeClasses = 'bg-blue-600 text-white border-blue-600';
          const defaultClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm font-medium border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isActive ? activeClasses : defaultClasses}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}