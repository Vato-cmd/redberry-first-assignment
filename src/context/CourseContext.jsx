import { createContext, useContext, useState } from "react";
import { getCourseById, getFeaturedCourses } from "../api/courses";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [coursesById, setCoursesById] = useState({});
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isLoadingFeaturedCourse, setIsLoadingFeaturedCourse] = useState(false);
  const [error, setError] = useState("");

  async function loadCourseById(id, token) {
    try {
      setIsLoadingCourse(true);
      setError("");

      const data = await getCourseById(id, token);

      setCoursesById((prev) => ({
        ...prev,
        [id]: data,
      }));

      return data;
    } catch (error) {
      setError(error.message || "Failed to load the course");
      throw error;
    } finally {
      setIsLoadingCourse(false);
    }
  }

  async function loadFeaturedCourses() {
    try {
      setIsLoadingFeaturedCourse(true);
      setError("");

      const data = await getFeaturedCourses();
      setFeaturedCourses(data);

      return data;
    } catch (error) {
      setError(error.message || "Failed to load featured courses");
      throw error;
    } finally {
      setIsLoadingFeaturedCourse(false);
    }
  }

  return (
    <CourseContext.Provider
      value={{
        coursesById,
        featuredCourses,
        isLoadingCourse,
        isLoadingFeaturedCourse,
        error,
        loadCourseById,
        loadFeaturedCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);

  return context;
}
