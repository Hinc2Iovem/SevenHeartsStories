import { useEffect, useRef, useState } from "react";
import useGetTranslationStoriesSearch from "../../../../hooks/Fetching/Translation/Story/useGetTranslationStoriesSearch";
import useOutOfModal from "../../../../hooks/UI/useOutOfModal";
import useDebounce from "../../../../hooks/utilities/useDebounce";
import { TranslationStoryTypes } from "../../../../types/Additional/TranslationTypes";

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

  const { data: allStories } = useGetTranslationStoriesSearch({
    language: "russian",
    debouncedValue,
    showStories,
  });

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
          if (storyValue?.trim().length) {
            setStoryBackupValue(storyValue);
          }
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
        {(allStories?.length || 0) > 0 ? (
          allStories?.map((s, i) => (
            <StoryPromptButton
              key={s._id || i + "story"}
              setShowStories={setShowStories}
              setStoryId={setStoryId}
              setStoryValue={setStoryValue}
              {...s}
            />
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

type StoryPromptButtonTypes = {
  setStoryId: React.Dispatch<React.SetStateAction<string>>;
  setStoryValue: React.Dispatch<React.SetStateAction<string>>;
  setShowStories: React.Dispatch<React.SetStateAction<boolean>>;
} & TranslationStoryTypes;

function StoryPromptButton({
  storyId,
  translations,
  setShowStories,
  setStoryId,
  setStoryValue,
}: StoryPromptButtonTypes) {
  const [storyTitle] = useState(
    translations.find((t) => t.textFieldName === "storyName")?.text || ""
  );

  return (
    <button
      type="button"
      onClick={() => {
        setStoryId(storyId);
        setStoryValue(storyTitle);
        setShowStories(false);
      }}
      className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
    >
      {storyTitle}
    </button>
  );
}
