import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";

export default function useGetTranslationCharacters({
  storyId,
  language,
}: {
  storyId: string;
  language: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: ["translation", language, "character", "story", storyId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCharacterTypes[]>(
          `/characters/stories/${storyId}/translations?currentLanguage=${language}`
        )
        .then((r) => r.data),
    enabled: !!storyId && !!language,
  });
}
