import { useEffect } from "react";
import command from "../../../../assets/images/Editor/command.png";
import plus from "../../../../assets/images/shared/add.png";
import useCheckKeysCombinationCreateBlankCommand from "../../../../hooks/helpers/useCheckKeysCombinationCreateBlankCommand";
import ButtonHoverPromptModal from "../../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import useCreateBlankCommand from "../PlotFieldMain/Commands/hooks/useCreateBlankCommand";

type PlotFieldHeaderTypes = {
  topologyBlockId: string;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PlotfieldHeader({
  topologyBlockId,
  setShowHeader,
}: PlotFieldHeaderTypes) {
  const createCommand = useCreateBlankCommand({ topologyBlockId });

  const commandCreatedByKeyCombinationBlankCommand =
    useCheckKeysCombinationCreateBlankCommand();

  useEffect(() => {
    if (
      commandCreatedByKeyCombinationBlankCommand === "blankPlotFieldCommand"
    ) {
      createCommand.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandCreatedByKeyCombinationBlankCommand]);

  return (
    <header className="flex gap-[1rem] justify-between items-center">
      <div className="flex gap-[1rem]">
        <ButtonHoverPromptModal
          contentName="Все команды"
          positionByAbscissa="left"
          asideClasses="text-[1.3rem] top-[3.5rem] bottom-[-3.5rem]"
          className="bg-primary-pastel-blue shadow-sm shadow-gray-400 active:scale-[.99]"
          variant="rectangle"
        >
          <img src={command} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
        <ButtonHoverPromptModal
          contentName="Создать строку"
          positionByAbscissa="left"
          className="bg-primary-light-blue shadow-sm shadow-gray-400 active:scale-[.99] relative"
          asideClasses="text-[1.3rem] top-[3.5rem] bottom-[-3.5rem]"
          onClick={() => createCommand.mutate()}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 translate-x-1/2 right-[0rem] bottom-0"
          />
          <img src={command} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </div>
      <button
        className="text-[1.6rem] px-[1rem] rounded-md shadow-md hover:bg-green-300 hover:text-white transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setShowHeader(true);
        }}
      >
        Заголовок
      </button>
    </header>
  );
}
