import { useState } from 'react';
import Head from 'next/head';

export default function UserPanel() {
  // Dummy user data
  const [user] = useState({
    name: 'Kullanıcı',
    email: 'kullanici@canakkale.com',
    premium: true,
    favorites: ['Mekan 1', 'Mekan 2'],
    reviews: [
      { business: 'Mekan 1', text: 'Harika!', rating: 5 },
      { business: 'Mekan 2', text: 'Güzel ortam.', rating: 4 }
    ]
  });

  return (
    <>
      <Head>
        <title>Kullanıcı Paneli | Çanakkale Mekanları</title>
        <meta name="description" content="Kullanıcı panelinde favori mekanlarınızı, yorumlarınızı ve premium üyelik durumunuzu görüntüleyin." />
      </Head>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Kullanıcı Paneli</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p><strong>Ad:</strong> {user.name}</p>
          <p><strong>E-posta:</strong> {user.email}</p>
          <p><strong>Premium Üyelik:</strong> {user.premium ? 'Aktif' : 'Pasif'}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Favori Mekanlarım</h2>
          <ul className="list-disc ml-6">
            {user.favorites.map((fav, i) => <li key={i}>{fav}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Yorumlarım</h2>
          <ul className="list-disc ml-6">
            {user.reviews.map((rev, i) => (
              <li key={i}><strong>{rev.business}:</strong> {rev.text} ({rev.rating}/5)</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
