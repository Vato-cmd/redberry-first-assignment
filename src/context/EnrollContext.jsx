import { createContext, useContext, useState } from "react";
import { enrollToTheCourse } from "../api/enroll";
import { useAuth } from "./AuthContext";

const EnrollContext = createContext(null);

export function EnrollProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");

  const { token } = useAuth();
  console.log(enrolledCourses);
  async function enroll(courseId, courseScheduleId) {
    try {
      setIsEnrolling(true);
      setEnrollError("");

      const response = await enrollToTheCourse({
        courseId,
        courseScheduleId,
        token,
      });

      setEnrolledCourses((prev) => [...prev, response.data]);
    } catch (error) {
      setEnrollError(error.message || "Failed to enroll in the course");
    } finally {
      setIsEnrolling(false);
    }
  }

  return (
    <EnrollContext.Provider
      value={{ enrolledCourses, enroll, isEnrolling, enrollError }}
    >
      {children}
    </EnrollContext.Provider>
  );
}

export function useEnroll() {
  const context = useContext(EnrollContext);

  return context;
}
