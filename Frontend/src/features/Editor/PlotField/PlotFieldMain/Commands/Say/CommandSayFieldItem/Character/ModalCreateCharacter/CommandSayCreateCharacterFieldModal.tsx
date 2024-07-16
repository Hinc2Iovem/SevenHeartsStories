import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../../../../hooks/UI/useOutOfModal";
import useCreateCharacterBlank from "../../../../hooks/Character/useCreateCharacterBlank";
import useUpdateNameOrEmotionOnCondition from "../../../../hooks/Say/useUpdateNameOrEmotionOnCondition";

type CommandSayCreateCharacterFieldTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEmotionValue: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  characterName: string;
  plotFieldCommandId: string;
  commandSayId: string;
  prevEmotionId: string;
};

export default function CommandSayCreateCharacterFieldModal({
  setShowModal,
  showModal,
  characterName,
  plotFieldCommandId,
  commandSayId,
  prevEmotionId,
  setEmotionValue,
}: CommandSayCreateCharacterFieldTypes) {
  const { storyId } = useParams();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLButtonElement | null>(null);
  const [characterId, setCharacterId] = useState("");

  useOutOfModal({
    setShowModal,
    showModal,
    modalRef,
  });

  useEffect(() => {
    if (showModal) {
      cursorRef.current?.focus();
    }
  }, [showModal]);

  const createCharacter = useCreateCharacterBlank({
    characterType: "MinorCharacter",
    name: characterName,
    storyId: storyId ?? "",
  });

  const updateNameOrEmotion = useUpdateNameOrEmotionOnCondition({
    plotFieldCommandId,
    prevEmotionId: prevEmotionId ?? "",
  });

  useEffect(() => {
    if (characterId?.trim().length) {
      updateNameOrEmotion.mutate({
        characterEmotionId: "",
        characterId,
        plotFieldCommandSayId: commandSayId,
      });
      setEmotionValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  useEffect(() => {
    if (createCharacter.data) {
      setCharacterId(createCharacter.data._id);
    }
  }, [createCharacter]);

  console.log(characterId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCharacter.mutate();

    setShowModal(false);
  };

  return (
    <aside
      ref={modalRef}
      className={`bg-white ${
        showModal ? "" : "hidden"
      } translate-y-[3.3rem] z-10 shadow-md text-gray-600 w-full rounded-md absolute p-[1rem]`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-[.5rem]">
        <p className="text-[1.4rem]">Такого персонажа не существует</p>
        <button
          ref={cursorRef}
          className="w-fit self-end text-[1.5rem] border-[1px] border-dotted border-black rounded-md px-[1rem] focus:shadow-inner active:bg-black shadow-md shadow-gray-200"
        >
          Создать
        </button>
      </form>
    </aside>
  );
}
