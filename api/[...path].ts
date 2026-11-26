// Vercel Serverless Function: mọi đường dẫn /api/* đi qua ứng dụng Express trong apps/api.
import { createApp } from '../apps/api/src/app.js';

const app = createApp();
export default app;
