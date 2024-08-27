import { useEffect, useState } from "react";
import useGetTranslationCharacterById from "../../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharacterById";
import { CommandSayVariationTypes } from "../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useGetCommandSay from "../hooks/Say/useGetCommandSay";
import CommandSayCharacterFieldItem from "./CommandSayFieldItem/Character/CommandSayCharacterFieldItem";
import CommandSayFieldItem from "./CommandSayFieldItem/Other/CommandSayFieldItem";

type CommandSayFieldTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export default function CommandSayField({
  plotFieldCommandId,
  topologyBlockId,
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

  const { data: translatedCharacter } = useGetTranslationCharacterById({
    characterId: commandSay?.characterId ?? "",
    language: "russian",
  });

  useEffect(() => {
    if (commandSayType === "character") {
      if (translatedCharacter) {
        setNameValue(
          translatedCharacter.translations?.find(
            (tc) => tc.textFieldName === "characterName"
          )?.text || ""
        );
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
          topologyBlockId={topologyBlockId}
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      ) : commandSayType === "character" ? (
        <CommandSayCharacterFieldItem
          topologyBlockId={topologyBlockId}
          characterId={commandSay?.characterId || ""}
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          characterEmotionId={commandSay?.characterEmotionId || ""}
          commandSayType={commandSayType}
          nameValue={nameValue}
          setNameValue={setNameValue}
        />
      ) : commandSayType === "notify" ? (
        <CommandSayFieldItem
          topologyBlockId={topologyBlockId}
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      ) : (
        <CommandSayFieldItem
          topologyBlockId={topologyBlockId}
          plotFieldCommandId={plotFieldCommandId}
          plotFieldCommandSayId={commandSayId}
          nameValue={nameValue}
        />
      )}
    </>
  );
}
