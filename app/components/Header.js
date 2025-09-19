import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-700">
          Çanakkale Mekan Rehberi
        </Link>
        
        <div>
          <a 
            href="https://instagram.com/canakkale.mekan" // Burayı kendi Instagram adresinle değiştirebilirsin
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 font-semibold"
          >
            Instagram
          </a>
        </div>
      </nav>
    </header>
  );
}