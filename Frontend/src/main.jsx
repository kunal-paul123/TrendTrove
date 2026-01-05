import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </Provider>
  </StrictMode>
);
