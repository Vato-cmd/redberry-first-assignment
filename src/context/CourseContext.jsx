import { useState, useContext, createContext } from "react";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [currentCourse, setCurrentCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ currentCourse, setCurrentCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);

  return context;
}
