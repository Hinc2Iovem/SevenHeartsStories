import { useEffect, useState } from "react";
import useDebounce from "../../../../../../../hooks/utilities/useDebounce";
import { TranslationChoiceOptionTypes } from "../../../../../../../types/Additional/TranslationTypes";
import useUpdateChoiceOptionTranslationText from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionTranslationText";
import OptionSelectSexualOrientationBlock from "./OptionSelectSexualOrientationBlock";
import OptionSelectTopologyBlock from "./OptionSelectTopologyBlock";
import OptionCharacteristicBlock from "./OptionVariations/OptionCharacteristicBlock";
import OptionPremiumBlock from "./OptionVariations/OptionPremiumBlock";
import OptionRelationshipBlock from "./OptionVariations/OptionRelationshipBlock";
import useGetChoiceOptionById from "../../hooks/Choice/ChoiceOption/useGetChoiceOptionById";

type ChoiceOptionBlockTypes = {
  currentTopologyBlockId: string;
  plotFieldCommandId: string;
} & TranslationChoiceOptionTypes;

export default function ChoiceOptionBlock({
  type,
  choiceOptionId,
  translations,
  plotFieldCommandId,
  currentTopologyBlockId,
}: ChoiceOptionBlockTypes) {
  const [showAllSexualOrientationBlocks, setShowAllSexualOrientationBlocks] =
    useState(false);
  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);

  const { data: choiceOption } = useGetChoiceOptionById({ choiceOptionId });
  const [topologyBlockId, setTopologyBlockId] = useState("");
  const [sexualOrientationType, setSexualOrientationType] = useState("");

  useEffect(() => {
    if (choiceOption) {
      setTopologyBlockId(choiceOption?.topologyBlockId || "");
      setSexualOrientationType(choiceOption?.sexualOrientationType || "");
    }
  }, [choiceOption]);

  const [optionText, setOptionText] = useState("");

  useEffect(() => {
    if (translations) {
      translations.map((ot) => {
        if (ot.textFieldName === "choiceOption") {
          setOptionText(ot.text);
        }
      });
    }
  }, [translations]);

  const debouncedValue = useDebounce({ value: optionText, delay: 700 });

  const updateOptionTextTranslation = useUpdateChoiceOptionTranslationText({
    choiceOptionId,
    option: debouncedValue,
    type,
    choiceId: plotFieldCommandId,
    language: "russian",
  });

  useEffect(() => {
    if (
      (translations[0]?.text || "") !== debouncedValue &&
      debouncedValue?.trim().length
    ) {
      updateOptionTextTranslation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div
      className={`w-full bg-white min-h-[10rem] h-full rounded-md shadow-md`}
    >
      <form
        className="w-full flex justify-between flex-col h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          placeholder="Ответ"
          className="w-full text-[1.4rem] text-gray-700 rounded-md outline-gray-300 shadow-md bg-white px-[1rem]"
        />

        <div className="p-[.2rem] flex flex-col gap-[1rem]">
          {type === "premium" ? (
            <OptionPremiumBlock choiceOptionId={choiceOptionId} />
          ) : type === "characteristic" ? (
            <OptionCharacteristicBlock choiceOptionId={choiceOptionId} />
          ) : type === "relationship" ? (
            <OptionRelationshipBlock choiceOptionId={choiceOptionId} />
          ) : null}
          <div className="flex justify-between items-center w-full flex-wrap">
            <div
              className={`${
                showAllSexualOrientationBlocks ? "" : "overflow-hidden"
              } w-1/2`}
            >
              <OptionSelectSexualOrientationBlock
                setShowAllSexualOrientationBlocks={
                  setShowAllSexualOrientationBlocks
                }
                showAllSexualOrientationBlocks={showAllSexualOrientationBlocks}
                choiceOptionId={choiceOptionId}
                sexualOrientation={sexualOrientationType}
              />
            </div>
            <div
              className={`${
                showAllTopologyBlocks ? "" : "overflow-hidden"
              } w-1/2 flex`}
            >
              <OptionSelectTopologyBlock
                setTopologyBlockId={setTopologyBlockId}
                setShowAllTopologyBlocks={setShowAllTopologyBlocks}
                showAllTopologyBlocks={showAllTopologyBlocks}
                choiceOptionId={choiceOptionId}
                currentTopologyBlockId={currentTopologyBlockId}
                topologyBlockId={topologyBlockId}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
