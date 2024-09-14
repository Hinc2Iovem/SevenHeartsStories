import { useState } from "react";
import { AllPossiblePlotFieldCommandsWithSayVariations } from "../../../../const/PLOTFIELD_COMMANDS";
import useEscapeOfModal from "../../../../hooks/UI/useEscapeOfModal";
import CreatingCommandViaButtonClick from "./CreatingCommandViaButtonClick";
import CreatingMultipleCommands from "./CreatingMultipleCommands";

type ShowAllCommandsPlotfieldTypes = {
  showAllCommands: boolean;
  amountOfCommands: number;
  topologyBlockId: string;
  setShowAllCommands: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowAllCommandsPlotfield({
  setShowAllCommands,
  showAllCommands,
  amountOfCommands,
  topologyBlockId,
}: ShowAllCommandsPlotfieldTypes) {
  const [currentAmountOfCommands, setCurrentAmountOfCommands] =
    useState(amountOfCommands);
  const [allCommandsToCreate, setAllCommandsToCreate] = useState<string[]>([]);
  useEscapeOfModal({
    setValue: setShowAllCommands,
    value: showAllCommands,
  });

  console.log("allCommandsToCreate: ", allCommandsToCreate);

  return (
    <div
      className={`${
        showAllCommands ? "" : "hidden"
      } h-full w-full transition-all p-[1rem] overflow-y-auto | containerScroll`}
    >
      <div className="flex flex-col gap-[1rem]">
        {AllPossiblePlotFieldCommandsWithSayVariations.map((pc) => (
          <div key={pc} className="flex justify-between gap-[1rem] w-full">
            <div className="flex gap-[.5rem] items-center shadow-md px-[1rem] py-[.5rem] rounded-md">
              {/* TODO here will be an image which represents each command */}
              <CreatingCommandViaButtonClick
                pc={pc}
                topologyBlockId={topologyBlockId}
                currentAmountOfCommands={currentAmountOfCommands}
                setCurrentAmountOfCommands={setCurrentAmountOfCommands}
                setShowAllCommands={setShowAllCommands}
              />
              <CreatingMultipleCommands
                pc={pc}
                setAllCommandsToCreate={setAllCommandsToCreate}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
