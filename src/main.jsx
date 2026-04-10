import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EnrollProvider } from "./context/EnrollContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EnrollProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </EnrollProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
