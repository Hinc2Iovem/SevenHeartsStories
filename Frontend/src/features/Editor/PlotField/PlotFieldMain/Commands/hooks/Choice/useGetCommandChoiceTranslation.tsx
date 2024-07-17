import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TranslationCommandTypes } from "../../../../../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetCommandChoiceTypes = {
  choiceId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

export default function useGetCommandChoiceTranslation({
  choiceId,
  language = "russian",
}: GetCommandChoiceTypes) {
  return useQuery({
    queryKey: ["translation", "command", "choice", choiceId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/choices/${choiceId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
  });
}
