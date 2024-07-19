import { useEffect, useState } from "react";
import useGetAllEmotionsByCharacterId from "../../../../../../../../hooks/Fetching/CharacterEmotion/useGetAllEmotionsByCharacterId";
import { CommandSayVariationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useGetEmotionEnabled from "../../../hooks/Emotion/useGetEmotionEnabled";
import useUpdateNameOrEmotion from "../../../hooks/Say/useUpdateNameOrEmotion";
import CommandSayCreateEmotionFieldModal from "./ModalCreateEmotion/CommandSayCreateEmotionFieldModal";

type FormEmotionTypes = {
  characterEmotionId: string;
  plotFieldCommandSayId: string;
  plotFieldCommandId: string;
  setShowCreateEmotionModal: React.Dispatch<React.SetStateAction<boolean>>;
  characterId: string;
  showCreateEmotionModal: boolean;
  setEmotionValue: React.Dispatch<React.SetStateAction<string>>;
  emotionValue: string;
  commandSayType: CommandSayVariationTypes;
};

export default function FormEmotion({
  characterEmotionId,
  plotFieldCommandId,
  plotFieldCommandSayId,
  characterId,
  setShowCreateEmotionModal,
  showCreateEmotionModal,
  commandSayType,
  emotionValue,
  setEmotionValue,
}: FormEmotionTypes) {
  const [newEmotionId, setNewEmotionId] = useState("");

  const { data: emotion } = useGetEmotionEnabled({
    characterEmotionId,
    commandSayType,
  });

  useEffect(() => {
    if (emotion) {
      setEmotionValue(emotion.emotionName ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotion]);

  const { data: emotions } = useGetAllEmotionsByCharacterId({ characterId });

  const [allEmotions, setAllEmotions] = useState<string[]>([]);

  const updateNameOrEmotion = useUpdateNameOrEmotion({
    characterEmotionId: newEmotionId,
    characterId: "",
    plotFieldCommandId,
    plotFieldCommandSayId,
    prevEmotionId: characterEmotionId,
  });

  useEffect(() => {
    if (emotions) {
      const allEms: string[] = [];
      emotions.map((em) => allEms.push(em.emotionName.toLowerCase()));
      setAllEmotions(allEms);
    }
  }, [emotions]);

  useEffect(() => {
    if (newEmotionId?.trim().length) {
      updateNameOrEmotion.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEmotionId]);

  const handleSetEmotionId = (index: number) => {
    const allIds: string[] = [];
    if (emotions) {
      for (const e of emotions) {
        allIds.push(e._id);
      }
      if (allIds) {
        setNewEmotionId(allIds[index]);
        return;
      }
    } else {
      console.log("Нету эмоций");
      return;
    }
  };

  const handleEmotionFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionValue.trim().length) {
      console.log("Заполните поле");
      return;
    }
    if (allEmotions.includes(emotionValue.toLowerCase())) {
      if (emotions) {
        const index = emotions.findIndex(
          (e) => e.emotionName.toLowerCase() === emotionValue.toLowerCase()
        );
        handleSetEmotionId(index);
      }
    } else {
      setShowCreateEmotionModal(true);
      return;
    }
  };

  return (
    <>
      <form
        onSubmit={handleEmotionFormSubmit}
        className="sm:w-[20%] flex-grow w-full"
      >
        <input
          type="text"
          value={emotionValue}
          placeholder="Эмоция"
          className="text-[1.3rem] w-full outline-gray-300 capitalize px-[1rem] py-[.5rem] rounded-md shadow-md"
          onChange={(e) => setEmotionValue(e.target.value)}
        />
      </form>
      <CommandSayCreateEmotionFieldModal
        characterId={characterId}
        commandSayId={plotFieldCommandSayId}
        emotionName={emotionValue}
        plotFieldCommandId={plotFieldCommandId}
        prevCharacterEmotionId={characterEmotionId}
        setShowModal={setShowCreateEmotionModal}
        showModal={showCreateEmotionModal}
      />
    </>
  );
}
