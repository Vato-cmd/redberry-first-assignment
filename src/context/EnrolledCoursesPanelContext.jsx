import { useState, useContext, createContext } from "react";

const EnrolledCoursesPanelContext = createContext(null);

export function EnrolledCoursesPanelProvider({ children }) {
  const [isEnrolledCoursesPanelOpen, setIsEnrolledCoursesPanelOpen] =
    useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function openEnrolledCoursesPanel() {
    setIsEnrolledCoursesPanelOpen(true);
  }

  function closeEnrolledCoursesPanel() {
    setIsEnrolledCoursesPanelOpen(false);
  }

  function handlePanelRefreshKey() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <EnrolledCoursesPanelContext.Provider
      value={{
        isEnrolledCoursesPanelOpen,
        openEnrolledCoursesPanel,
        closeEnrolledCoursesPanel,
        handlePanelRefreshKey,
        refreshKey,
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
