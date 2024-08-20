import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export default function useInvalidateTranslatorStoryQueries({
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
}: InvalidateTranslatorQueriesTypes) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: ["translation", prevTranslateFromLanguage, "story"],
      });
      queryClient.invalidateQueries({
        queryKey: ["translation", translateToLanguage, "story"],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: ["translation", prevTranslateToLanguage, "story"],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
