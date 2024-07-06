import { StoryTypes } from "./Story";
import DoingPagination from "./StoryListDoing/DoingPagination";
import StoryListDoing from "./StoryListDoing/StoryListDoing";
import FinishedPagination from "./StoryListFinished/FinishedPagination";
import StoryListFinished from "./StoryListFinished/StoryListFinished";

type StoryListTypes = {
  storiesType: StoryTypes;
};

export default function StoryList({ storiesType }: StoryListTypes) {
  return (
    <main className="flex flex-col gap-[3rem]">
      {storiesType === "all" ? (
        <>
          <StoryListFinished />
          <StoryListDoing />
        </>
      ) : storiesType === "finished" ? (
        <FinishedPagination />
      ) : storiesType === "doing" ? (
        <DoingPagination />
      ) : null}
    </main>
  );
}
