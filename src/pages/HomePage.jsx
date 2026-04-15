import Slider from "../components/Slider";
import FeaturedCourses from "../components/FeaturedCourses";
import CoursesInProgress from "../components/CoursesInProgress";
import BlurredComponent from "../components/BlurredComponent";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isAuthorized } = useAuth();

  return (
    <>
      <Slider />
      {isAuthorized && <CoursesInProgress />}
      <FeaturedCourses />
      {!isAuthorized && <BlurredComponent />}
    </>
  );
}
