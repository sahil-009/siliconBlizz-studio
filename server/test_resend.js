import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

(async () => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'contact@siliconblizz.in',
            to: [process.env.RECIPIENT_EMAIL],
            subject: 'Test Email from SiliconBlizz',
            html: '<p>This is a test email from <strong>SiliconBlizz</strong> to verify email configuration!</p>'
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
