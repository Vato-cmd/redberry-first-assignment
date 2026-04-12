import Slider from "../components/Slider";
import FeaturedCourses from "../components/FeaturedCourses";
import CoursesInProgress from "../components/CoursesInProgress";
import EnrolledCoursesPanel from "../components/EnrolledCoursesPanel";
import BlurredComponent from "../components/BlurredComponent";
import { useEnroll } from "../context/EnrollContext";
import { useAuth } from "../context/AuthContext";
export default function HomePage() {
  const { enrolledCourses } = useEnroll();
  const { isAuthorized } = useAuth();

  console.log(enrolledCourses);
  return (
    <>
      <Slider />
      {isAuthorized && <CoursesInProgress />}
      <EnrolledCoursesPanel />
      <FeaturedCourses />
      {!isAuthorized && <BlurredComponent />}
    </>
  );
}
