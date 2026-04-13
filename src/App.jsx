import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalRoot from "./components/modals/ModalRoot";
import EnrolledCoursesPanel from "./components/EnrolledCoursesPanel";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";

export default function App() {
  return (
    <>
      <div className="w-480 mx-auto my-0">
        <Header />
        <Toaster position="bottom-center"/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
        </Routes>
        <Footer />
      </div>
      <EnrolledCoursesPanel />
      <ModalRoot />
    </>
  );
}
