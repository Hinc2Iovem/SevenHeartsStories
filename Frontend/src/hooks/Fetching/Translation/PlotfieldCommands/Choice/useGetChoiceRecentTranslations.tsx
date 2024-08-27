import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../api/axios";
import { TranslationChoiceTypes } from "../../../../../types/Additional/TranslationTypes";
import { UpdatedAtPossibleVariationTypes } from "../../../../../features/Profile/Translator/Recent/Filters/FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

export default function useGetChoiceRecentTranslations({
  updatedAt,
  language = "russian",
}: {
  updatedAt: UpdatedAtPossibleVariationTypes;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: ["translation", language, "choice", "updatedAt", updatedAt],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationChoiceTypes[]>(
          `/choices/recent/translations?currentLanguage=${language}&updatedAt=${updatedAt}`
        )
        .then((r) => r.data),
    enabled: !!language && !!updatedAt,
  });
}
