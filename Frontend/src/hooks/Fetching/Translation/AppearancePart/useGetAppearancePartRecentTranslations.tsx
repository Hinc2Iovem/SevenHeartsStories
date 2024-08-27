import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { UpdatedAtPossibleVariationTypes } from "../../../../features/Profile/Translator/Recent/Filters/FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationAppearancePartTypes } from "../../../../types/Additional/TranslationTypes";

export default function useGetAppearancePartRecentTranslations({
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
      "appearancePart",
      "updatedAt",
      updatedAt,
    ],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationAppearancePartTypes[]>(
          `/appearanceParts/recent/translations?currentLanguage=${language}&updatedAt=${updatedAt}`
        )
        .then((r) => r.data),
    enabled: !!language && !!updatedAt,
  });
}
