// Basit e-posta gönderim endpointi (gerçek e-posta servisi ile entegre edilmeli)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST desteklenir.' });
  }
  const { to, subject, message } = req.body;
  // Burada gerçek e-posta servisi ile entegrasyon yapılmalı
  // Örnek: nodemailer, SendGrid, Mailgun, vb.
  // Şu an sadece loglama
  console.log('E-posta gönder:', { to, subject, message });
  return res.status(200).json({ success: true });
}
