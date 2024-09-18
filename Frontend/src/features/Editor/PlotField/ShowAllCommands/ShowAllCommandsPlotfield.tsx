import { useState } from "react";
import { AllPossiblePlotFieldCommandsWithSayVariations } from "../../../../const/PLOTFIELD_COMMANDS";
import useEscapeOfModal from "../../../../hooks/UI/useEscapeOfModal";
import CreatingCommandViaButtonClick from "./CreatingCommandViaButtonClick";
import CreatingMultipleCommands from "./CreatingMultipleCommands";
import WaitDefaultSettings from "./Default/Wait/WaitDefaultSettings";
import ChoiceDefaultSettings from "./Default/Choice/ChoiceDefaultSettings";

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
  const [showDefaultSettings, setShowDefaultSettings] = useState({
    wait: false,
    choice: false,
  });
  const [time, setTime] = useState<string | null>(null);

  const [choiceOptionVariants, setChoiceOptionVariants] = useState({
    premium: false,
    characteristic: false,
    relationship: false,
    common: false,
  });

  useEscapeOfModal({
    setValue: setShowAllCommands,
    value: showAllCommands,
  });
  return (
    <div
      className={`${
        showAllCommands ? "" : "hidden"
      } h-full w-full transition-all p-[1rem] overflow-y-auto | containerScroll`}
    >
      <div className="flex flex-col gap-[1rem]">
        {AllPossiblePlotFieldCommandsWithSayVariations.map((pc) => (
          <div
            key={pc}
            className="flex justify-between gap-[1rem] w-full items-center flex-wrap"
          >
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
                setTime={setTime}
                setShowDefaultSettings={setShowDefaultSettings}
                setAllCommandsToCreate={setAllCommandsToCreate}
              />
            </div>
            {/* Default */}
            <WaitDefaultSettings
              showWait={showDefaultSettings.wait && pc === "wait"}
              setTime={setTime}
              time={time}
            />
            <ChoiceDefaultSettings
              showChoice={showDefaultSettings.choice && pc === "choice"}
            />
            {/* Default */}
          </div>
        ))}
      </div>
    </div>
  );
}
