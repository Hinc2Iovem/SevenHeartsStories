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
    <ul className="flex gap-[1rem]">
      <li>
        <button
          onClick={() => setStoriesType("all")}
          className={`text-[1.4rem] ${
            storiesType === "all" ? "border-b-[2px] border-gray-700" : ""
          } hover:border-b-[2px] hover:border-gray-500 transition-all `}
        >
          Все
        </button>
      </li>
      <li>
        <button
          onClick={() => setStoriesType("done")}
          className={`text-[1.4rem] ${
            storiesType === "done" ? "border-b-[2px] border-gray-700" : ""
          } hover:border-b-[2px] hover:border-gray-500 transition-all `}
        >
          Законченные
        </button>
      </li>
      <li>
        <button
          onClick={() => setStoriesType("doing")}
          className={`text-[1.4rem] ${
            storiesType === "doing" ? "border-b-[2px] border-gray-700" : ""
          } hover:border-b-[2px] hover:border-gray-500 transition-all `}
        >
          В Процессе
        </button>
      </li>
    </ul>
  );
}
