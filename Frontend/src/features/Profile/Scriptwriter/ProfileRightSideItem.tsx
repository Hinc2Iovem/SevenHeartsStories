import { Link } from "react-router-dom";
import AssignScriptwriterModal from "./AssignScriptwriterModal";
import PreviewImage from "../../shared/utilities/PreviewImage";
import { useEffect, useState } from "react";
import useUpdateImg from "../../../hooks/Patching/useUpdateImg";
import { EpisodeStatusTypes } from "../../../types/StoryData/Episode/EpisodeTypes";
import { StoryFilterTypes } from "../../Story/Story";
import useGetDecodedJWTValues from "../../../hooks/Auth/useGetDecodedJWTValues";

type ProfileRightSideItemTypes = {
  storiesType: StoryFilterTypes;
  storyStatus?: EpisodeStatusTypes;
  storyId: string;
  setOpenedStoryId: React.Dispatch<React.SetStateAction<string>>;
  openedStoryId: string;
  setCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
  characterIds: string[];
  assignedWorkers?:
    | {
        staffId: string;
        storyStatus: EpisodeStatusTypes;
      }[]
    | undefined;
  title: string;
  imgUrl: string;
};

export default function ProfileRightSideItem({
  characterIds,
  openedStoryId,
  setCharacterIds,
  setOpenedStoryId,
  storiesType,
  storyId,
  assignedWorkers,
  storyStatus,
  title,
  imgUrl,
}: ProfileRightSideItemTypes) {
  const { roles } = useGetDecodedJWTValues();
  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );

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
  return (
    <article className="w-full h-[24rem] rounded-md shadow-md shadow-gray-400 relative">
      <div className="relative border-[3px] w-full h-[20rem] border-white bg-white">
        {imgUrl ? (
          <img
            src={imgUrl}
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
        <div
          className={`${
            (storyStatus && storiesType === "all") ||
            storiesType === "allAssigned"
              ? ""
              : "hidden"
          } absolute top-[.5rem] right-[.5rem] bg-white rounded-md shadow-md p-[.5rem]`}
        >
          <p className={`text-[1.5rem] self-end`}>
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
      {roles?.includes("editor") || roles?.includes("headscriptwriter") ? (
        <AssignScriptwriterModal
          openedStoryId={openedStoryId}
          setOpenedStoryId={setOpenedStoryId}
          storyTitle={title}
          storyId={storyId}
          setCharacterIds={setCharacterIds}
          characterIds={characterIds}
          assignedWorkers={assignedWorkers}
        />
      ) : null}
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
