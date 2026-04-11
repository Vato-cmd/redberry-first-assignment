import { useState, useContext, createContext } from "react";

const EnrolledCoursesPanelContext = createContext(null);

export function EnrolledCoursesPanelProvider({ children }) {
  const [isEnrolledCoursesPanelOpen, setIsEnrolledCoursesPanelOpen] =
    useState(false);

  function openEnrolledCoursesPanel() {
    setIsEnrolledCoursesPanelOpen(true);
  }

  function closeEnrolledCoursesPanel() {
    setIsEnrolledCoursesPanelOpen(false);
  }

  return (
    <EnrolledCoursesPanelContext.Provider
      value={{
        isEnrolledCoursesPanelOpen,
        openEnrolledCoursesPanel,
        closeEnrolledCoursesPanel,
      }}
    >
      {children}
    </EnrolledCoursesPanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(EnrolledCoursesPanelContext);

  return context;
}
