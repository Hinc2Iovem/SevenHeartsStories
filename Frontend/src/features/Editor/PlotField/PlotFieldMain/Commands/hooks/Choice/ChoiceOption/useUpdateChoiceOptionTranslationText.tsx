import { useMutation } from "@tanstack/react-query";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { axiosCustomized } from "../../../../../../../../api/axios";

type UpdateChoiceOptionTextTypes = {
  choiceOptionId: string;
  option: string;
  language: CurrentlyAvailableLanguagesTypes;
};

export default function useUpdateChoiceOptionTranslationText({
  choiceOptionId,
  option,
  language = "russian",
}: UpdateChoiceOptionTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/translations/plotFieldCommands/choices/options/${choiceOptionId}`,
        {
          currentLanguage: language,
          option,
        }
      ),
  });
}
