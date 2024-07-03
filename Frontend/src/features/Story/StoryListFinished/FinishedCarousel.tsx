import { useCallback, useEffect, useRef, useState } from "react";
import StoryItemCarousel from "../StoryItemCarousel";
import prev from "../../../assets/images/shared/prev.png";
import next from "../../../assets/images/shared/next.png";
import "../story.css";

export default function FinishedCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateButtonVisibility = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      updateButtonVisibility();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      updateButtonVisibility();
    }
  };

  const handleNativeWheel = (event: WheelEvent) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: event.deltaY * 2,
        behavior: "smooth",
      });

      if (event.deltaX === 0) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener("scroll", updateButtonVisibility);
      currentCarouselRef.addEventListener("wheel", handleNativeWheel, {
        passive: false,
      });
    }

    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener(
          "scroll",
          updateButtonVisibility
        );
        currentCarouselRef.removeEventListener("wheel", handleNativeWheel);
      }
    };
  }, [updateButtonVisibility]);

  useEffect(() => {
    updateButtonVisibility();
  }, [updateButtonVisibility]);
  return (
    <div className="w-full rounded-md relative overflow-hidden">
      {!isAtStart && (
        <button
          className="absolute z-[2] left-[.5rem] shadow-md hover:scale-[1.02] active:scale-[0.98] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full"
          onClick={scrollLeft}
        >
          <img src={prev} alt="<" className="w-[3rem]" />
        </button>
      )}
      {!isAtEnd && (
        <button
          className="absolute z-[2] right-[.5rem] shadow-md hover:scale-[1.02] active:scale-[0.98] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full"
          onClick={scrollRight}
        >
          <img src={next} alt=">" className="w-[3rem]" />
        </button>
      )}
      <div
        ref={carouselRef}
        className={`overflow-x-auto gap-[1rem] items-center flex w-full p-[1rem] | elementScrollbar`}
      >
        {...Array.from({ length: 10 }).map((_, i) => (
          <StoryItemCarousel key={i as number} />
        ))}
      </div>
    </div>
  );
}
