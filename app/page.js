

"use client";
import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Image from 'next/image';
import VisitorCounterFooter from './components/VisitorCounterFooter';


export default function Page() {
  // ...tüm state ve fonksiyonlar...
  // Sayaç işlemini SSR'den ayırmak için alt bileşene taşıyoruz
  return (
    <div className={darkMode ? 'dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white min-h-screen' : 'bg-gradient-to-br from-white via-blue-50 to-gray-100 text-gray-900 min-h-screen'}>
      {/* Header */}
      <header className="w-full px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">Çanakkale Mekanları</h1>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button onClick={() => setDarkMode(!darkMode)} className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded-full font-bold shadow hover:bg-blue-700 dark:hover:bg-blue-900 transition-all duration-200">
            {darkMode ? '🌙 Karanlık Mod' : '☀️ Açık Mod'}
          </button>
        </div>
      </header>
      {/* Banner - sadeleştirilmiş */}
      <section className="w-full bg-gradient-to-r from-blue-100 to-yellow-100 dark:from-blue-900 dark:to-yellow-900 py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-6 rounded-b-3xl shadow-xl mb-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-yellow-300 mb-2">Çanakkale&#39;nin En Trend Mekanları</h2>
          <p className="text-base text-gray-700 dark:text-gray-200 mb-4">Restoran, kafe, otel, tarihi mekan ve daha fazlası. Gerçek kullanıcı yorumları ve puanlarla keşfet!</p>
        </div>
        <Image src="/window.svg" alt="Banner" width={176} height={176} className="h-32 md:h-44 drop-shadow-2xl" />
      </section>
      {/* Kategori slider - sadeleştirilmiş */}
      <nav className="w-full py-3 px-2 overflow-x-auto flex gap-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-xl shadow mb-6">
        {['Tümü','Restoran','Cafe','Otel','Tarihi Mekan','Bar','Pastane','Fast Food','Dondurma','Alışveriş','Spor','Eğlence'].map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap shadow ${selectedCategory === cat ? 'bg-blue-600 dark:bg-blue-700 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
      {/* Arama ve filtre alanı */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 rounded-xl shadow mb-8">
        <input
          type="text"
          value={searchLocation}
          onChange={handleLocationSearch}
          placeholder="Mekan, kategori veya anahtar kelime ara..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 shadow text-lg bg-gray-50 dark:bg-gray-800"
          style={{ minWidth: '220px' }}
        />
        <button
          className={`px-6 py-3 rounded-full border text-lg font-semibold shadow ${sortByRating ? 'bg-yellow-400 dark:bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800'}`}
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating ? 'Sıralamayı Kapat' : 'Puan Ortalamasına Göre Sırala'}
        </button>
      </section>
      {/* Mekanlar grid */}
      <main className="max-w-7xl mx-auto py-8 px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {(sortByRating ? [...filteredBusinesses].sort((a, b) => {
          const avgA = Number(businessRatings[a._id || a.id] || a.rating);
          const avgB = Number(businessRatings[b._id || b.id] || b.rating);
          return avgB - avgA;
        }) : filteredBusinesses).map(business => (
          <div key={business._id || business.id} className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl hover:shadow-blue-400 dark:hover:shadow-yellow-700 transition-transform duration-300 hover:scale-105 relative flex flex-col border-2 ${business.sponsored ? 'border-yellow-400 dark:border-yellow-600' : 'border-transparent'}`}>
            {business.sponsored && (
              <div className="absolute top-0 left-0 w-full bg-yellow-400 dark:bg-yellow-600 text-white text-xs font-bold py-2 rounded-t-3xl text-center z-10 shadow">Sponsorlu Mekan</div>
            )}
            <button
              className={`absolute top-4 right-4 text-xl focus:outline-none ${favorites.includes(business._id || business.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
              title={favorites.includes(business._id || business.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              onClick={() => handleToggleFavorite(business._id || business.id)}
            >
              {favorites.includes(business._id || business.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.318 6.318a4.5 4.5 0 016.364 0l.318.318.318-.318a4.5 4.5 0 116.364 6.364l-7 7-7-7a4.5 4.5 0 010-6.364z" />
                </svg>
              )}
            </button>
            <div className="flex-1 flex flex-col justify-between p-7">
              <h3 className="text-2xl font-bold text-blue-700 dark:text-yellow-300 mb-2">{business.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">{business.category}</p>
              <p className="text-gray-700 dark:text-gray-200 mb-4">{business.description}</p>
              <div className="flex items-center mt-2 text-yellow-500 dark:text-yellow-400">
                {Array(Math.floor(Number(businessRatings[business._id || business.id] || business.rating))).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-800 dark:text-yellow-200 font-bold ml-1">{businessRatings[business._id || business.id] ? businessRatings[business._id || business.id] : business.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* Harita bileşeni (küçük ve sade) */}
      <div className="max-w-xl mx-auto my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="w-full h-72"> {/* 288px yükseklik, responsive */}
          <MapView businesses={businesses} />
        </div>
      </div>
  {/* Ziyaretçi sayaç bileşeni */}
  <VisitorCounterFooter />
    </div>
  );
}
