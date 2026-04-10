import Slider from "../components/Slider";
import FeaturedCourses from "../components/FeaturedCourses";
import CoursesInProgress from "../components/CoursesInProgress";
import { useEnroll } from "../context/EnrollContext";
export default function HomePage() {
  const { enrolledCourses } = useEnroll();
  console.log(enrolledCourses);
  return (
    <>
      <Slider />
      <CoursesInProgress />
      <FeaturedCourses />
    </>
  );
}
