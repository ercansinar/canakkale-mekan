export default function StatsPanel({ stats }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-blue-900 dark:via-gray-900 dark:to-yellow-900 rounded-2xl shadow-2xl p-8 mb-8 flex flex-col items-center max-w-xl mx-auto border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-extrabold text-blue-700 dark:text-yellow-300 mb-4 flex items-center gap-2">
        <svg className="w-7 h-7 text-yellow-400 dark:text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        Site İstatistikleri
      </h2>
      <ul className="w-full flex flex-col gap-4 text-lg">
        <li className="flex items-center gap-2"><span className="font-bold text-blue-600 dark:text-yellow-400">👥 Ziyaretçi Sayısı:</span> <span className="font-semibold">{stats.visitors}</span></li>
        <li className="flex items-center gap-2"><span className="font-bold text-blue-600 dark:text-yellow-400">🏆 En Popüler Mekan:</span> <span className="font-semibold">{stats.topBusiness}</span></li>
        <li className="flex items-center gap-2"><span className="font-bold text-blue-600 dark:text-yellow-400">⭐ En Aktif Kullanıcı:</span> <span className="font-semibold">{stats.topUser}</span></li>
      </ul>
    </div>
  );
}
