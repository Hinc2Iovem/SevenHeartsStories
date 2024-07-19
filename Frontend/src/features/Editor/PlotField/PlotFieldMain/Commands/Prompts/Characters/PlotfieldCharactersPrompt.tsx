import { useEffect, useState } from "react";
import useGetTranslationCharacters from "../../../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharacters";
import { CharacterGetTypes } from "../../../../../../../types/StoryData/Character/CharacterTypes";

type EmotionCharacterNameTypes = {
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setCharacterImg?: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
} & CharacterGetTypes;

export default function PlotfieldCharactersPrompt({
  _id,
  img,
  setCharacterName,
  setCharacterId,
  setShowCharacterModal,
  setCharacterImg,
}: EmotionCharacterNameTypes) {
  const { data: translationCharacter } = useGetTranslationCharacters({
    characterId: _id,
  });

  const [currentCharacterName, setCurrentCharacterName] = useState("");

  useEffect(() => {
    if (translationCharacter) {
      translationCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCurrentCharacterName(tc.text);
        }
      });
    }
  }, [translationCharacter]);

  return (
    <>
      {img ? (
        <button
          onClick={() => {
            setCharacterName(currentCharacterName);
            setCharacterId(_id);
            setShowCharacterModal(false);
            if (setCharacterImg) {
              setCharacterImg(img);
            }
          }}
          className="rounded-md flex px-[.5rem] py-[.2rem] items-center justify-between hover:bg-primary-light-blue hover:text-white transition-all "
        >
          <p className="text-[1.3rem] rounded-md">
            {currentCharacterName.length > 20
              ? currentCharacterName.substring(0, 20) + "..."
              : currentCharacterName}
          </p>
          <img src={img} alt="CharacterImg" className="w-[3rem] rounded-md" />
        </button>
      ) : (
        <button
          onClick={() => {
            setCharacterName(currentCharacterName);
            setCharacterId(_id);
            setShowCharacterModal(false);
            if (setCharacterImg) {
              setCharacterImg("");
            }
          }}
          className="text-start text-[1.3rem] px-[.5rem] py-[.2rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
        >
          {currentCharacterName.length > 20
            ? currentCharacterName.substring(0, 20) + "..."
            : currentCharacterName}
        </button>
      )}
    </>
  );
}
