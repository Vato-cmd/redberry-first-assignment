import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../api/enroll";
import { useAuth } from "../context/AuthContext";
export default function EnrolledCoursesPanel() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthorized, token } = useAuth();

  useEffect(() => {
    if (!isAuthorized && !token) return;

    async function loadEnrolledCourses() {
      try {
        setError("");
        setIsLoading(true);

        const data = await getEnrolledCourses(token);
        setEnrolledCourses(data.data);
      } catch (error) {
        setError(error.message || "Failed to load enrolled courses");
      } finally {
        setIsLoading(false);
      }
    }

    loadEnrolledCourses();
  }, [token, isAuthorized]);
  return (
    <section className="w-[794px] ">
      {error && <p>{error}</p>}
      {isLoading && <p>loading enrolled courses...</p>}

      <div>
        <h1>Enrolled Courses</h1>
        <p>Total Enrollments: number</p>
      </div>
      <div>
        {enrolledCourses.map((enrolledCouse) => {
          return (
            <div
              className="w-[623px] h-[295px] rounded-xl p-5 bg-[#ffff]"
              key={enrolledCouse.id}
            >
              asd
            </div>
          );
        })}
      </div>
    </section>
  );
}
