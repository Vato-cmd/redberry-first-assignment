import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CourseDetailsPage() {
  const params = useParams();
  const [ course, setCourse ] = useState(null);
  useEffect(() => {
    fetch("https://api.redclass.redberryinternship.ge/api/courses/" + params.id)
        .then(res => res.json())
        .then(data => setCourse(data))
  }, []);

  console.log(course);
    
  return <div>Course Details Page</div>;
}
