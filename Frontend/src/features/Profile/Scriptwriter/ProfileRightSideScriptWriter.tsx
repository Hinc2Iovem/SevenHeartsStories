import { useEffect, useMemo, useState } from "react";
import useGetDecodedJWTValues from "../../../hooks/Auth/useGetDecodedJWTValues";
import useGetAssignedStoriesByStatus from "../../../hooks/Fetching/Staff/useGetAssignedStoriesByStatus";
import useGetStoryTranslationByTextFieldName from "../../../hooks/Fetching/Story/useGetStoryTranslationByTextFieldName";
import useGetStoryTranslationByTextFieldNameAndSearchAssigned from "../../../hooks/Fetching/Story/useGetStoryTranslationByTextFieldNameAndSearchAssigned";
import { StoryFilterTypes } from "../../Story/Story";
import ProfileRightSideBySearchItem from "./ProfileRightSideBySearchItem";

type ProfileRightSideTypes = {
  storiesType: StoryFilterTypes;
  debouncedStory: string;
};

export default function ProfileRightSideScriptWriter({
  storiesType,
  debouncedStory,
}: ProfileRightSideTypes) {
  const [openedStoryId, setOpenedStoryId] = useState("");
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const { userId: staffId } = useGetDecodedJWTValues();

  useEffect(() => {
    setOpenedStoryId("");
  }, [storiesType]);

  const { data: allTranslatedStories } = useGetStoryTranslationByTextFieldName({
    language: "russian",
    storiesType,
  });

  const translatedMemoizedData = useMemo(() => {
    let allData = allTranslatedStories;

    if (debouncedStory) {
      allData = allData?.filter((t) =>
        t.text.toLowerCase().includes(debouncedStory.toLowerCase())
      );
    }

    return allData;
  }, [allTranslatedStories, debouncedStory]);

  const { data: translatedStories } =
    useGetStoryTranslationByTextFieldNameAndSearchAssigned({
      debouncedValue: debouncedStory,
      language: "russian",
      staffId: staffId || "",
      storiesType,
    });

  console.log(debouncedStory);

  const { data: assignedStories } = useGetAssignedStoriesByStatus({
    staffId: staffId ?? "",
    language: "russian",
    storyStatus: storiesType,
    text: debouncedStory,
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
      {storiesType === "all" && translatedMemoizedData?.length
        ? translatedMemoizedData.map((ts) => (
            <ProfileRightSideBySearchItem
              key={ts._id}
              setOpenedStoryId={setOpenedStoryId}
              openedStoryId={openedStoryId}
              storiesType={storiesType}
              storyId={ts.storyId}
              characterIds={characterIds}
              setCharacterIds={setCharacterIds}
              title={ts.textFieldName === "storyName" ? ts.text : ""}
            />
          ))
        : translatedStories?.length && storiesType === "allAssigned"
        ? translatedStories.map((ts) => (
            <ProfileRightSideBySearchItem
              key={ts._id}
              setOpenedStoryId={setOpenedStoryId}
              openedStoryId={openedStoryId}
              storiesType={storiesType}
              storyId={ts.storyId}
              characterIds={characterIds}
              setCharacterIds={setCharacterIds}
              title={ts.textFieldName === "storyName" ? ts.text : ""}
            />
          ))
        : assignedStories?.map((st) => (
            <ProfileRightSideBySearchItem
              key={st._id}
              setOpenedStoryId={setOpenedStoryId}
              openedStoryId={openedStoryId}
              storiesType={storiesType}
              storyId={st.storyId}
              characterIds={characterIds}
              setCharacterIds={setCharacterIds}
              title={st.textFieldName === "storyName" ? st.text : ""}
            />
          ))}
    </div>
  );
}
