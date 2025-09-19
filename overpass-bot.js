const { default: fetch } = require('node-fetch');
const { MongoClient } = require('mongodb');
const Bottleneck = require('bottleneck');
const { default: pRetry } = require('p-retry');
require('dotenv').config();

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'canakkale_mekan';
const COLLECTION = 'businesses';

const QUERY = `
[out:json][timeout:180];
area["name"="Çanakkale"]["admin_level"="4"]->.searchArea;
(
  node["amenity"](area.searchArea); way["amenity"](area.searchArea); relation["amenity"](area.searchArea);
  node["shop"](area.searchArea); way["shop"](area.searchArea); relation["shop"](area.searchArea);
  node["tourism"](area.searchArea); way["tourism"](area.searchArea); relation["tourism"](area.searchArea);
  node["leisure"](area.searchArea); way["leisure"](area.searchArea); relation["leisure"](area.searchArea);
  node["office"](area.searchArea); way["office"](area.searchArea); relation["office"](area.searchArea);
  node["historic"](area.searchArea); way["historic"](area.searchArea); relation["historic"](area.searchArea);
);
out center meta;
`;

async function fetchOverpass() {
  console.log('Overpass API\'den veri çekiliyor... Bu işlem biraz sürebilir.');
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    body: QUERY,
    headers: { 'Content-Type': 'text/plain' },
    timeout: 180000
  });
  if (!res.ok) throw new Error('Overpass isteği başarısız: ' + res.status);
  return res.json();
}

const limiter = new Bottleneck({ minTime: 1500, maxConcurrent: 1 });

async function main() {
  if (!MONGO_URI) {
    console.error('HATA: MONGO_URI bulunamadı. Lütfen .env dosyanızı kontrol edin.');
    return;
  }

  console.log('MongoDB\'ye bağlanılıyor...');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('MongoDB\'ye başarıyla bağlanıldı.');

  const db = client.db(DB_NAME);
  const col = db.collection(COLLECTION);

  try {
    const data = await pRetry(() => limiter.schedule(() => fetchOverpass()), { retries: 3 });
    const elems = data.elements || [];
    console.log('Toplam eleman bulundu:', elems.length);

    if (elems.length === 0) {
        console.log('Kaydedilecek yeni eleman bulunamadı.');
        return;
    }

    let upserted = 0;
    for (const el of elems) {
      const id = `${el.type}/${el.id}`;
      const tags = el.tags || {};
      const name = tags.name || 'İsimsiz';
      const category = tags.amenity || tags.shop || tags.tourism || tags.leisure || tags.office || tags.historic || 'diğer';
      const lat = el.lat || (el.center && el.center.lat);
      const lon = el.lon || (el.center && el.center.lon);
      if (!lat || !lon) continue;

      const doc = {
        _id: id,
        osm_type: el.type,
        osm_id: el.id,
        name,
        category,
        tags,
        location: { type: 'Point', coordinates: [parseFloat(lon), parseFloat(lat)] },
        last_seen: new Date()
      };

      await col.updateOne({ _id: id }, { $set: doc, $setOnInsert: { created_at: new Date() } }, { upsert: true });
      upserted++;
    }

    console.log(`İşlem tamamlandı: ${upserted} mekan veritabanına kaydedildi/güncellendi.`);
  } finally {
    await client.close();
    console.log('MongoDB bağlantısı kapatıldı.');
  }
}

main().catch(err => console.error(err));