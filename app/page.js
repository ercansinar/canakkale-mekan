'use client'; 

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CategoryFilters from '../components/CategoryFilters'; // HATA DÜZELTMESİ: Eksik olan import satırı

const MapView = dynamic(
  () => import('../components/MapView'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p>Harita Yükleniyor...</p></div> 
  }
);

export default function HomePage() {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/businesses?limit=5000')
      .then(res => res.json())
      .then(data => {
        const businessesData = data.data || [];
        setAllBusinesses(businessesData);
        setFilteredBusinesses(businessesData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Veri çekilemedi:", error);
        setLoading(false);
      });
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'Tümü') {
      setFilteredBusinesses(allBusinesses);
    } else {
      const filtered = allBusinesses.filter(business => business.category === category);
      setFilteredBusinesses(filtered);
    }
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 73px)' }}>
      <div className="w-2/5 overflow-y-auto p-4 border-r bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Mekanlar</h1>
        <CategoryFilters 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleSelectCategory} 
        />
        {loading ? (
          <p className="text-center mt-8">Mekan listesi yükleniyor...</p>
        ) : (
          <ul className="space-y-2 mt-4">
            {filteredBusinesses.map(business => (
              <li key={business._id} className="p-3 border rounded-lg bg-white hover:shadow-md cursor-pointer transition-all">
                <h3 className="font-bold text-gray-800">{business.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{business.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-grow">
        <MapView businesses={filteredBusinesses} />
      </div>
    </div>
  );
}