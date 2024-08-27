import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  seasonId: string;
};

export default function useInvalidateTranslatorEpisodeQueries({
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  seasonId,
}: InvalidateTranslatorQueriesTypes) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateFromLanguage,
          "season",
          seasonId,
          "episode",
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          translateToLanguage,
          "season",
          seasonId,
          "episode",
        ],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateToLanguage,
          "season",
          seasonId,
          "episode",
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
