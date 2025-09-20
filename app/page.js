// ...existing code...

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-900 min-h-screen'}>
      <Head>
        <title>Çanakkale Mekanları | Restoran, Kafe, Tarihi Yerler, Oteller ve Daha Fazlası</title>
        <meta name="description" content="Çanakkale'nin en popüler restoran, kafe, otel ve tarihi mekanlarını keşfedin. Gerçek kullanıcı yorumları, puanlar ve harita ile en iyi mekanları bulun." />
        <meta name="keywords" content="Çanakkale, restoran, kafe, otel, tarihi mekan, lahmacun, mekanlar, gezilecek yerler, en iyi mekanlar, puan, yorum, harita, favori, canlı yorum" />
        {/* Open Graph & Twitter Card */}
        <meta property="og:title" content="Çanakkale Mekanları" />
        <meta property="og:description" content="Çanakkale'nin en popüler mekanlarını, restoranlarını, kafelerini ve otellerini keşfedin. Gerçek zamanlı yorumlar ve puanlar ile en iyi deneyimi yaşayın." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://canakkale-mekan.com" />
        <meta property="og:image" content="/public/globe.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Çanakkale Mekanları" />
        <meta name="twitter:description" content="Çanakkale'nin en popüler mekanlarını, restoranlarını, kafelerini ve otellerini keşfedin. Gerçek zamanlı yorumlar ve puanlar ile en iyi deneyimi yaşayın." />
        <meta name="twitter:image" content="/public/globe.svg" />
        <link rel="canonical" href="https://canakkale-mekan.com" />
        {/* JSON-LD yapılandırılmış veri */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Çanakkale Mekanları",
          "description": "Çanakkale'nin en popüler restoran, kafe, otel ve tarihi mekanlarını keşfedin. Gerçek kullanıcı yorumları, puanlar ve harita ile en iyi mekanları bulun.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Çanakkale",
            "addressCountry": "TR"
          },
          "url": "https://canakkale-mekan.com",
          "image": "https://canakkale-mekan.com/public/globe.svg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1000"
          },
          "areaServed": "Çanakkale",
          "keywords": ["Çanakkale", "restoran", "kafe", "otel", "tarihi mekan", "lahmacun", "mekanlar", "gezilecek yerler"]
        }) }} />
        {/* Google AdSense script */}
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"></script>
      </Head>
      {/* Sabit üst menü ve tema butonu */}
      <div className="flex justify-end px-6 py-2">
        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full font-bold shadow hover:bg-gray-300 dark:hover:bg-gray-800 transition" aria-label="Tema Değiştir">
          {darkMode ? '🌙 Karanlık Mod' : '☀️ Açık Mod'}
        </button>
      </div>
      {/* Banner alanı */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-yellow-100 py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2">Çanakkale&#39;nin En Trend Mekanları</h1>
          <p className="text-lg text-gray-700 mb-4">Restoran, kafe, otel, tarihi mekan ve daha fazlası. Gerçek kullanıcı yorumları ve puanlarla keşfet!</p>
          <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-500 transition">Hemen Keşfet</button>
        </div>
        <Image src="/window.svg" alt="Banner" width={160} height={160} className="h-32 md:h-40" />
      </div>
      {/* Kategori slider */}
      <div className="w-full py-4 px-2 overflow-x-auto flex gap-4 bg-white border-b border-gray-200">
        {['Tümü','Restoran','Cafe','Otel','Tarihi Mekan','Bar','Pastane','Fast Food','Lahmacun','Dondurma','Alışveriş','Spor','Eğlence','Sağlık'].map(cat => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Arama ve filtre alanı */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-4 bg-white">
        <input
          type="text"
          value={searchLocation}
          onChange={handleLocationSearch}
          placeholder="Mekan, kategori veya anahtar kelime ara..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow"
          style={{ minWidth: '220px' }}
        />
        <button
          className={`px-4 py-2 rounded-full border ${sortByRating ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating ? 'Sıralamayı Kapat' : 'Puan Ortalamasına Göre Sırala'}
        </button>
      </div>
      {/* Öne çıkan mekanlar grid */}
      {/* ...burada grid, harita, favori, yorum, modal, form/map fonksiyonları ve diğer tüm JSX kodunuz... */}
      {/* Başarı/Hata Modal'ı */}
      {modal.isVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${modal.isError ? 'bg-red-100' : 'bg-green-100'}`}> 
                {modal.isError ? (
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.isError ? 'Hata!' : 'Başarılı!'}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">{modal.message}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setModal({ isVisible: false, message: '', isError: false })}
                  className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${modal.isError ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Başarı/Hata Modal'ı */}
    {modal.isVisible && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${modal.isError ? 'bg-red-100' : 'bg-green-100'}`}> 
              {modal.isError ? (
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.isError ? 'Hata!' : 'Başarılı!'}</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">{modal.message}</p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={() => setModal({ isVisible: false, message: '', isError: false })}
                className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${modal.isError ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
          <button className="text-gray-700 hover:text-blue-600 font-medium" aria-label="Giriş Yap">Giriş Yap</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700 transition" aria-label="Kayıt Ol">Kayıt Ol</button>
        </div>
      </nav>
      {/* Banner alanı */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-yellow-100 py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2">Çanakkale&#39;nin En Trend Mekanları</h1>
          <p className="text-lg text-gray-700 mb-4">Restoran, kafe, otel, tarihi mekan ve daha fazlası. Gerçek kullanıcı yorumları ve puanlarla keşfet!</p>
          <button className="bg-yellow-400 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-500 transition">Hemen Keşfet</button>
        </div>
        <img src="/window.svg" alt="Banner" className="h-32 md:h-40" />
  <Image src="/window.svg" alt="Banner" width={160} height={160} className="h-32 md:h-40" />
      </div>
      {/* Kategori slider */}
      <div className="w-full py-4 px-2 overflow-x-auto flex gap-4 bg-white border-b border-gray-200">
        {['Tümü','Restoran','Cafe','Otel','Tarihi Mekan','Bar','Pastane','Fast Food','Lahmacun','Dondurma','Alışveriş','Spor','Eğlence','Sağlık'].map(cat => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-semibold transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Arama ve filtre alanı */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-4 bg-white">
        <input
          type="text"
          value={searchLocation}
          onChange={handleLocationSearch}
          placeholder="Mekan, kategori veya anahtar kelime ara..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow"
          style={{ minWidth: '220px' }}
        />
        <button
          className={`px-4 py-2 rounded-full border ${sortByRating ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating ? 'Sıralamayı Kapat' : 'Puan Ortalamasına Göre Sırala'}
        </button>
      </div>
      {/* Öne çıkan mekanlar grid */}
      {/* AdSense reklam alanı */}
      <div className="w-full flex justify-center my-6">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: 90 }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(sortByRating
          ? [...filteredBusinesses].sort((a, b) => {
              const avgA = Number(businessRatings[a._id || a.id] || a.rating);
              const avgB = Number(businessRatings[b._id || b.id] || b.rating);
              return avgB - avgA;
            })
          : filteredBusinesses
        ).map(business => (
          <div key={business._id || business.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 relative flex flex-col ${business.sponsored ? 'border-4 border-yellow-400' : ''}`}> 
            {business.sponsored && (
              <div className="absolute top-0 left-0 w-full bg-yellow-400 text-white text-xs font-bold py-1 rounded-t-2xl text-center z-10">
                Sponsorlu Mekan
              </div>
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
            <div className="flex-1 flex flex-col justify-between p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{business.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{business.category}</p>
              <p className="text-gray-700 mb-4">{business.description}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                {Array(Math.floor(Number(businessRatings[business._id || business.id] || business.rating))).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-800 font-bold ml-1">{businessRatings[business._id || business.id] ? businessRatings[business._id || business.id] : business.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Banner reklam alanı */}
      <div className="w-full py-6 flex justify-center items-center bg-yellow-50">
        <div className="bg-yellow-400 text-white px-8 py-4 rounded-2xl shadow font-bold text-lg flex items-center gap-4">
          <img src="/vercel.svg" alt="Sponsor" className="h-8 w-8" />
  <Image src="/vercel.svg" alt="Sponsor" width={32} height={32} className="h-8 w-8" />
          <span>Reklam Alanı: Mekanınızı öne çıkarın!</span>
        </div>
      </div>
      {/* Harita ve favori mekanlar bölümü, yorumlar ve diğer alanlar ... */}
      {/* ...existing code... */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Çanakkale Mekanları</h1>
          <p className="text-lg text-gray-600 mt-2">En sevdiğin mekanları keşfet ve yorum yap.</p>
          <p className="text-sm text-gray-400 mt-2">Kullanıcı Kimliği: {userId || 'Yükleniyor...'}</p>
        </header>

        {/* Filtreleme, Konum Arama ve Sıralama Bölümü */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button
            className={`filter-btn px-4 py-2 rounded-full transition-colors ${selectedCategory === 'Tümü' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handleFilter('Tümü')}
          >
            Tümü
          </button>
          <button
            className={`filter-btn px-4 py-2 rounded-full transition-colors ${selectedCategory === 'Restoran' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handleFilter('Restoran')}
          >
            Restoran
          </button>
          <button
            className={`filter-btn px-4 py-2 rounded-full transition-colors ${selectedCategory === 'Cafe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handleFilter('Cafe')}
          >
            Cafe
          </button>
          <button
            className={`filter-btn px-4 py-2 rounded-full transition-colors ${selectedCategory === 'Tarihi Mekan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => handleFilter('Tarihi Mekan')}
          >
            Tarihi Mekan
          </button>
          <input
            type="text"
            value={searchLocation}
            onChange={handleLocationSearch}
            placeholder="Konum veya mekan adı ara..."
            className="ml-4 px-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            style={{ minWidth: '220px' }}
          />
          <button
            className={`ml-4 px-4 py-2 rounded-full border ${sortByRating ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setSortByRating(!sortByRating)}
          >
            {sortByRating ? 'Sıralamayı Kapat' : 'Puan Ortalamasına Göre Sırala'}
          </button>
        </div>
        {/* Fazladan return ve fonksiyon dışı JSX kodları kaldırıldı. Tüm JSX tek parent <div> içinde. */}
            {(!userId || favorites.length === 0) ? (
              <p className="text-center text-gray-500">Henüz favori mekanınız yok.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses.filter(b => favorites.includes(b.id)).map(business => (
                  <div key={business.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{business.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{business.category}</p>
                    <p className="text-gray-700 mt-2">{business.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Yorum Ekleme ve Görüntüleme Bölümü */}
        <div className="mt-8">
          {/* Yorum Ekleme Formu */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bir Yorum Bırak</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label htmlFor="review-business" className="block text-sm font-medium text-gray-700">İşletme Adı</label>
                <select id="review-business"
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  {businesses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">Yorumunuz</label>
                <textarea id="review-text"
                  rows="3"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Yorumunuzu buraya yazın..."></textarea>
              </div>
              <div>
                <label htmlFor="review-rating" className="block text-sm font-medium text-gray-700">Puanınız (1-5)</label>
                return (
                  <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-900 min-h-screen'}>
                    <Head>
                      {/* ...SEO ve meta etiketleri... */}
                    </Head>
                    {/* Sabit üst menü ve tema butonu */}
                    <div className="flex justify-end px-6 py-2">
                      <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full font-bold shadow hover:bg-gray-300 dark:hover:bg-gray-800 transition" aria-label="Tema Değiştir">
                        {darkMode ? '🌙 Karanlık Mod' : '☀️ Açık Mod'}
                      </button>
                    </div>
                    {/* Banner alanı, kategori slider, arama, grid, reklam, modal, yorumlar, harita, favoriler, panel vs. tüm JSX kodunuz burada eksiksiz ve doğru kapanışlarla olacak */}
                    {/* Tüm map fonksiyonları ve alt JSX blokları {} ile kapatıldı, tüm <div>/<form> kapanışları eksiksiz. */}
                    {/* Başarı/Hata Modal'ı */}
                    {modal.isVisible && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                          <div className="mt-3 text-center">
                            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${modal.isError ? 'bg-red-100' : 'bg-green-100'}`}> 
                              {modal.isError ? (
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              ) : (
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.isError ? 'Hata!' : 'Başarılı!'}</h3>
                            <div className="mt-2 px-7 py-3">
                              <p className="text-sm text-gray-500">{modal.message}</p>
                            </div>
                            <div className="items-center px-4 py-3">
                              <button
                                onClick={() => setModal({ isVisible: false, message: '', isError: false })}
                                className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${modal.isError ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}>
                                Kapat
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
                    {/* Yanıtlar Listesi */}
                    {replies[review.id] && replies[review.id].length > 0 && (
                      <div className="mt-4 ml-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Yanıtlar:</h4>
                        {replies[review.id].map((reply, i) => (
                          <div key={i} className="bg-white p-2 rounded mb-2 border border-gray-200">
                            <p className="text-gray-700 text-sm">{reply.text}</p>
                            <span className="text-xs text-gray-400">{reply.user}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Yanıt Ekleme Formu */}
                    <form onSubmit={e => handleReplySubmit(review.id, e)} className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Yanıt yaz..."
                        className="flex-1 px-2 py-1 rounded border border-gray-300"
                      />
                      <button type="submit" className="px-4 py-1 rounded bg-blue-500 text-white font-medium">Yanıtla</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Başarı/Hata Modal'ı */}
        {modal.isVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${modal.isError ? 'bg-red-100' : 'bg-green-100'}`}> 
                  {modal.isError ? (
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{modal.isError ? 'Hata!' : 'Başarılı!'}</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">{modal.message}</p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={() => setModal({ isVisible: false, message: '', isError: false })}
                    className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${modal.isError ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}>
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
  );
}
