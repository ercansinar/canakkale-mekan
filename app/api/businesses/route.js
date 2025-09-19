import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'canakkale_mekan';
const COLLECTION = 'businesses';

// Bu fonksiyon gelen isteklere cevap verecek
export async function GET(request) {
  // Her istekte yeni bir veritabanı bağlantısı kurmak serverless ortamlar için en iyi pratiktir.
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const col = db.collection(COLLECTION);

    // URL'den gelen query parametrelerini al
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');
    const sort = searchParams.get('sort') || 'name_asc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const filter = {};
    if (category && category !== 'Tümü') filter.category = category;
    if (q) filter.name = { $regex: q, $options: 'i' };

    const sortObj = sort === 'name_asc' ? { name: 1 } : { name: -1 };
    const skipAmount = (page - 1) * limit;

    const docs = await col.find(filter).sort(sortObj).skip(skipAmount).limit(limit).toArray();
    const total = await col.countDocuments(filter);
    
    const responseData = { 
        data: docs,
        pagination: {
            page: page,
            limit: limit,
            total: total,
            totalPages: Math.ceil(total / limit)
        }
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  } finally {
    // Bağlantıyı kapat
    await client.close();
  }
}