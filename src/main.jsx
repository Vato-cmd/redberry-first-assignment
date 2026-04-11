import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EnrollProvider } from "./context/EnrollContext.jsx";
import { CourseProvider } from "./context/CourseContext.jsx";
import { EnrolledCoursesPanelProvider } from "./context/EnrolledCoursesPanelContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EnrollProvider>
          <CourseProvider>
            <ModalProvider>
              <EnrolledCoursesPanelProvider>
                <App />
              </EnrolledCoursesPanelProvider>
            </ModalProvider>
          </CourseProvider>
        </EnrollProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
