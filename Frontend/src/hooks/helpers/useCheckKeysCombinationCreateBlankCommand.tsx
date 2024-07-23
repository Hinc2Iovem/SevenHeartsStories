import { useEffect, useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";

export default function useCheckKeysCombinationCreateBlankCommand() {
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const [keys, setKeys] = useState({
    ctrl: false,
    m: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setKeys((prevKeys) => ({ ...prevKeys, ctrl: true }));
      }
      if (event.key.toLowerCase() === "m") {
        setKeys((prevKeys) => ({ ...prevKeys, m: true }));
      }

      if (event.ctrlKey && event.key.toLowerCase() === "m") {
        setCommand("blankPlotFieldCommand");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setKeys((prevKeys) => ({ ...prevKeys, ctrl: false }));
      }
      if (event.key.toLowerCase() === "m") {
        setKeys((prevKeys) => ({ ...prevKeys, m: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      setCommand("" as PossibleCommandsCreatedByCombinationOfKeysTypes);
    };
  });

  return command;
}
