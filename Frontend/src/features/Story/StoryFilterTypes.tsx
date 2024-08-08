import { StoryFilterTypes } from "./Story";

type StoryFilterTypesProps = {
  setStoriesType: React.Dispatch<React.SetStateAction<StoryFilterTypes>>;
  storiesType: StoryFilterTypes;
};

export default function StoryFilterTypesHeader({
  storiesType,
  setStoriesType,
}: StoryFilterTypesProps) {
  return (
    <ul className="flex flex-col gap-[1rem] bg-white rounded-md p-[1rem] shadow-sm">
      <li>
        <button
          onClick={() => setStoriesType("all")}
          className={`text-[1.4rem] ${
            storiesType === "all"
              ? "rounded-md bg-primary-light-blue text-white w-full text-start px-[1rem] py-[.5rem]"
              : ""
          } hover:bg-primary-light-blue outline-gray-300 hover:text-white hover:w-full hover:px-[1rem] hover:py-[.5rem] hover:rounded-md text-start transition-all `}
        >
          Все
        </button>
      </li>
      <li>
        <button
          onClick={() => setStoriesType("done")}
          className={`text-[1.4rem] ${
            storiesType === "done"
              ? "rounded-md bg-primary-light-blue text-white w-full text-start px-[1rem] py-[.5rem]"
              : ""
          } hover:bg-primary-light-blue outline-gray-300 hover:text-white hover:w-full hover:px-[1rem] hover:py-[.5rem] hover:rounded-md text-start transition-all `}
        >
          Законченные
        </button>
      </li>
      <li>
        <button
          onClick={() => setStoriesType("doing")}
          className={`text-[1.4rem] ${
            storiesType === "doing"
              ? "rounded-md bg-primary-light-blue text-white w-full text-start px-[1rem] py-[.5rem]"
              : ""
          } hover:bg-primary-light-blue outline-gray-300 hover:text-white hover:w-full hover:px-[1rem] hover:py-[.5rem] hover:rounded-md text-start transition-all `}
        >
          В Процессе
        </button>
      </li>
    </ul>
  );
}
