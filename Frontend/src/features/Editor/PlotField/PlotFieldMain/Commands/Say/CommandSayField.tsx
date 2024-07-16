import { useEffect, useState } from "react";
import { CommandSayVariationTypes } from "../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useGetTranslationCharacterEnabled from "../hooks/Character/useGetTranslationCharacterEnabled";
import useGetCommandSay from "../hooks/Say/useGetCommandSay";
import CommandSayCharacterFieldItem from "./CommandSayFieldItem/Character/CommandSayCharacterFieldItem";
import CommandSayFieldItem from "./CommandSayFieldItem/Other/CommandSayFieldItem";

type CommandSayFieldTypes = {
  plotFieldCommandId: string;
};

export default function CommandSayField({
  plotFieldCommandId,
}: CommandSayFieldTypes) {
  const { data: commandSay } = useGetCommandSay({ plotFieldCommandId });
  const [commandSayType, setCommandSayType] =
    useState<CommandSayVariationTypes>("" as CommandSayVariationTypes);
  const [commandSayId, setCommandSayId] = useState("");
  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    if (commandSay) {
      setCommandSayType(commandSay.type);
      setCommandSayId(commandSay._id);
    }
  }, [commandSay]);

  const { data: translatedCharacter } = useGetTranslationCharacterEnabled({
    characterId: commandSay?.characterId ?? "",
    commandSayType,
  });

  useEffect(() => {
    if (commandSayType === "character") {
      if (translatedCharacter) {
        translatedCharacter.forEach((tc) => {
          if (tc.textFieldName === "characterName") {
            setNameValue(tc.text);
          }
        });
      }
    } else if (commandSayType === "author") {
      setNameValue("author");
    } else if (commandSayType === "notify") {
      setNameValue("notify");
    } else if (commandSayType === "hint") {
      setNameValue("hint");
    }
  }, [translatedCharacter, commandSayType]);

  return (
    <>
      {commandSayType === "author" ? (
        <CommandSayFieldItem
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      ) : commandSayType === "character" ? (
        <CommandSayCharacterFieldItem
          characterId={commandSay?.characterId ?? ""}
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          characterEmotionId={commandSay?.characterEmotionId ?? ""}
          commandSayType={commandSayType}
          nameValue={nameValue}
          setNameValue={setNameValue}
        />
      ) : commandSayType === "notify" ? (
        <CommandSayFieldItem
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      ) : (
        <CommandSayFieldItem
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      )}
    </>
  );
}
