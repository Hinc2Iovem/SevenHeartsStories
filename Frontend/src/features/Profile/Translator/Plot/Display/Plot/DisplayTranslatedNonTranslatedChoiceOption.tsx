import { useEffect, useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { ChoiceOptionTypes } from "../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useGetTranslationChoiceOption from "../../../../../../hooks/Fetching/Translation/PlotfieldCommands/useGetTranslationChoiceOption";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import useUpdateChoiceOptionTranslationText from "../../../../../Editor/PlotField/PlotFieldMain/Commands/hooks/Choice/ChoiceOption/useUpdateChoiceOptionTranslationText";

type DisplayTranslatedNonTranslatedChoiceOptionTypes = {
  language: CurrentlyAvailableLanguagesTypes;
} & ChoiceOptionTypes;
export default function DisplayTranslatedNonTranslatedChoiceOption({
  _id,
  language,
}: DisplayTranslatedNonTranslatedChoiceOptionTypes) {
  const [optionText, setOptionText] = useState("");
  const { data: option } = useGetTranslationChoiceOption({
    optionId: _id,
    language,
  });

  useEffect(() => {
    if (option) {
      setOptionText(option.text);
    } else {
      setOptionText("");
    }
  }, [option]);

  const debouncedOption = useDebounce({ value: optionText, delay: 500 });

  const updateChoiceOption = useUpdateChoiceOptionTranslationText({
    choiceOptionId: _id,
    option: debouncedOption,
    language,
  });

  useEffect(() => {
    if (debouncedOption?.trim().length) {
      updateChoiceOption.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOption]);

  return (
    <input
      type="text"
      value={optionText}
      onChange={(e) => setOptionText(e.target.value)}
      className="w-1/2 flex-grow border-dotted border-gray-600 border-[2px] text-[1.4rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
    />
  );
}
