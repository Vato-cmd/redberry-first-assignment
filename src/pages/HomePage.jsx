import Slider from "../components/Slider";
import FeaturedCourses from "../components/FeaturedCourses";
import CoursesInProgress from "../components/CoursesInProgress";
import EnrolledCoursesPanel from "../components/EnrolledCoursesPanel";
import BlurredComponent from "../components/BlurredComponent";
import { useEnroll } from "../context/EnrollContext";
export default function HomePage() {
  const { enrolledCourses } = useEnroll();
  console.log(enrolledCourses);
  return (
    <>
      <Slider />
      <CoursesInProgress />
      <EnrolledCoursesPanel />
      <FeaturedCourses />
      <BlurredComponent />
    </>
  );
}
