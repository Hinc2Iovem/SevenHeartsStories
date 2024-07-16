import { useEffect, useRef, useState } from "react";
import useCreateEmotion from "../../../../../../../../../hooks/Posting/Emotion/useCreateEmotion";
import useOutOfModal from "../../../../../../../../../hooks/UI/useOutOfModal";
import useUpdateNameOrEmotionOnCondition from "../../../../hooks/Say/useUpdateNameOrEmotionOnCondition";

type CommandSayCreateEmotionFieldModalTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  emotionName: string;
  plotFieldCommandId: string;
  commandSayId: string;
  characterId: string;
  prevCharacterEmotionId: string;
};

export default function CommandSayCreateEmotionFieldModal({
  setShowModal,
  showModal,
  emotionName,
  plotFieldCommandId,
  commandSayId,
  characterId,
  prevCharacterEmotionId,
}: CommandSayCreateEmotionFieldModalTypes) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLButtonElement | null>(null);
  const [emotionId, setEmotionId] = useState("");

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

  const createEmotion = useCreateEmotion({
    emotionName,
    characterId,
  });

  const updateNameOrEmotion = useUpdateNameOrEmotionOnCondition({
    plotFieldCommandId,
    prevEmotionId: prevCharacterEmotionId,
  });

  useEffect(() => {
    if (emotionId?.trim().length) {
      updateNameOrEmotion.mutate({
        characterEmotionId: emotionId,
        characterId: "",
        plotFieldCommandSayId: commandSayId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotionId]);

  useEffect(() => {
    if (createEmotion.data) {
      setEmotionId(createEmotion.data._id);
    }
  }, [createEmotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmotion.mutate();
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
        <p className="text-[1.4rem]">Такой эмоции не существует</p>
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
