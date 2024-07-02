import { useState } from "react";
import StoryHeader from "./StoryHeader";
import StoryList from "./StoryList";
import StoryFilterTypes from "./StoryFilterTypes";

export type StoryTypes = "all" | "finished" | "doing";

export default function Story() {
  const [storiesType, setStoriesType] = useState<StoryTypes>("all");
  const [searchValue, setSearchValue] = useState("");

  return (
    <section className="max-w-[146rem] px-[1rem] mx-auto flex flex-col gap-[3rem] mb-[2rem]">
      <StoryHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <StoryFilterTypes
        setStoriesType={setStoriesType}
        storiesType={storiesType}
      />
      <StoryList storiesType={storiesType} />
    </section>
  );
}
