import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courses";
import { iconFinder } from "../utils/iconFinder";
import { useFilters } from "../context/FilterContext";

import BreadCrumbs from "../components/BreadCrumbs";
import Sort from "../components/Sort";
import Filters from "../components/Filters";
import { X } from "lucide-react";
import Button from "../components/UI/Button";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";

import cross from "../assets/cross.svg";
import star from "../assets/star.svg";
import divider from "../assets/divider.svg";
import emptySearch from "../assets/empty-search.png";

export default function CoursesPage() {
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState(null);

  const {
    selectedCategoryIds,
    selectedTopicIds,
    selectedInstructorIds,
    resetFilters,
    sort,
    currentPage,
    setCurrentPage,
    startPage,
    setStartPage,
  } = useFilters();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryIds, selectedTopicIds, selectedInstructorIds, sort]);

  useEffect(() => {
    async function loadCourses() {
      try {
        setError("");
        setIsLoading(true);

        const filteredCourses = await getCourses({
          categories: selectedCategoryIds,
          topics: selectedTopicIds,
          instructors: selectedInstructorIds,
          sort,
          page: currentPage,
        });
        setCourses(filteredCourses.courses);
        setMeta(filteredCourses.meta);
      } catch (error) {
        setError(error.message || "Failed to load the courses");
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, [
    selectedCategoryIds,
    selectedTopicIds,
    selectedInstructorIds,
    sort,
    currentPage,
  ]);

  if (loading) return <LoadingState />;

  const breadCrumbItems = ["Home", "Browse"];

  return (
    <section className="mx-44.25  mt-25">
      <BreadCrumbs items={breadCrumbItems} />

      <div className="flex gap-22.5">
        <div>
          <div className="flex items-center justify-between mb-8 h-12">
            <h1 className="flex-1 text-[#0A0A0A] font-semibold text-[40px]">
              Filters
            </h1>
            <div className="group hover:text-[#4F46E5]">
              <p
                onClick={() => resetFilters()}
                className="flex items-center text-[#8A8A8A] font-medium text-[16px] gap-1.75 cursor-pointer group-hover:text-[#4F46E5]"
              >
                Clear All Filters
                <X
                  className="w-5 h-5 group-hover:text-[#4F46E5]"
                  alt="cross icon"
                />
              </p>
            </div>
          </div>
          <Filters />
        </div>
        <div>
          <div className="flex items-center justify-between mb-8 h-12.25">
            <p className="text-[#666666] text-[16px] font-medium">
              Showing {courses.length} out of {meta?.total}
            </p>
            <Sort />
          </div>
          {courses.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-6 w-291.75">
                {courses.map((course) => {
                  const Icon =
                    iconFinder[
                      course.category.name.toLowerCase().replace(" ", "")
                    ];

                  return (
                    <Link
                      to={`/courses/${course.id}`}
                      key={course.id}
                      state={{ from: "browse" }}
                      className="w-93.25 h-112.75 shadow-[0px_2px_8px_rgba(0,0,0,0.09)] rounded-xl"
                    >
                      <div className="bg-white h-full rounded-xl p-5 cursor-pointer flex flex-col hover:shadow-[4px_4px_8px_rgba(0,0,0,0.06)]">
                        <img
                          className="w-83.25 h-45.25 object-cover rounded-[10px] mb-4.5"
                          src={course.image}
                          alt={course.title}
                        />

                        <div className="flex items-center justify-between ">
                          <p className="text-[14px] font-medium text-[#ADADAD] flex gap-2">
                            {course.instructor.name}
                            <img src={divider} alt="divider" />
                            <span>{course.durationWeeks} Weeks</span>
                          </p>

                          <div className="flex items-center gap-0.5">
                            <img
                              className="w-4.5 h-4.5"
                              src={star}
                              alt="star"
                            />
                            <p className="text-[#525252] text-[14px] font-medium">
                              {course.avgRating}
                            </p>
                          </div>
                        </div>

                        <h2 className="text-[24px] text-[#0A0A0A] font-semibold mb-3">
                          {course.title}
                        </h2>
                        <div className="flex items-center justify-center h-10 w-37.5 gap-1.5 rounded-lg text-[#525252] text-[16px] bg-[#F5F5F5] font-medium">
                          <Icon />
                          <h2>{course.category.name}</h2>
                        </div>

                        <div className="flex items-end justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <p className="text-[12px] font-medium text-[#ADADAD] flex flex-col">
                              Starting from
                              <span className="text-[#3D3D3D] text-[24px] font-semibold">
                                ${course.basePrice}
                              </span>
                            </p>
                          </div>

                          <Button
                            className={`rounded-lg bg-[#4F46E5] text-white font-medium text-[16px] h-12 w-25.75 hover:bg-[#281ED2]`}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                lastPage={10}
                onPageChange={setCurrentPage}
                startPage={startPage}
                setStartPage={setStartPage}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center py-24 w-291.75">
                <h2 className="text-[24px] font-semibold text-[#0A0A0A] mb-2">
                  No courses found
                </h2>
                <p className="text-[#8A8A8A] text-[16px]">
                  There are no courses on this page.
                </p>
                <img src={emptySearch} alt="empty search" />
              </div>

              <Pagination
                currentPage={currentPage}
                lastPage={10}
                onPageChange={setCurrentPage}
                startPage={startPage}
                setStartPage={setStartPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
