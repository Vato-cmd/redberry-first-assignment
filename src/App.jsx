import Header from "./components/Header";
import Slider from "./components/Slider";
import FeaturedCourses from "./components/FeaturedCourses";
import Footer from "./components/Footer";
import ModalRoot from "./components/modals/ModalRoot";

export default function App() {
  return (
    <>
      <div className="w-480 mx-auto my-0">
        <Header />
        <Slider />
        <FeaturedCourses />
        <Footer />
      </div>

      <ModalRoot />
    </>
  );
}
