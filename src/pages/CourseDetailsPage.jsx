import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourseById } from "../api/courses";
import calendar from "../assets/calendar.svg";
import star from "../assets/star.svg";

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
        <p className="flex">
          <img src={calendar} alt="calendar" />
          {course.durationWeeks} Weeks
        </p>
        <p className="flex">
          <img className="w-6.5 h-6.5" src={star} alt="star" />
          {avgRating}
        </p>
        <div className="flex">
          <img
            className="w-8.5 h-8.5 rounded"
            src={course.instructor.avatar}
            alt="Instructor"
          />
          <p>{course.instructor.name}</p>
        </div>
        <p>{course.category.name}</p>

        <h2>Course Description</h2>
        <p>{course.description}</p>
      </div>
    </section>
  );
}
