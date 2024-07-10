import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useGetAssignedStories from "../../hooks/Fetching/Staff/useGetAssignedStories";
import useGetSingleStory from "../../hooks/Fetching/Story/useGetSingleStory";
import useGetTranslationStory from "../../hooks/Fetching/Translation/useGetTranslationStory";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";
import { StoryInfoTypes } from "../../types/StoryData/Story/StoryTypes";
import PreviewImage from "../shared/utilities/PreviewImage";
import { StoryFilterTypes } from "../Story/Story";

type ProfileRightSideTypes = {
  storiesType: StoryFilterTypes;
};

export default function ProfileRightSide({
  storiesType,
}: ProfileRightSideTypes) {
  const staffId = localStorage.getItem("staffId");

  const { data } = useGetAssignedStories({ staffId: staffId ?? "" });

  const memoizedData = useMemo(() => {
    const allData = data;
    if (storiesType === "all") {
      return allData;
    } else if (storiesType === "doing") {
      return allData?.filter((i) => i.storyStatus === "doing");
    } else if (storiesType === "done") {
      return allData?.filter((i) => i.storyStatus === "done");
    } else {
      return allData;
    }
  }, [data, storiesType]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
      {memoizedData?.map((st) => (
        <ProfileRightSideItem key={st._id} {...st} />
      ))}
    </div>
  );
}

function ProfileRightSideItem({ storyId, storyStatus }: StoryInfoTypes) {
  const { data: translationStory } = useGetTranslationStory({
    id: storyId,
    language: "russian",
  });
  const { data: story } = useGetSingleStory({ storyId });
  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [title, setTitle] = useState("");
  const uploadImgMutation = useUpdateImg({
    id: storyId,
    path: "/stories",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      uploadImgMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  useEffect(() => {
    if (translationStory) {
      translationStory.map((d) => {
        if (d.textFieldName === "storyName") {
          setTitle(d.text);
        }
      });
    }
  }, [translationStory]);

  return (
    <article className="w-full h-[24rem] rounded-md shadow-md shadow-gray-400">
      <div className="relative border-[3px] w-full h-[20rem] border-white bg-white">
        {story?.imgUrl ? (
          <img
            src={story.imgUrl}
            alt="StoryBg"
            className="w-full h-full object-cover absolute rounded-md"
          />
        ) : (
          <PreviewImage
            imgClasses="w-full h-full object-cover rounded-md absolute top-0 bottom-0 left-0 right-0 border-[2px] border-white"
            imagePreview={imagePreview}
            setPreview={setPreview}
          />
        )}
        <div className="absolute top-[.5rem] right-[.5rem] bg-white rounded-md shadow-md p-[.5rem]">
          <p className="text-[1.5rem] self-end">
            Статус:{" "}
            <span
              className={`text-[1.4rem] ${
                storyStatus === "doing" ? "text-orange-400" : "text-green-400"
              }`}
            >
              {storyStatus === "doing" ? "В процессе" : "Завершена"}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white w-full p-[1rem] rounded-b-md shadow-md shadow-gray-400">
        <Link
          to={`/stories/${storyId}`}
          className="text-[1.5rem] hover:text-gray-600 transition-all"
        >
          {title.length > 25 ? title.substring(0, 25) + "..." : title}
        </Link>
      </div>
    </article>
  );
}
