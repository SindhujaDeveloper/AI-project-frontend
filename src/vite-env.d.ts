import "vite/client";

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_SIGNIN_CLIENT_ID : string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}