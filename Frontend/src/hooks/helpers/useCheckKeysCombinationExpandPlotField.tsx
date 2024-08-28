import { useEffect } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

type CheckKeysCombinationExpandTypes = {
  setCommand: React.Dispatch<
    React.SetStateAction<PossibleCommandsCreatedByCombinationOfKeysTypes>
  >;
  command: PossibleCommandsCreatedByCombinationOfKeysTypes;
};

export default function useCheckKeysCombinationExpandPlotField({
  setCommand,
  command,
}: CheckKeysCombinationExpandTypes) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "v" && event.altKey) {
        if (command === "expandPlotField") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
        } else {
          setCommand("expandPlotField");
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
