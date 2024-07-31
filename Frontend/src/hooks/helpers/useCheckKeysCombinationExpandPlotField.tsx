import { useEffect, useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

export default function useCheckKeysCombinationExpandPlotField() {
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const [keys, setKeys] = useState({
    v: false,
    alt: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setKeys((prevKeys) => ({ ...prevKeys, alt: true }));
      }
      if (event.key.toLowerCase() === "v") {
        if (command === "expandPlotField") {
          setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
          return;
        } else {
          setKeys((prevKeys) => ({ ...prevKeys, v: true }));
        }
      }

      if (event.key.toLowerCase() === "v" && event.altKey) {
        setCommand("expandPlotField");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setKeys((prevKeys) => ({ ...prevKeys, alt: false }));
      }
      if (event.key.toLowerCase() === "v") {
        setKeys((prevKeys) => ({ ...prevKeys, v: false }));
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
