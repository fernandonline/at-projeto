// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    css: ['bootstrap/dist/css/bootstrap.min.css'],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  runtimeConfig: {
    fbApiKey: process.env.FB_API_KEY,
    fbAuthDomain: process.env.FB_AUTH_DOMAIN,
    fbProjectId: process.env.FB_PROJECT_ID,
    fbStorageBucket: process.env.FB_STORAGE_BUCKET,
    fbMessagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    fbAppId: process.env.FB_APP_ID,
    fbMeasurementId: process.env.FB_MEASUREMENT_ID,

    mongoDb: process.env.MONGODB_URI || '',
    mongoName: process.env.MONGODB_NAME || '',

    public: {

    }
  }
})
