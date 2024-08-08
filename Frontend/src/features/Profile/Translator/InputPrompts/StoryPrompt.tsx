import { useEffect, useRef, useState } from "react";
import useGetStoryTranslationByTextFieldNameAndSearch from "../../../../hooks/Fetching/Story/useGetStoryTranslationByTextFieldNameAndSearch";
import useOutOfModal from "../../../../hooks/UI/useOutOfModal";
import useDebounce from "../../../../hooks/utilities/useDebounce";

type StoryPromptTypes = {
  setStoryId: React.Dispatch<React.SetStateAction<string>>;
};

export default function StoryPrompt({ setStoryId }: StoryPromptTypes) {
  const [showStories, setShowStories] = useState(false);
  const modalStoriesRef = useRef<HTMLDivElement>(null);
  const [storyValue, setStoryValue] = useState("");

  useOutOfModal({
    modalRef: modalStoriesRef,
    setShowModal: setShowStories,
    showModal: showStories,
  });

  const debouncedValue = useDebounce({ value: storyValue, delay: 500 });

  const { data: storiesSearch, isLoading } =
    useGetStoryTranslationByTextFieldNameAndSearch({
      debouncedValue,
      language: "russian",
    });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      setStoryId(
        storiesSearch?.find(
          (s) => s.text.toLowerCase() === debouncedValue.toLowerCase()
        )?.storyId || ""
      );
    } else {
      setStoryId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, storiesSearch]);

  return (
    <form
      className="bg-white rounded-md shadow-md relative"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="w-full rounded-md shadow-md bg-white text-[1.3rem] px-[1rem] py-[.5rem] text-gray-700 outline-none"
        placeholder="История"
        onClick={(e) => {
          e.stopPropagation();
          setShowStories(true);
        }}
        value={storyValue}
        onChange={(e) => setStoryValue(e.target.value)}
      />
      <aside
        ref={modalStoriesRef}
        className={`${
          showStories ? "" : "hidden"
        } max-h-[15rem] overflow-auto flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[.5rem] p-[1rem] | containerScroll`}
      >
        {isLoading ? (
          <div className="text-[1.4rem] text-gray-600 text-center py-[.5rem]">
            Загрузка...
          </div>
        ) : storiesSearch && storiesSearch.length > 0 ? (
          storiesSearch.map((s) => (
            <button
              key={s._id}
              type="button"
              onClick={() => {
                setStoryId(s.storyId);
                setStoryValue(s.text);
                setShowStories(false);
              }}
              className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
            >
              {s.text}
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowStories(false);
            }}
            className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
          >
            Нету Подходящих Историй
          </button>
        )}
      </aside>
    </form>
  );
}
