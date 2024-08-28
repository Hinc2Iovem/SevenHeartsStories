import { useParams } from "react-router-dom";
import useGetTranslationCharacters from "../../../hooks/Fetching/Translation/Characters/useGetTranslationCharacters";
import useEscapeOfModal from "../../../hooks/UI/useEscapeOfModal";
import EmotionHeaderCharacterNames from "./EmotionHeaderCharacterNames";

type EmotionHeaderCharacterTypes = {
  setShowCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  showCharacterModal: boolean;
  characterName: string;
};

export default function EmotionHeaderCharacters({
  setCharacterId,
  setShowModal,
  setShowCharacterModal,
  showCharacterModal,
  characterName,
  setCharacterName,
}: EmotionHeaderCharacterTypes) {
  const { storyId } = useParams();

  const { data: characters } = useGetTranslationCharacters({
    storyId: storyId ?? "",
    language: "russian",
  });

  useEscapeOfModal({
    setValue: setShowCharacterModal,
    value: showCharacterModal,
  });
  return (
    <div className="flex flex-col gap-[.5rem] relative min-w-[20rem]">
      <button
        onClick={() => {
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
        className={`${showCharacterModal ? "" : "hidden"} ${
          characterName ? "translate-y-[1rem]" : "translate-y-[2rem]"
        } absolute top-1/2 z-[10] p-[1rem] min-w-[10rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem]`}
      >
        {characters &&
          characters?.map((c) => (
            <EmotionHeaderCharacterNames
              key={c._id}
              setCharacterName={setCharacterName}
              setCharacterId={setCharacterId}
              setShowCharacterModal={setShowCharacterModal}
              {...c}
            />
          ))}
      </aside>
    </div>
  );
}
