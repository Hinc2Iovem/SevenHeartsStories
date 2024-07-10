import { useQuery } from "@tanstack/react-query";
import { AppearancePartTypes } from "../../types/StoryData/AppearancePart/AppearancePartTypes";
import PreviewImage from "../shared/utilities/PreviewImage";
import { useEffect, useState } from "react";
import { axiosCustomized } from "../../api/axios";
import { TranslationAppearancePartTypes } from "../../types/Additional/TranslationTypes";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";

export default function WardrobeItem({ _id, img }: AppearancePartTypes) {
  const { data: translationAppearancePart } = useQuery({
    queryKey: ["translation", "appearancePart", _id],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationAppearancePartTypes>(
          `/translations/appearanceParts/${_id}?currentLanguage=russian`
        )
        .then((r) => r.data),
  });

  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const updateImg = useUpdateImg({
    id: _id,
    path: "/appearanceParts",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      updateImg.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  return (
    <article className="w-full min-h-[20rem] h-full rounded-md shadow-md shadow-gray-400 bg-white">
      <div className="relative border-[3px] w-full h-[20rem] border-white">
        {img ? (
          <img
            src={img}
            alt="StoryBg"
            className={`w-[10rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer absolute rounded-md`}
          />
        ) : (
          <PreviewImage
            imgClasses="w-[10rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer absolute rounded-md"
            imagePreview={imagePreview}
            setPreview={setPreview}
          />
        )}
      </div>
      <div className="bg-white w-full p-[1rem] rounded-b-md shadow-md shadow-gray-400">
        <p className="text-[1.5rem] hover:text-gray-600 transition-all">
          {translationAppearancePart?.text}
        </p>
      </div>
    </article>
  );
}
