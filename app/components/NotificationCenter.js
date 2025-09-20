import { useState } from 'react';

export default function NotificationCenter({ notifications }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button aria-label="Bildirimleri Aç" onClick={() => setOpen(!open)} className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none">
        🔔
      </button>
      {open && (
        <div className="bg-white rounded-xl shadow-lg p-4 w-80 max-h-96 overflow-y-auto mt-2">
          <h2 className="text-lg font-bold mb-2">Bildirimler</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">Henüz bildiriminiz yok.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n, i) => (
                <li key={i} className="bg-blue-50 rounded p-2 text-sm text-blue-900">{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
