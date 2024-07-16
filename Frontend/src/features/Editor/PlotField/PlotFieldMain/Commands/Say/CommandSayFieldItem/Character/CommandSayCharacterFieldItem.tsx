import { useEffect, useState } from "react";
import useDebounce from "../../../../../../../../hooks/utilities/useDebounce";
import { CommandSayVariationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useGetTranslationSayEnabled from "../../../hooks/Say/useGetTranslationSayEnabled";
import useUpdateCommandSayText from "../../../hooks/Say/useUpdateCommandSayText";
import FormCharacter from "./FormCharacter";
import FormEmotion from "./FormEmotion";

type CommandSayCharacterFieldItemTypes = {
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  characterEmotionId: string;
  plotFieldCommandSayId: string;
  characterId: string;
  plotFieldCommandId: string;
  commandSayType: CommandSayVariationTypes;
};

export default function CommandSayCharacterFieldItem({
  nameValue,
  setNameValue,
  characterEmotionId,
  commandSayType,
  plotFieldCommandSayId,
  characterId,
  plotFieldCommandId,
}: CommandSayCharacterFieldItemTypes) {
  const [showCreateCharacterModal, setShowCreateCharacterModal] =
    useState(false);
  const [showCreateEmotionModal, setShowCreateEmotionModal] = useState(false);
  const [emotionValue, setEmotionValue] = useState("");

  const [textValue, setTextValue] = useState("");

  const debouncedValue = useDebounce({ value: textValue, delay: 500 });

  const { data: translatedSayText } = useGetTranslationSayEnabled({
    characterId,
    commandSayId: plotFieldCommandSayId,
  });

  useEffect(() => {
    if (translatedSayText) {
      translatedSayText.forEach((tc) => {
        if (tc.textFieldName === "sayText") {
          setTextValue(tc.text ?? "");
        }
      });
    }
  }, [translatedSayText]);

  useEffect(() => {
    if (showCreateCharacterModal) {
      setShowCreateEmotionModal(false);
    } else if (showCreateEmotionModal) {
      setShowCreateCharacterModal(false);
    }
  }, [showCreateEmotionModal, showCreateCharacterModal]);

  const updateCommandSayText = useUpdateCommandSayText({
    commandSayId: plotFieldCommandSayId,
    textValue,
  });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      updateCommandSayText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <FormCharacter
        characterEmotionId={characterEmotionId}
        nameValue={nameValue}
        setNameValue={setNameValue}
        setEmotionValue={setEmotionValue}
        plotFieldCommandId={plotFieldCommandId}
        plotFieldCommandSayId={plotFieldCommandSayId}
        setShowCreateCharacterModal={setShowCreateCharacterModal}
        showCreateCharacterModal={showCreateCharacterModal}
      />
      <FormEmotion
        setEmotionValue={setEmotionValue}
        emotionValue={emotionValue}
        commandSayType={commandSayType}
        characterEmotionId={characterEmotionId}
        characterId={characterId}
        plotFieldCommandId={plotFieldCommandId}
        plotFieldCommandSayId={plotFieldCommandSayId}
        setShowCreateEmotionModal={setShowCreateEmotionModal}
        showCreateEmotionModal={showCreateEmotionModal}
      />
      <form className="sm:w-[57%] flex-grow w-full">
        <textarea
          value={textValue}
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Such a lovely day"
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
