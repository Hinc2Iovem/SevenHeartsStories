import { useEffect, useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

export default function useCheckKeysCombinationExpandFlowchart() {
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const [keys, setKeys] = useState({
    alt: false,
    c: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setKeys((prevKeys) => ({ ...prevKeys, alt: true }));
      }
      if (event.key.toLowerCase() === "c") {
        if (command === "expandFlowchart") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
          return;
        } else {
          setKeys((prevKeys) => ({ ...prevKeys, c: true }));
        }
      }

      if (event.altKey && event.key.toLowerCase() === "c") {
        setCommand("expandFlowchart");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setKeys((prevKeys) => ({ ...prevKeys, alt: false }));
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
