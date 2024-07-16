import { useEffect, useState } from "react";
import useGetAllCharacterNames from "../../../../../../../../hooks/Fetching/Translation/Characters/useGetAllCharacterNames";
import useGetTranslationCharactersQueries from "../../../../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharactersQueries";
import useUpdateNameOrEmotion from "../../../hooks/Say/useUpdateNameOrEmotion";
import CommandSayCreateCharacterFieldModal from "./ModalCreateCharacter/CommandSayCreateCharacterFieldModal";
import { useParams } from "react-router-dom";

type FormCharacterTypes = {
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  characterEmotionId: string;
  plotFieldCommandSayId: string;
  plotFieldCommandId: string;
  setShowCreateCharacterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEmotionValue: React.Dispatch<React.SetStateAction<string>>;
  showCreateCharacterModal: boolean;
};

export default function FormCharacter({
  characterEmotionId,
  plotFieldCommandId,
  plotFieldCommandSayId,
  nameValue,
  setNameValue,
  setEmotionValue,
  setShowCreateCharacterModal,
  showCreateCharacterModal,
}: FormCharacterTypes) {
  const { storyId } = useParams();
  const [newCharacterId, setNewCharacterId] = useState("");

  const updateNameOrEmotion = useUpdateNameOrEmotion({
    characterEmotionId,
    characterId: newCharacterId,
    plotFieldCommandId,
    plotFieldCommandSayId,
    prevEmotionId: characterEmotionId,
  });

  const translatedCharacters = useGetTranslationCharactersQueries({
    storyId: storyId ?? "",
  });

  const allNames = useGetAllCharacterNames({ translatedCharacters });

  const handleSetCharacterId = (index: number) => {
    const allIds: string[] = [];
    for (const t of translatedCharacters) {
      t.data?.map((tp) => {
        if (tp.textFieldName === "characterName") {
          allIds.push(tp.characterId);
        }
      });
    }
    if (allIds) {
      setNewCharacterId(allIds[index]);
      return;
    }
  };

  useEffect(() => {
    if (newCharacterId?.trim().length) {
      updateNameOrEmotion.mutate();
      setEmotionValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCharacterId]);

  const handleNameFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValue.trim().length) {
      console.log("Заполните поле");
      return;
    }
    if (allNames.includes(nameValue.toLowerCase())) {
      let index = -1;
      index = allNames.findIndex((v) => v === nameValue.toLowerCase());
      handleSetCharacterId(index);
    } else {
      setShowCreateCharacterModal(true);
      return;
    }
  };
  return (
    <>
      <form
        onSubmit={handleNameFormSubmit}
        className="sm:w-[20%] flex-grow w-full relative"
      >
        <input
          type="text"
          value={nameValue}
          className="text-[1.3rem] w-full outline-gray-300 capitalize px-[1rem] py-[.5rem] rounded-md shadow-md"
          onChange={(e) => setNameValue(e.target.value)}
        />
      </form>
      <CommandSayCreateCharacterFieldModal
        setEmotionValue={setEmotionValue}
        characterName={nameValue}
        prevEmotionId={characterEmotionId}
        commandSayId={plotFieldCommandSayId}
        plotFieldCommandId={plotFieldCommandId}
        setShowModal={setShowCreateCharacterModal}
        showModal={showCreateCharacterModal}
      />
    </>
  );
}
