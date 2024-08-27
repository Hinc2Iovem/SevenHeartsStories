import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { UpdatedAtPossibleVariationTypes } from "../../../../features/Profile/Translator/Recent/Filters/FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";

export default function useGetCharacterRecentTranslations({
  updatedAt,
  language = "russian",
}: {
  updatedAt: UpdatedAtPossibleVariationTypes;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: ["translation", language, "character", "updatedAt", updatedAt],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCharacterTypes[]>(
          `/characters/recent/translations?currentLanguage=${language}&updatedAt=${updatedAt}`
        )
        .then((r) => r.data),
    enabled: !!language && !!updatedAt,
  });
}
