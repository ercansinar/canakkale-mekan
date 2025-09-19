'use client'; 

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CategoryFilters from '@/components/CategoryFilters';

const MapView = dynamic(
  () => import('@/components/MapView'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p>Harita Yükleniyor...</p></div> 
  }
);

export default function HomePage() {
  const [allBusinesses, setAllBusinesses] = useState([]); // Tüm mekanları burada tutacağız
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // Filtrelenmiş mekanları burada tutacağız
  const [selectedCategory, setSelectedCategory] = useState('Tümü'); // Seçili kategoriyi takip edeceğiz
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den tüm verileri sadece bir kez çekiyoruz
    fetch('/api/businesses?limit=5000') // Limiti artıralım ki tüm veriler gelsin
      .then(res => res.json())
      .then(data => {
        const businessesData = data.data || [];
        setAllBusinesses(businessesData);
        setFilteredBusinesses(businessesData); // Başlangıçta hepsi görünsün
        setLoading(false);
      })
      .catch(error => {
        console.error("Veri çekilemedi:", error);
        setLoading(false);
      });
  }, []);

  // Kategori seçildiğinde çalışacak fonksiyon
  const handleSelectCategory = (category) => {
    setSelectedCategory(category); // Seçilen kategoriyi state'e ata
    if (category === 'Tümü') {
      setFilteredBusinesses(allBusinesses); // 'Tümü' seçilirse tüm mekanları göster
    } else {
      // Değilse, sadece o kategoriye ait olanları filtrele ve göster
      const filtered = allBusinesses.filter(business => business.category === category);
      setFilteredBusinesses(filtered);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-4">Çanakkale Mekan Rehberi</h1>
      
      {/* CategoryFilters bileşenine gerekli bilgileri gönderiyoruz */}
      <CategoryFilters 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleSelectCategory} 
      />

      <div className="w-full h-[500px] border rounded-lg overflow-hidden mt-4">
        {/* Haritaya her zaman filtrelenmiş mekanları gönderiyoruz */}
        <MapView businesses={filteredBusinesses} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Mekanlar</h2>
        {loading ? (
          <p>Mekan listesi yükleniyor...</p>
        ) : (
          <ul className="list-disc pl-5">
            {/* Listede de her zaman filtrelenmiş mekanları gösteriyoruz */}
            {filteredBusinesses.map(business => (
              <li key={business._id}>{business.name} - <span className="text-gray-500">{business.category}</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}