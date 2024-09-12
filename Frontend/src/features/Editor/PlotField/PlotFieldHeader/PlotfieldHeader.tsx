import { useEffect, useState } from "react";
import command from "../../../../assets/images/Editor/command.png";
import plus from "../../../../assets/images/shared/add.png";
import useCheckKeysCombinationCreateBlankCommand from "../../../../hooks/helpers/useCheckKeysCombinationCreateBlankCommand";
import ButtonHoverPromptModal from "../../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import useCreateBlankCommand from "../PlotFieldMain/Commands/hooks/useCreateBlankCommand";
import { generateMongoObjectId } from "../../../../utils/generateMongoObjectId";

type PlotFieldHeaderTypes = {
  topologyBlockId: string;
  amountOfCommands: number;
  hideFlowchartFromScriptwriter: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  setHideFlowchartFromScriptwriter: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setExpansionDivDirection: React.Dispatch<
    React.SetStateAction<"right" | "left">
  >;
};

export default function PlotfieldHeader({
  topologyBlockId,
  amountOfCommands,
  setShowHeader,
  setHideFlowchartFromScriptwriter,
  setExpansionDivDirection,
  hideFlowchartFromScriptwriter,
}: PlotFieldHeaderTypes) {
  const [currentAmountOfCommands, setCurrentAmountOfCommands] =
    useState(amountOfCommands);

  const createCommand = useCreateBlankCommand({ topologyBlockId });

  const commandCreatedByKeyCombinationBlankCommand =
    useCheckKeysCombinationCreateBlankCommand();

  const handleCreateCommand = () => {
    const _id = generateMongoObjectId();
    createCommand.mutate({
      _id,
      commandOrder: currentAmountOfCommands,
      topologyBlockId,
    });
    setCurrentAmountOfCommands((prev) => prev + 1);
    if (createCommand.isError) {
      setCurrentAmountOfCommands((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (
      commandCreatedByKeyCombinationBlankCommand === "blankPlotFieldCommand"
    ) {
      handleCreateCommand();
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
          className="bg-primary-light-blue shadow-sm shadow-gray-400 active:scale-[.99] relative "
          asideClasses="text-[1.3rem] top-[3.5rem] bottom-[-3.5rem]"
          onClick={handleCreateCommand}
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
      <div className="flex gap-[1rem]">
        <button
          className="text-[1.6rem] px-[1rem] outline-gray-300 rounded-md shadow-md hover:bg-green-300 hover:text-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            setShowHeader(true);
          }}
        >
          Заголовок
        </button>
        <div
          className={`relative w-[2rem] ${
            hideFlowchartFromScriptwriter ? "" : "hidden"
          } `}
        >
          <button
            onClick={() => {
              setHideFlowchartFromScriptwriter(false);
              setExpansionDivDirection("" as "right" | "left");
            }}
            className="w-[2.5rem] h-[1rem] shadow-inner shadow-gray-400 hover:shadow-md transition-shadow rounded-md absolute top-[-1rem] right-[-.5rem]"
          ></button>
        </div>
      </div>
    </header>
  );
}
