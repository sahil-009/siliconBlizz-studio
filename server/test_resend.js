import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

(async () => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['info.siliconblizz@gmail.com'],
            subject: 'Test Email from SiliconBlizz',
            html: '<p>This is a test email from <strong>SiliconBlizz</strong> using Resend!</p>'
        });

        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', data);
        }
    } catch (err) {
        console.error('Exception:', err);
    }
})();
