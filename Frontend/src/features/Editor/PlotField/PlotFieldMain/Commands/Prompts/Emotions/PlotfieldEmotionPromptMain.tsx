import useGetAllEmotionsByCharacterId from "../../../../../../../hooks/Fetching/CharacterEmotion/useGetAllEmotionsByCharacterId";
import PlotfieldEmotionsPrompt from "./PlotfieldEmotionsPrompt";
import "../promptStyles.css";

type PlotfieldEmotionPromptMainTypes = {
  emotionName: string;
  setEmotionName: React.Dispatch<React.SetStateAction<string>>;
  setEmotionId: React.Dispatch<React.SetStateAction<string>>;
  setShowEmotionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEmotionImg?: React.Dispatch<React.SetStateAction<string>>;
  showEmotionModal: boolean;
  characterId: string;
};

export default function PlotfieldEmotionPromptMain({
  emotionName,
  setEmotionName,
  setEmotionId,
  setEmotionImg,
  setShowEmotionModal,
  showEmotionModal,
  characterId,
}: PlotfieldEmotionPromptMainTypes) {
  const { data: allEmotions } = useGetAllEmotionsByCharacterId({
    characterId: characterId ?? "",
  });

  return (
    <aside
      className={`${showEmotionModal ? "" : "hidden"} ${
        emotionName ? "translate-y-[1rem]" : "translate-y-[2rem]"
      } absolute top-1/2 z-[10] p-[1rem] min-w-fit w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
    >
      {allEmotions &&
        allEmotions?.map((c) => (
          <PlotfieldEmotionsPrompt
            key={c._id}
            setEmotionName={setEmotionName}
            setEmotionId={setEmotionId}
            setEmotionImg={setEmotionImg}
            setShowEmotionModal={setShowEmotionModal}
            {...c}
          />
        ))}
    </aside>
  );
}
