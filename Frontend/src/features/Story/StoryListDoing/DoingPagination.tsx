import { useEffect, useState } from "react";
import StoryItem from "../StoryItem";
import { MATCHMEDIA } from "../../../const/MATCHMEDIA";
import useMatchMedia from "../../../hooks/useMatchMedia";

export default function DoingPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfSeries, setAmountOfSeries] = useState(20);
  const [numberOfCurrentPages, setNumberOfCurrentPages] = useState<number[]>(
    []
  );
  const isMobile = useMatchMedia(MATCHMEDIA.Mobile);
  useEffect(() => {
    updatePaginationButtons(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, currentPage]);

  const updatePaginationButtons = (page: number) => {
    const totalPages = Math.ceil(amountOfSeries);
    const maxPagesToShow = isMobile ? 5 : 10;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }
    setNumberOfCurrentPages(newPages);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col gap-[2rem]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-[1rem] sm:justify-items-start justify-items-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <StoryItem key={i as number} />
        ))}
      </div>
      <div className="flex gap-[1rem] items-center justify-center mx-auto">
        {numberOfCurrentPages.map((i) => {
          return (
            <button
              key={i as number}
              onClick={() => handlePageChange(i)}
              className={`text-[1.5rem] p-[1rem] px-[1.5rem] rounded-md ${
                currentPage === i
                  ? "bg-primary-pastel-blue text-white"
                  : "bg-white"
              } shadow-sm hover:bg-primary-pastel-blue hover:text-white transition-all`}
            >
              {i as number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
