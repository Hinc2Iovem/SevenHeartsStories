import { useEffect, useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

export default function useCheckKeysCombinationExpandFlowchart() {
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const [keys, setKeys] = useState({
    shift: false,
    c: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        setKeys((prevKeys) => ({ ...prevKeys, shift: true }));
      }
      if (event.key.toLowerCase() === "c") {
        if (command === "expandFlowchart") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
          return;
        } else {
          setKeys((prevKeys) => ({ ...prevKeys, c: true }));
        }
      }

      if (event.shiftKey && event.key.toLowerCase() === "c") {
        setCommand("expandFlowchart");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        setKeys((prevKeys) => ({ ...prevKeys, shift: false }));
      }
      if (event.key.toLowerCase() === "c") {
        setKeys((prevKeys) => ({ ...prevKeys, c: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [command]);

  return command;
}
