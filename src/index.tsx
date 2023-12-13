import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Spinner } from "react-bootstrap";
import { config } from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");

if (rootElement !== null && rootElement !== undefined) {
  ReactDOM.createRoot(rootElement).render(
    <GoogleOAuthProvider clientId={config.googleSignInClientId}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </ Provider>
      <ToastContainer />
    </GoogleOAuthProvider>
  );
} else {
  console.log("Root element not found!");
}
