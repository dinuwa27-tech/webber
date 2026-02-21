<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/18QRTFAjw3rQ53rQ2NrKKI6S1u5UvRXMd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Render

You can deploy this app to Render as a **Static Site**.

### Automated Deployment (Blueprint)

1. Push this code to a GitHub or GitLab repository.
2. In the Render Dashboard, click **New +** and select **Blueprint**.
3. Connect your repository. Render will automatically detect the `render.yaml` file.
4. Set the `GEMINI_API_KEY` when prompted in the Render Dashboard.
5. Click **Apply** to deploy.

### Manual Deployment

1. Click **New +** and select **Static Site**.
2. Connect your repository.
3. Use the following settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add an Environment Variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
5. Click **Create Static Site**.
