import { useEffect, useState } from "react";
import useGetCharacterById from "../../../../../../../../hooks/Fetching/Character/useGetCharacterById";
import useDebounce from "../../../../../../../../hooks/utilities/useDebounce";
import { EmotionsTypes } from "../../../../../../../../types/StoryData/Character/CharacterTypes";
import { CommandSayVariationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useGetTranslationSayEnabled from "../../../hooks/Say/useGetTranslationSayEnabled";
import useUpdateCommandSayText from "../../../hooks/Say/useUpdateCommandSayText";
import FormCharacter from "./FormCharacter";
import FormEmotion from "./FormEmotion";
import "../../../../../../Flowchart/FlowchartStyles.css";

type CommandSayCharacterFieldItemTypes = {
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  characterEmotionId: string;
  plotFieldCommandSayId: string;
  characterId: string;
  topologyBlockId: string;
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
  topologyBlockId,
}: CommandSayCharacterFieldItemTypes) {
  const { data: currentCharacter } = useGetCharacterById({ characterId });
  const [initialValue, setInitialValue] = useState("");
  const [showCreateCharacterModal, setShowCreateCharacterModal] =
    useState(false);
  const [showCreateEmotionModal, setShowCreateEmotionModal] = useState(false);
  const [emotionValue, setEmotionValue] = useState<EmotionsTypes | null>(null);

  const [textValue, setTextValue] = useState("");

  const debouncedValue = useDebounce({ value: textValue, delay: 500 });

  const { data: translatedSayText } = useGetTranslationSayEnabled({
    commandId: plotFieldCommandId,
  });

  useEffect(() => {
    if (translatedSayText) {
      setTextValue((translatedSayText.translations || [])[0]?.text || "");
      setInitialValue((translatedSayText.translations || [])[0]?.text || "");
    }
  }, [translatedSayText]);

  useEffect(() => {
    if (currentCharacter && !emotionValue?.emotionName.trim().length) {
      setEmotionValue(
        currentCharacter.emotions.find((e) => e._id === characterEmotionId) ||
          null
      );
    }
  }, [currentCharacter, characterId]);

  useEffect(() => {
    if (showCreateCharacterModal) {
      setShowCreateEmotionModal(false);
    } else if (showCreateEmotionModal) {
      setShowCreateCharacterModal(false);
    }
  }, [showCreateEmotionModal, showCreateCharacterModal]);

  const updateCommandSayText = useUpdateCommandSayText({
    commandId: plotFieldCommandId,
    textValue,
    topologyBlockId,
  });

  useEffect(() => {
    if (initialValue !== debouncedValue && debouncedValue?.trim().length) {
      updateCommandSayText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <FormCharacter
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
        emotions={currentCharacter?.emotions || []}
        commandSayType={commandSayType}
        characterId={characterId}
        plotFieldCommandId={plotFieldCommandId}
        plotFieldCommandSayId={plotFieldCommandSayId}
        setShowCreateEmotionModal={setShowCreateEmotionModal}
        showCreateEmotionModal={showCreateEmotionModal}
      />
      <form className="sm:w-[57%] flex-grow w-full">
        <textarea
          value={textValue}
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[25rem] containerScroll"
          placeholder="Such a lovely day"
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
