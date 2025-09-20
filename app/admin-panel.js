import { useState } from 'react';
import Head from 'next/head';

export default function AdminPanel() {
  // Dummy admin data
  const [businesses, setBusinesses] = useState([
    { name: 'Mekan 1', sponsored: true },
    { name: 'Mekan 2', sponsored: false }
  ]);
  const [newBusiness, setNewBusiness] = useState('');

  function handleAddBusiness() {
    if (newBusiness.trim()) {
      setBusinesses([...businesses, { name: newBusiness, sponsored: false }]);
      setNewBusiness('');
    }
  }

  return (
    <>
      <Head>
        <title>Admin Paneli | Çanakkale Mekanları</title>
        <meta name="description" content="Admin panelinde mekan ekleyin, sponsorlu mekanları yönetin ve yorumları moderasyon yapın." />
      </Head>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Admin Paneli</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Mekan Ekle</h2>
          <input type="text" value={newBusiness} onChange={e => setNewBusiness(e.target.value)} className="border px-2 py-1 rounded mr-2" placeholder="Mekan adı" />
          <button onClick={handleAddBusiness} className="bg-blue-600 text-white px-4 py-1 rounded">Ekle</button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Sponsorlu Mekanlar</h2>
          <ul className="list-disc ml-6">
            {businesses.filter(b => b.sponsored).map((b, i) => <li key={i}>{b.name}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Tüm Mekanlar</h2>
          <ul className="list-disc ml-6">
            {businesses.map((b, i) => <li key={i}>{b.name} {b.sponsored && <span className="text-yellow-500">(Sponsorlu)</span>}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}
