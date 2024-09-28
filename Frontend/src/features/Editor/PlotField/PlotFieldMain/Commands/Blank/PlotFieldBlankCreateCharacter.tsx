import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../hooks/UI/useOutOfModal";
import { generateMongoObjectId } from "../../../../../../utils/generateMongoObjectId";
import usePlotfieldCommands from "../../../PlotFieldContext";
import useCreateCharacterBlank from "../hooks/Character/useCreateCharacterBlank";
import useCreateSayCommand from "../hooks/Say/useCreateSayCommand";
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
  const { updateCommandName: updateCommandNameOptimistic } =
    usePlotfieldCommands();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLButtonElement | null>(null);
  const characterId = generateMongoObjectId();

  useEffect(() => {
    if (showModal) {
      cursorRef.current?.focus();
    }
  }, [showModal]);

  const createSayCharacterCommand = useCreateSayCommand({
    plotFieldCommandId,
    topologyBlockId,
  });

  const createCharacter = useCreateCharacterBlank({
    characterType: "minorcharacter",
    name: characterName,
    storyId: storyId || "",
    onSuccessCallback: (characterId) => {
      createSayCharacterCommand.mutate({ type: "character", characterId });
    },
  });

  const updateCommandName = useUpdateCommandName({
    plotFieldCommandId,
    value: characterName,
    topologyBlockId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommandNameOptimistic({
      id: plotFieldCommandId,
      characterId,
      newCommand: "say",
      characterName,
      sayType: "character",
    });

    createCharacter.mutate({ characterId });
    updateCommandName.mutate({ valueForSay: true });
    setShowModal(false);
  };

  useOutOfModal({
    setShowModal,
    showModal,
    modalRef,
  });

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
