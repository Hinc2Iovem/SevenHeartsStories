import { useEffect, useState } from "react";
import { CharacterCharacteristicTypes } from "../../../../../../../types/StoryData/Characteristic/Characteristic";
import useGetTranslationCharacteristic from "../../../../../../../hooks/Fetching/Translation/useGetTranslationCharacteristic";

type EmotionCharacteristicNameTypes = {
  setCharacteristicName: React.Dispatch<React.SetStateAction<string>>;
  setCharacteristicId: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacteristicModal: React.Dispatch<React.SetStateAction<boolean>>;
} & CharacterCharacteristicTypes;

export default function PlotfieldCharacteristicsPrompt({
  _id,
  setCharacteristicName,
  setCharacteristicId,
  setShowCharacteristicModal,
}: EmotionCharacteristicNameTypes) {
  const { data: translationCharacteristic } = useGetTranslationCharacteristic({
    characterCharacteristicId: _id,
  });

  const [currentCharacteristicName, setCurrentCharacteristicName] =
    useState("");

  useEffect(() => {
    if (translationCharacteristic) {
      translationCharacteristic.map((tc) => {
        if (tc.textFieldName === "characterCharacteristic") {
          setCurrentCharacteristicName(tc.text);
        }
      });
    }
  }, [translationCharacteristic]);

  return (
    <button
      type="button"
      onClick={() => {
        setCharacteristicName(currentCharacteristicName);
        setCharacteristicId(_id);
        setShowCharacteristicModal(false);
      }}
      className="whitespace-nowrap w-full flex-wrap text-start text-[1.3rem] px-[.5rem] py-[.2rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
    >
      {currentCharacteristicName.length > 20
        ? currentCharacteristicName.substring(0, 20) + "..."
        : currentCharacteristicName}
    </button>
  );
}
