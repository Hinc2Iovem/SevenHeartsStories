import { useEffect, useMemo, useRef, useState } from "react";
import useGetTranslationStoriesQueries from "../../../../hooks/Fetching/Translation/Story/useGetTranslationStoriesQueries";
import useOutOfModal from "../../../../hooks/UI/useOutOfModal";
import useDebounce from "../../../../hooks/utilities/useDebounce";

type StoryPromptTypes = {
  setStoryId: React.Dispatch<React.SetStateAction<string>>;
};

export default function StoryPrompt({ setStoryId }: StoryPromptTypes) {
  const [showStories, setShowStories] = useState(false);
  const modalStoriesRef = useRef<HTMLDivElement>(null);
  const [storyValue, setStoryValue] = useState("");
  const [storyBackupValue, setStoryBackupValue] = useState("");

  useOutOfModal({
    modalRef: modalStoriesRef,
    setShowModal: setShowStories,
    showModal: showStories,
  });

  const debouncedValue = useDebounce({ value: storyValue, delay: 500 });

  const allStories = useGetTranslationStoriesQueries({
    language: "russian",
    showQueries: showStories,
  });

  const memoizedStories = useMemo(() => {
    if (debouncedValue) {
      return allStories.map((queryResult) => ({
        data: queryResult.data?.filter((story) => {
          if (story.textFieldName === "storyName") {
            story.text.toLowerCase().includes(debouncedValue.toLowerCase());
          }
        }),
      }));
    }
    return allStories;
  }, [allStories, debouncedValue]);

  useEffect(() => {
    if (!showStories && !storyValue && storyBackupValue) {
      setStoryValue(storyBackupValue);
    }
  }, [showStories, storyValue, storyBackupValue]);

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
          setStoryBackupValue(storyValue);
          setStoryValue("");
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
        {memoizedStories.length > 0 ? (
          memoizedStories.map((s) =>
            s.data?.map((sd) => (
              <button
                key={sd._id}
                type="button"
                onClick={() => {
                  setStoryId(sd.storyId);
                  setStoryValue(sd.text);
                  setShowStories(false);
                }}
                className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
              >
                {sd.text}
              </button>
            ))
          )
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
