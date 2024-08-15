import { useEffect, useState } from "react";
import useGetSingleStory from "../../../hooks/Fetching/Story/useGetSingleStory";
import { StoryFilterTypes } from "../../Story/Story";
import ProfileRightSideItem from "./ProfileRightSideItem";

type ProfileRightSideBySearchItemTypes = {
  storiesType: StoryFilterTypes;
  storyId: string;
  setOpenedStoryId: React.Dispatch<React.SetStateAction<string>>;
  openedStoryId: string;
  setCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
  characterIds: string[];
  title: string;
};

export default function ProfileRightSideBySearchItem({
  characterIds,
  openedStoryId,
  setCharacterIds,
  setOpenedStoryId,
  storiesType,
  storyId,
  title,
}: ProfileRightSideBySearchItemTypes) {
  const { data: story } = useGetSingleStory({ storyId });
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (story) {
      setImgUrl(story?.imgUrl || "");
    }
  }, [story]);
  return (
    <ProfileRightSideItem
      characterIds={characterIds}
      imgUrl={imgUrl}
      openedStoryId={openedStoryId}
      setCharacterIds={setCharacterIds}
      setOpenedStoryId={setOpenedStoryId}
      storiesType={storiesType}
      storyId={storyId}
      title={title}
      assignedWorkers={story?.storyStaffInfo || []}
      storyStatus={story?.storyStatus}
    />
  );
}
