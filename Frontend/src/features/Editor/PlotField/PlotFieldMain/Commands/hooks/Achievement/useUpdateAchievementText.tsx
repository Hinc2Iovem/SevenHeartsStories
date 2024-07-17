import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateAchievementTextTypes = {
  achievementId: string;
  achievementName: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useUpdateAchievementText({
  achievementId,
  achievementName,
  language = "russian",
}: UpdateAchievementTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/translations/plotFieldCommands/achievements/${achievementId}`,
        {
          currentLanguage: language,
          achievementName,
        }
      ),
  });
}
