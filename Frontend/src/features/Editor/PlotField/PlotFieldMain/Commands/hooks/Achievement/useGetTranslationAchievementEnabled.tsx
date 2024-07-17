import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TranslationCommandTypes } from "../../../../../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetTranslationAchievementEnabledTypes = {
  achievementId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useGetTranslationAchievementEnabled({
  achievementId,
  language = "russian",
}: GetTranslationAchievementEnabledTypes) {
  return useQuery({
    queryKey: ["translation", "command", "achievement", achievementId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/achievements/${achievementId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
    enabled: !!achievementId,
  });
}
