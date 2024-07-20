import { useEffect, useState } from "react";
import useGetTranslationAppearancePart from "../../../../../../../hooks/Fetching/Translation/useGetTranslationAppearancePart";
import { AppearancePartTypes } from "../../../../../../../types/StoryData/AppearancePart/AppearancePartTypes";

type EmotionAppearancePartNameTypes = {
  setAppearancePartName?: React.Dispatch<React.SetStateAction<string>>;
  setAppearancePartId?: React.Dispatch<React.SetStateAction<string>>;
  setAppearancePartImg?: React.Dispatch<React.SetStateAction<string>>;
  setShowAppearancePartModal: React.Dispatch<React.SetStateAction<boolean>>;
} & AppearancePartTypes;

export default function PlotfieldAppearancePartsPrompt({
  _id,
  img,
  setAppearancePartName,
  setAppearancePartId,
  setShowAppearancePartModal,
  setAppearancePartImg,
}: EmotionAppearancePartNameTypes) {
  const { data: translationAppearancePart } = useGetTranslationAppearancePart({
    appearancePartId: _id,
  });

  const [currentAppearancePartName, setCurrentAppearancePartName] =
    useState("");

  useEffect(() => {
    if (translationAppearancePart) {
      setCurrentAppearancePartName(translationAppearancePart.text);
    }
  }, [translationAppearancePart]);

  return (
    <>
      {img ? (
        <button
          type="button"
          onClick={() => {
            if (setAppearancePartName) {
              setAppearancePartName(currentAppearancePartName);
            }
            if (setAppearancePartId) {
              setAppearancePartId(_id);
            }
            setShowAppearancePartModal(false);
            if (setAppearancePartImg) {
              setAppearancePartImg(img);
            }
          }}
          className="rounded-md flex px-[.5rem] py-[.2rem] items-center justify-between hover:bg-primary-light-blue hover:text-white transition-all "
        >
          <p className="text-[1.3rem] rounded-md">
            {currentAppearancePartName.length > 20
              ? currentAppearancePartName.substring(0, 20) + "..."
              : currentAppearancePartName}
          </p>
          <img
            src={img}
            alt="AppearancePartImg"
            className="w-[3rem] rounded-md"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (setAppearancePartName) {
              setAppearancePartName(currentAppearancePartName);
            }
            if (setAppearancePartId) {
              setAppearancePartId(_id);
            }
            setShowAppearancePartModal(false);
            if (setAppearancePartImg) {
              setAppearancePartImg("");
            }
          }}
          className="text-start text-[1.3rem] px-[.5rem] py-[.2rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
        >
          {currentAppearancePartName.length > 20
            ? currentAppearancePartName.substring(0, 20) + "..."
            : currentAppearancePartName}
        </button>
      )}
    </>
  );
}
