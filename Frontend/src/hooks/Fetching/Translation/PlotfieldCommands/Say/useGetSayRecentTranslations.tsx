import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../api/axios";
import { TranslationSayTypes } from "../../../../../types/Additional/TranslationTypes";
import { UpdatedAtPossibleVariationTypes } from "../../../../../features/Profile/Translator/Recent/Filters/FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

export default function useGetSayRecentTranslations({
  updatedAt,
  language = "russian",
}: {
  updatedAt: UpdatedAtPossibleVariationTypes;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: ["translation", language, "say", "updatedAt", updatedAt],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationSayTypes[]>(
          `/says/recent/translations?currentLanguage=${language}&updatedAt=${updatedAt}`
        )
        .then((r) => r.data),
    enabled: !!language && !!updatedAt,
  });
}
