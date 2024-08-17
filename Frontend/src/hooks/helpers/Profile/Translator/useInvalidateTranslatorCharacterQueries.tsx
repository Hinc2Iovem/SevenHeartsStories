import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  storyId: string;
};

export default function useInvalidateTranslatorCharacterQueries({
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
          "translation",
          prevTranslateFromLanguage,
          "character",
          "story",
          storyId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          translateToLanguage,
          "character",
          "story",
          storyId,
        ],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateToLanguage,
          "character",
          "story",
          storyId,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
