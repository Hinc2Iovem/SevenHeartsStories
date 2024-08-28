import { useEffect } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

type CheckKeysCombinationExpandTypes = {
  setCommand: React.Dispatch<
    React.SetStateAction<PossibleCommandsCreatedByCombinationOfKeysTypes>
  >;
  command: PossibleCommandsCreatedByCombinationOfKeysTypes;
};

export default function useCheckKeysCombinationExpandFlowchart({
  command,
  setCommand,
}: CheckKeysCombinationExpandTypes) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "c") {
        if (command === "expandFlowchart") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
        } else {
          setCommand("expandFlowchart");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [command]);

  return command;
}
