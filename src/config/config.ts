

// VITE_APP_GOOGLE_SIGNIN_CLIENT_ID = "367767237355-044o2mi3crvfdr68haiiijiki6vf8fft.apps.googleusercontent.com"
// VITE_OPEN_AI_KEY="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"
export const config = {
  googleSignInClientId: process.env.VITE_APP_GOOGLE_SIGNIN_CLIENT_ID || '',
  openAiKey: process.env.VITE_OPEN_AI_KEY
};
