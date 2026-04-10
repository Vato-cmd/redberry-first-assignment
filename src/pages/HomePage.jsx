import Slider from "../components/Slider";
import FeaturedCourses from "../components/FeaturedCourses";
import CoursesInProgress from "../components/CoursesInProgress";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CoursesInProgress />
      <FeaturedCourses />
    </>
  );
}
