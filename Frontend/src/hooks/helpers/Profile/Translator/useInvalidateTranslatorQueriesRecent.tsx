import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type PossibleQueryKeys =
  | "appearancePart"
  | "character"
  | "episode"
  | "season"
  | "story"
  | "achievement"
  | "choice"
  | "characteristic"
  | "getItem"
  | "say"
  | "commandWardrobe";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  queryKey: PossibleQueryKeys;
  updatedAt: string;
};

export default function useInvalidateTranslatorQueriesRecent({
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  queryKey,
  updatedAt,
}: InvalidateTranslatorQueriesTypes) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateFromLanguage,
          queryKey,
          "updatedAt",
          updatedAt,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          translateToLanguage,
          queryKey,
          "updatedAt",
          updatedAt,
        ],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateToLanguage,
          queryKey,
          "updatedAt",
          updatedAt,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
