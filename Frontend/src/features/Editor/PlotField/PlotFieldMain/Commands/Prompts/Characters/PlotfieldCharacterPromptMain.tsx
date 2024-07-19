import { useParams } from "react-router-dom";
import useGetAllCharactersByStoryId from "../../../../../../../hooks/Fetching/Character/useGetAllCharactersByStoryId";
import PlotfieldCharactersPrompt from "./PlotfieldCharactersPrompt";
import "../promptStyles.css";

type PlotfieldCharacterPromptMainTypes = {
  characterName: string;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterImg?: React.Dispatch<React.SetStateAction<string>>;
  showCharacterModal: boolean;
};

export default function PlotfieldCharacterPromptMain({
  characterName,
  setCharacterName,
  setCharacterId,
  setCharacterImg,
  setShowCharacterModal,
  showCharacterModal,
}: PlotfieldCharacterPromptMainTypes) {
  const { storyId } = useParams();

  const { data: allCharacters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });

  return (
    <aside
      className={`${showCharacterModal ? "" : "hidden"} ${
        characterName ? "translate-y-[1rem]" : "translate-y-[2rem]"
      } absolute top-1/2 z-[10] p-[1rem] min-w-[10rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
    >
      {allCharacters &&
        allCharacters?.map((c) => (
          <PlotfieldCharactersPrompt
            key={c._id}
            setCharacterName={setCharacterName}
            setCharacterId={setCharacterId}
            setCharacterImg={setCharacterImg}
            setShowCharacterModal={setShowCharacterModal}
            {...c}
          />
        ))}
    </aside>
  );
}
