export default function StatsPanel({ stats }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">Site İstatistikleri</h2>
      <ul className="list-disc ml-6">
        <li><strong>Ziyaretçi Sayısı:</strong> {stats.visitors}</li>
        <li><strong>En Popüler Mekan:</strong> {stats.topBusiness}</li>
        <li><strong>En Aktif Kullanıcı:</strong> {stats.topUser}</li>
      </ul>
    </div>
  );
}
