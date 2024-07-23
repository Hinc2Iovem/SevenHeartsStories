import { useEffect, useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

export default function useCheckKeysCombinationExpandPlotField() {
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const [keys, setKeys] = useState({
    ctrl: false,
    alt: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setKeys((prevKeys) => ({ ...prevKeys, ctrl: true }));
      }
      if (event.key.toLowerCase() === "alt") {
        if (command === "expandPlotField") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
          return;
        } else {
          setKeys((prevKeys) => ({ ...prevKeys, alt: true }));
        }
      }

      if (event.ctrlKey && event.key.toLowerCase() === "alt") {
        setCommand("expandPlotField");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setKeys((prevKeys) => ({ ...prevKeys, ctrl: false }));
      }
      if (event.key.toLowerCase() === "alt") {
        setKeys((prevKeys) => ({ ...prevKeys, alt: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return command;
}
