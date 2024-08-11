import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCharactersByStoryId from "../../../hooks/Fetching/Character/useGetAllCharactersByStoryId";
import useGetTranslationCharacters from "../../../hooks/Fetching/Translation/Characters/useGetTranslationCharacters";
import useEscapeOfModal from "../../../hooks/UI/useEscapeOfModal";
import { CharacterGetTypes } from "../../../types/StoryData/Character/CharacterTypes";

type WardrobeHeaderChooseCharacterTypes = {
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBodyTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCharacterModal: boolean;
};

export default function WardrobeHeaderChooseCharacter({
  setShowBodyTypeModal,
  setShowCharacterModal,
  setCharacterId,
  setShowModal,
  showCharacterModal,
}: WardrobeHeaderChooseCharacterTypes) {
  const { storyId } = useParams();
  const [characterName, setCharacterName] = useState("");

  useEscapeOfModal({
    setValue: setShowCharacterModal,
    value: showCharacterModal,
  });

  const { data: characters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });
  return (
    <div className="flex flex-col gap-[.5rem] relative min-w-[20rem]">
      <button
        onClick={() => {
          setShowBodyTypeModal(false);
          setShowModal(false);
          setShowCharacterModal(true);
        }}
        className="text-[1.5rem] px-[1rem] py-[.5rem] outline-gray-400 bg-white rounded-md shadow-md hover:bg-primary-pastel-blue hover:text-white transition-all active:scale-[0.98]"
      >
        Имя Персонажа
      </button>
      <p
        className={`${
          characterName ? "" : "hidden"
        } text-[1.5rem] border-b-[2px] border-gray-700 border-dotted text-center rounded-md`}
      >
        {characterName}
      </p>
      <aside
        id="scrollBar"
        className={`${
          showCharacterModal ? "" : "hidden"
        } absolute top-1/2 translate-y-[1rem] z-[10] p-[1rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem]`}
      >
        {characters &&
          characters?.map((c) => (
            <WardrobeHeaderChooseCharacterItem
              key={c._id}
              setCharacterId={setCharacterId}
              setCharacterName={setCharacterName}
              setShowCharacterModal={setShowCharacterModal}
              {...c}
            />
          ))}
      </aside>
    </div>
  );
}

type WardrobeHeaderChooseCharacterItemTypes = {
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
} & CharacterGetTypes;

function WardrobeHeaderChooseCharacterItem({
  _id,
  img,
  setCharacterId,
  setCharacterName,
  setShowCharacterModal,
}: WardrobeHeaderChooseCharacterItemTypes) {
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
          }}
          className="rounded-md flex px-[.5rem] py-[.2rem] items-center justify-between hover:bg-primary-light-blue hover:text-white transition-all "
        >
          <p className="text-[1.3rem] rounded-md">{currentCharacterName}</p>
          <img src={img} alt="CharacterImg" className="w-[3rem] rounded-md" />
        </button>
      ) : (
        <button
          onClick={() => {
            setCharacterName(currentCharacterName);
            setCharacterId(_id);
            setShowCharacterModal(false);
          }}
          className="text-start text-[1.3rem] px-[.5rem] py-[.2rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
        >
          {currentCharacterName}
        </button>
      )}
    </>
  );
}
