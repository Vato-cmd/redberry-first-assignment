import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourseById } from "../api/courses";
import calendar from "../assets/calendar.png"
export default function CourseDetailsPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    async function loadCourseDetails() {
      const data = await getCourseById(params.id);
      setCourse(data);
    }
    loadCourseDetails();
  }, []);
  console.log(course)
  {
    if (!course) return <p>Loading...</p>;
  }
  const avgRating =
    course?.reviews.length === 0
      ? 0
      : course.reviews.reduce((curr, total) => curr + total.rating, 0) /
        course.reviews.length;
  return (
    <section>
      <div>
        <h1 className="">{course.title}</h1>
        <img src={course.image} alt={course.title} />
        <p>
            <img src={calendar} alt="calendar" />
            {course.durationWeeks} Weeks</p>
        <p>{avgRating}</p>
        <p>{course.category.name}</p>
        <img src={course.instructor.avatar} alt="Instructor" />
        <p>{course.instructor.name}</p>
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </div>
    </section>
  );
}
