import { useEffect, useState } from "react";
import { ChoiceOptionTypes } from "../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useGetCommandChoiceOptionTranslation from "../../hooks/Choice/ChoiceOption/useGetChoiceOptionTranslation";
import useDebounce from "../../../../../../../hooks/utilities/useDebounce";
import useUpdateChoiceOptionTranslationText from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionTranslationText";

export default function ChoiceOptionBlock({
  _id,
  plotFieldCommandChoiceId,
  sexualOrientationType,
  topologyBlock,
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
    <div className="w-full bg-white h-[10rem] rounded-md shadow-md">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          placeholder="Ответ"
          className="w-full text-[1.4rem] text-gray-700 rounded-md outline-gray-300 shadow-md bg-white"
        />
      </form>
    </div>
  );
}
