import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../hooks/UI/useOutOfModal";
import useCreateCharacterBlank from "../hooks/Character/useCreateCharacterBlank";
import useCreateSayCharacterCommand from "../hooks/Say/useCreateSayCharacterCommand";
import useUpdateCommandName from "../hooks/useUpdateCommandName";

type PlotFieldBlankCreateCharacterTypes = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  characterName: string;
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export default function PlotFieldBlankCreateCharacter({
  setShowModal,
  showModal,
  characterName,
  plotFieldCommandId,
  topologyBlockId,
}: PlotFieldBlankCreateCharacterTypes) {
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

  useEffect(() => {
    if (createCharacter.data) {
      setCharacterId(createCharacter.data._id);
    }
  }, [createCharacter]);

  const createSayCharacterCommand = useCreateSayCharacterCommand({
    characterId: createCharacter.data?._id ?? "",
    plotFieldCommandId,
  });

  useEffect(() => {
    if (characterId?.trim().length) {
      createSayCharacterCommand.mutate({ type: "character" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  const updateCommandName = useUpdateCommandName({
    plotFieldCommandId,
    value: characterName,
    topologyBlockId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCharacter.mutate();
    updateCommandName.mutate({ valueForSay: true });
    setShowModal(false);
  };

  return (
    <aside
      ref={modalRef}
      className={`bg-white ${
        showModal ? "" : "hidden"
      } z-10 shadow-md text-gray-600 w-full rounded-md absolute translate-y-[.5rem] p-[1rem]`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-[.5rem]">
        <p className="text-[1.4rem]">
          Такой команды или персонажа с таким именем не существует
        </p>
        <button
          ref={cursorRef}
          className="w-fit self-end text-[1.5rem] border-[1px] border-dotted border-black rounded-md px-[1rem] focus:shadow-inner active:bg-black shadow-md shadow-gray-200"
        >
          Создать Персонажа
        </button>
      </form>
    </aside>
  );
}
