import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  storyId: string;
};

export default function useInvalidateTranslatorSeasonQueries({
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  storyId,
}: InvalidateTranslatorQueriesTypes) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "stories",
          storyId,
          "season",
          "language",
          prevTranslateFromLanguage,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "stories",
          storyId,
          "season",
          "language",
          translateToLanguage,
        ],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "stories",
          storyId,
          "season",
          "language",
          prevTranslateToLanguage,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
