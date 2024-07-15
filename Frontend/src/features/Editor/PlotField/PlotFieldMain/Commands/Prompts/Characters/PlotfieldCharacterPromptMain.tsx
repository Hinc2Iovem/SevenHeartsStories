import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCharactersByStoryId from "../../../../../../../hooks/Fetching/Character/useGetAllCharactersByStoryId";
import PlotfieldCharactersPrompt from "./PlotfieldCharactersPrompt";
import "../promptStyles.css";

type PlotfieldCharacterPromptMainTypes = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function PlotfieldCharacterPromptMain({
  value,
  setValue,
}: PlotfieldCharacterPromptMainTypes) {
  const { storyId } = useParams();

  const { data: allCharacters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [characterId, setCharacterId] = useState("");

  return (
    <aside
      className={`${showCharacterModal ? "" : "hidden"} ${
        value ? "translate-y-[1rem]" : "translate-y-[2rem]"
      } absolute top-1/2 z-[10] p-[1rem] min-w-[10rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
    >
      {allCharacters &&
        allCharacters?.map((c) => (
          <PlotfieldCharactersPrompt
            key={c._id}
            setCharacterName={setValue}
            setCharacterId={setCharacterId}
            setShowCharacterModal={setShowCharacterModal}
            {...c}
          />
        ))}
    </aside>
  );
}
