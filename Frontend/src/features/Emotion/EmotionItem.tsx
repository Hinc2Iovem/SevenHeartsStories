import { useEffect, useState } from "react";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";
import { CharacterEmotionTypes } from "../../types/StoryData/Emotion/CharacterEmotion";
import PreviewImage from "../shared/utilities/PreviewImage";

export default function EmotionItem({
  emotionName,
  imgUrl,
  _id,
}: CharacterEmotionTypes) {
  const [imgPreview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const updateImg = useUpdateImg({
    id: _id,
    path: "/characterEmotions",
    preview: imgPreview,
  });

  useEffect(() => {
    if (imgPreview) {
      updateImg.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgPreview]);

  return (
    <article className="w-full min-h-[24rem] h-full rounded-md shadow-md shadow-gray-400 bg-white">
      <div className="relative border-[3px] w-full h-[20rem] border-white">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="StoryBg"
            className={`w-[10rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer absolute rounded-md`}
          />
        ) : (
          <PreviewImage
            imgClasses="w-[10rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer absolute rounded-md"
            imagePreview={imgPreview}
            setPreview={setPreview}
          />
        )}
      </div>
      <div className="bg-white w-full p-[1rem] rounded-b-md shadow-md shadow-gray-400">
        <p className="text-[1.5rem] hover:text-gray-600 transition-all">
          {emotionName}
        </p>
      </div>
    </article>
  );
}
