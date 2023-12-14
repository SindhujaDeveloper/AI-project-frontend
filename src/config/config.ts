const compileTimeEnv: ImportMetaEnv = import.meta.env;

export const config = {
  googleSignInClientId: compileTimeEnv.VITE_APP_GOOGLE_SIGNIN_CLIENT_ID
};
