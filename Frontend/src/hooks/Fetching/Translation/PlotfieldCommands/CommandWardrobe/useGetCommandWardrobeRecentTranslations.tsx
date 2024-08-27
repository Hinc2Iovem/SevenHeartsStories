import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../api/axios";
import { TranslationCommandWardrobeTypes } from "../../../../../types/Additional/TranslationTypes";
import { UpdatedAtPossibleVariationTypes } from "../../../../../features/Profile/Translator/Recent/Filters/FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

export default function useGetCommandWardrobeRecentTranslations({
  updatedAt,
  language = "russian",
}: {
  updatedAt: UpdatedAtPossibleVariationTypes;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: [
      "translation",
      language,
      "commandWardrobe",
      "updatedAt",
      updatedAt,
    ],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandWardrobeTypes[]>(
          `/commandWardrobes/recent/translations?currentLanguage=${language}&updatedAt=${updatedAt}`
        )
        .then((r) => r.data),
    enabled: !!language && !!updatedAt,
  });
}
