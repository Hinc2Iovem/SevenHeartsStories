import { useState } from "react";
import StoryHeader from "./StoryHeader";
import StoryList from "./StoryList";

export default function Story() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <section className="max-w-[146rem] px-[1rem] mx-auto flex flex-col gap-[3rem]">
      <StoryHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <StoryList />
    </section>
  );
}
