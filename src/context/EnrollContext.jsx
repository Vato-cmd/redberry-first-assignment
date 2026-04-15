import { createContext, useContext, useState } from "react";
import {
  enrollToTheCourse,
  completeEnrolledCourse,
  deleteEnrolledCourse,
} from "../api/enroll";
import { submitReview as submitReviewApi } from "../api/review";

import { useAuth } from "./AuthContext";

const EnrollContext = createContext(null);

export function EnrollProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState("");

  const { token } = useAuth();

  async function submitReview({ courseId, rating }) {
    try {
      const response = await submitReviewApi({ courseId, rating, token });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function deleteCourse(enrollmentId) {
    try {
      const response = await deleteEnrolledCourse({ enrollmentId, token });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async function completeCourse(courseId) {
    try {
      const response = await completeEnrolledCourse({ courseId, token });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function enroll(courseId, courseScheduleId, force = false) {
    try {
      setIsEnrolling(true);
      setEnrollError("");

      const response = await enrollToTheCourse({
        courseId,
        courseScheduleId,
        token,
        force,
      });

      setEnrolledCourses((prev) => [...prev, response.data]);
    } catch (error) {
      setEnrollError(error.message || "Failed to enroll in the course");
      throw error;
    } finally {
      setIsEnrolling(false);
    }
  }

  return (
    <EnrollContext.Provider
      value={{
        enrolledCourses,
        enroll,
        isEnrolling,
        enrollError,
        completeCourse,
        deleteCourse,
        submitReview,
      }}
    >
      {children}
    </EnrollContext.Provider>
  );
}

export function useEnroll() {
  const context = useContext(EnrollContext);

  return context;
}
