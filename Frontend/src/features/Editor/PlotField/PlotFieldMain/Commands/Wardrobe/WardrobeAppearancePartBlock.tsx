import { useEffect, useState } from "react";
import useGetAppearancePartById from "../../../../../../hooks/Fetching/AppearancePart/useGetAppearancePartById";
import useGetTranslationAppearancePart from "../../../../../../hooks/Fetching/Translation/useGetTranslationAppearancePart";
import { CommandWardrobeAppearanceTypeBlockTypes } from "../../../../../../types/StoryEditor/PlotField/Wardrobe/WardrobeTypes";
import useUpdateImg from "../../../../../../hooks/Patching/useUpdateImg";
import PreviewImageSmallIcons from "../../../../../shared/utilities/PreviewImageSmallIcons";

export default function WardrobeAppearancePartBlock({
  appearancePartId,
}: CommandWardrobeAppearanceTypeBlockTypes) {
  const [showFullName, setShowFullName] = useState(false);
  const [appearancePartImg, setAppearancePartImg] = useState<
    string | null | ArrayBuffer
  >("");

  const [appearancePartName, setAppearancePartName] = useState("");
  const { data: appearancePartTranslated } = useGetTranslationAppearancePart({
    appearancePartId,
  });
  const { data: appearancePart } = useGetAppearancePartById({
    appearancePartId,
  });

  useEffect(() => {
    if (appearancePartTranslated) {
      setAppearancePartName(appearancePartTranslated.text);
    }
  }, [appearancePartTranslated]);

  useEffect(() => {
    if (appearancePart) {
      setAppearancePartImg(appearancePart?.img ?? "");
    }
  }, [appearancePart]);

  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>("");

  const updateAppearancePartImg = useUpdateImg({
    id: appearancePartId,
    path: "/appearanceParts",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      updateAppearancePartImg.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);
  return (
    <div className="w-full h-[10rem] max-h-[10rem] flex flex-col bg-white rounded-md gap-[.5rem] shadow-md hover:scale-[1.01] relative">
      {appearancePartImg ? (
        <img
          src={(appearancePartImg as string) || ""}
          alt="AppearancePartImg"
          className="w-full object-contain h-[7rem]"
        />
      ) : (
        <PreviewImageSmallIcons
          imagePreview={imagePreview}
          imgClasses="w-full object-contain h-[7rem]"
          setPreview={setPreview}
          divClasses="relative w-full"
          imgNotExistingClasses="absolute w-[50%] left-1/2 -translate-x-1/2 top-[.5rem] rounded-md"
        />
      )}
      <h4
        onMouseOver={() => {
          if (appearancePartName?.trim().length > 13) {
            setShowFullName(true);
          }
        }}
        className="text-[1.2rem] whitespace-nowrap px-[.2rem]"
      >
        {appearancePartName?.trim().length > 13
          ? appearancePartName.substring(0, 13) + "..."
          : appearancePartName}
      </h4>
      <aside
        onMouseOut={() => {
          if (appearancePartName?.trim().length > 13) {
            setShowFullName(false);
          }
        }}
        className={`${
          showFullName ? "" : "hidden"
        } absolute z-[50] bottom-[0rem] bg-white w-fit whitespace-nowrap rounded-md shadow-md shadow-gray-400 text-[1.2rem] p-[.5rem]`}
      >
        {appearancePartName}
      </aside>
    </div>
  );
}
