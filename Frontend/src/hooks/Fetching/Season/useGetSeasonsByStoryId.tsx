import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../types/Additional/TranslationTypes";

type GetSeasonsByStoryIdTypes = {
  storyId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

export default function useGetSeasonsByStoryId({
  storyId,
  language,
}: GetSeasonsByStoryIdTypes) {
  return useQuery({
    queryKey: ["stories", storyId, "season", "language", language],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationSeasonTypes[]>(
          `/seasons/stories/${storyId}/translations?currentLanguage=${language}`
        )
        .then((r) => r.data),
    enabled: !!storyId && !!language,
  });
}
