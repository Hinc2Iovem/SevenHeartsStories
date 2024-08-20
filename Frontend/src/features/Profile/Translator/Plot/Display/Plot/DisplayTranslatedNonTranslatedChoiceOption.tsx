import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationChoiceOptionTypes } from "../../../../../../types/Additional/TranslationTypes";
import useUpdateChoiceOptionTranslationText from "../../../../../Editor/PlotField/PlotFieldMain/Commands/hooks/Choice/ChoiceOption/useUpdateChoiceOptionTranslationText";
import { ChoiceOptionVariationsTypes } from "../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";

type DisplayTranslatedNonTranslatedChoiceOptionTypes = {
  currentLanguage: CurrentlyAvailableLanguagesTypes;
  currentType?: ChoiceOptionVariationsTypes;
  currentChoiceId?: string;
} & TranslationChoiceOptionTypes;
export default function DisplayTranslatedNonTranslatedChoiceOption({
  currentLanguage,
  translations,
  choiceOptionId,
  plotFieldCommandChoiceId,
  type,
  currentType,
  currentChoiceId,
}: DisplayTranslatedNonTranslatedChoiceOptionTypes) {
  const [initialOptionText] = useState(translations[0]?.text || "");
  const [optionText, setOptionText] = useState(translations[0]?.text || "");

  const debouncedOption = useDebounce({ value: optionText, delay: 500 });

  const updateChoiceOption = useUpdateChoiceOptionTranslationText({
    choiceOptionId,
    option: debouncedOption,
    language: currentLanguage,
    type: type || currentType,
    choiceId: plotFieldCommandChoiceId || currentChoiceId,
  });

  useEffect(() => {
    if (
      initialOptionText !== debouncedOption &&
      debouncedOption?.trim().length
    ) {
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
