import { useEffect, useState } from "react";

export default function CoursesPage() {
  useEffect(() => {
    fetch("https://api.redclass.redberryinternship.ge/api/courses")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <div>Courses Page</div>;
}
