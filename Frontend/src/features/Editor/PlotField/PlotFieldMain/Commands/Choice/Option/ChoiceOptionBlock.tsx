import { useEffect, useState } from "react";
import { ChoiceOptionTypes } from "../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useGetCommandChoiceOptionTranslation from "../../hooks/Choice/ChoiceOption/useGetChoiceOptionTranslation";
import useDebounce from "../../../../../../../hooks/utilities/useDebounce";
import useUpdateChoiceOptionTranslationText from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionTranslationText";
import OptionSelectTopologyBlock from "./OptionSelectTopologyBlock";
import OptionSelectSexualOrientationBlock from "./OptionSelectSexualOrientationBlock";
import OptionPremiumBlock from "./OptionVariations/OptionPremiumBlock";
import OptionCharacteristicBlock from "./OptionVariations/OptionCharacteristicBlock";
import OptionRelationshipBlock from "./OptionVariations/OptionRelationshipBlock";

export default function ChoiceOptionBlock({
  _id,
  sexualOrientationType,
  topologyBlockId,
  type,
}: ChoiceOptionTypes) {
  const [optionText, setOptionText] = useState("");

  const { data: choiceOptionTextTranslation } =
    useGetCommandChoiceOptionTranslation({ choiceOptionId: _id });

  useEffect(() => {
    if (choiceOptionTextTranslation) {
      choiceOptionTextTranslation.map((ot) => {
        if (ot.textFieldName === "choiceOption") {
          setOptionText(ot.text);
        }
      });
    }
  }, [choiceOptionTextTranslation]);

  const debouncedValue = useDebounce({ value: optionText, delay: 700 });

  const updateOptionTextTranslation = useUpdateChoiceOptionTranslationText({
    choiceOptionId: _id,
    option: debouncedValue,
  });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      updateOptionTextTranslation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="w-full bg-white min-h-[10rem] h-full rounded-md shadow-md">
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
            <OptionPremiumBlock choiceOptionId={_id} />
          ) : type === "characteristic" ? (
            <OptionCharacteristicBlock choiceOptionId={_id} />
          ) : type === "relationship" ? (
            <OptionRelationshipBlock choiceOptionId={_id} />
          ) : null}
          <div className="flex justify-between items-center w-full flex-wrap">
            <OptionSelectSexualOrientationBlock
              choiceOptionId={_id}
              sexualOrientation={sexualOrientationType}
            />
            <OptionSelectTopologyBlock
              choiceOptionId={_id}
              topologyBlockId={topologyBlockId}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
