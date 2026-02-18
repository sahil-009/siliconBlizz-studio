import 'dotenv/config';
// Server initialization
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Resend Client Initialization
// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Where to receive contact form submissions
const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER;

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, propertyType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, and message are required.',
    });
  }

  const emailConfigured = !!process.env.RESEND_API_KEY;
  if (!emailConfigured) {
    console.log('Contact received (email skipped – set RESEND_API_KEY in .env to send emails):', { name, email });
    return res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: [recipientEmail],
      subject: `New lead: ${name} – ${propertyType || 'General'}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || '—')}</p>
        <p><strong>Property type:</strong> ${escapeHtml(propertyType || '—')}</p>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, message: 'Thank you! We will get back to you soon.', data });
  } catch (err) {
    console.error('Email sending failed:', err.message || err);
    res.status(500).json({
      error: 'Failed to send your message. Please try again or email us directly.',
    });
  }
});

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.listen(PORT, () => {
  console.log(`Contact API running at http://localhost:${PORT}`);
});
