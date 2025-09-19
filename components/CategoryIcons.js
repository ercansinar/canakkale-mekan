// components/CategoryIcons.js

// Örnek ikonlar (Bunları daha sonra istediğimiz gibi değiştirebiliriz)
const HotelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 6h7.5m-7.5 3h7.5m-7.5 3h7.5" /></svg>;
const RestaurantIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962-5.962a2.25 2.25 0 013.182 0l-5.962 5.962a2.25 2.25 0 010 3.182l5.962-5.962a2.25 2.25 0 013.182 0zM3 19.5a2.25 2.25 0 002.25 2.25H18.75a2.25 2.25 0 002.25-2.25v-2.625a2.25 2.25 0 00-.73-1.664l-2.258-2.258a2.25 2.25 0 00-3.182 0l-2.258 2.258a2.25 2.25 0 00-.73 1.664v2.625z" /></svg>;
const CafeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v1.906a.375.375 0 01-.12.256l-3.322 2.658a.375.375 0 01-.486-.04l-1.97-2.318a.375.375 0 01.04-.486l2.658-3.322a.375.375 0 01.256-.12h1.906a2.25 2.25 0 012.25 2.25v.191a2.25 2.25 0 01-2.25 2.25h-1.375a2.25 2.25 0 01-2.25-2.25V9.75M12 9.75h3.375a2.25 2.25 0 012.25 2.25v1.375a2.25 2.25 0 01-2.25 2.25H9.75" /></svg>;

// Kategori verimiz
const categories = [
  { name: 'Oteller', icon: <HotelIcon />, href: '#' },
  { name: 'Restoranlar', icon: <RestaurantIcon />, href: '#' },
  { name: 'Kafeler', icon: <CafeIcon />, href: '#' },
  // ... daha fazla kategori eklenebilir
];

export default function CategoryIcons() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
      {categories.map((category) => (
        <a 
          href={category.href} 
          key={category.name} 
          className="group flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div className="text-blue-600 mb-2 group-hover:text-blue-800 transition-colors">{category.icon}</div>
          <span className="font-semibold text-gray-700 text-sm sm:text-base">{category.name}</span>
        </a>
      ))}
    </div>
  );
}