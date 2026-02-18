# Vercel Deployment Setup for Resend Email Service

## Environment Variables Required

### In Vercel (for the Express server):

1. **`RESEND_API_KEY`** (Required)
   - Your Resend API key from https://resend.com/api-keys
   - Example: `re_1234567890abcdef`

2. **`RECIPIENT_EMAIL`** (Required)
   - The email address where you want to receive contact form submissions
   - Example: `info.siliconblizz@gmail.com`

3. **`SENDER_EMAIL`** (Optional but recommended)
   - The email address that will send the emails
   - If using a verified domain: `contact@siliconblizz.in`
   - If not set, defaults to `onboarding@resend.dev` (for testing only)

### In Vercel (for the frontend):

1. **`VITE_CONTACT_API_URL`** (Optional)
   - The full URL to your Express server API endpoint
   - Example: `https://your-backend-domain.com/api/contact`
   - If not set, defaults to `http://localhost:5000/api/contact` (for local dev only)
   - **Important**: In production, you MUST set this to your deployed Express server URL

## How to Set Environment Variables in Vercel:

### For the Express Server (if deployed separately):

If you deploy the Express server separately (e.g., on Render, Railway, Fly.io, etc.):

1. Set environment variables on that platform:
   - `RESEND_API_KEY`
   - `RECIPIENT_EMAIL`
   - `SENDER_EMAIL` (optional)

2. Note the deployed URL (e.g., `https://your-app.onrender.com`)

### For the Frontend (Vercel):

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Key**: `VITE_CONTACT_API_URL`
   - **Value**: `https://your-backend-domain.com/api/contact` (your Express server URL)
   - **Environment**: Production, Preview, Development
4. **Redeploy** your project for changes to take effect

## Deployment Options:

### Option 1: Deploy Express Server Separately (Recommended)

1. Deploy `server/index.js` to a platform like:
   - **Render** (free tier available)
   - **Railway**
   - **Fly.io**
   - **Heroku**
   - Any Node.js hosting platform

2. Set environment variables on that platform

3. Set `VITE_CONTACT_API_URL` in Vercel to point to your deployed server

### Option 2: Use Vercel Serverless Functions

The `vercel.json` is configured to route `/api/*` to `/server/index.js`. However, you'll need to:

1. Ensure the Express app is properly exported for Vercel
2. Set environment variables in Vercel
3. The server will run as a serverless function

## Testing:

After setting up:
1. Fill out the contact form on your production site
2. Check your email inbox (the `RECIPIENT_EMAIL` address)
3. Check server logs for any errors

## Local Development:

For local development, create a `.env` file in the `server/` directory:
```
RESEND_API_KEY=re_your_key_here
RECIPIENT_EMAIL=info.siliconblizz@gmail.com
SENDER_EMAIL=contact@siliconblizz.in
```

And optionally in the root `.env`:
```
VITE_CONTACT_API_URL=http://localhost:5000/api/contact
```

Then run:
```bash
# Terminal 1: Start the Express server
cd server && npm install && npm run dev

# Terminal 2: Start the frontend
npm run dev
```

## Troubleshooting:

- **Emails not sending?** 
  - Check that `VITE_CONTACT_API_URL` is set correctly in production
  - Verify the Express server is running and accessible
  - Check server logs for errors
  - Ensure `RESEND_API_KEY` is set correctly

- **"Failed to fetch" errors?**
  - Check CORS settings (should allow your Vercel domain)
  - Verify the Express server URL is correct
  - Check network tab in browser dev tools
