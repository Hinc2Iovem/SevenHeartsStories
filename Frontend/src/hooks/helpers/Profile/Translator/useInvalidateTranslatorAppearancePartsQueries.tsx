import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";

type InvalidateTranslatorQueriesTypes = {
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  characterId: string;
  type: TranslationTextFieldNameAppearancePartsTypes;
};

export default function useInvalidateTranslatorAppearancePartsQueries({
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  characterId,
  type,
}: InvalidateTranslatorQueriesTypes) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateFromLanguage,
          "character",
          characterId,
          "appearancePart",
          "type",
          type,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          translateToLanguage,
          "character",
          characterId,
          "appearancePart",
          "type",
          type,
        ],
      });
    }
    if (prevTranslateToLanguage || prevTranslateFromLanguage) {
      queryClient.invalidateQueries({
        queryKey: [
          "translation",
          prevTranslateToLanguage,
          "character",
          characterId,
          "appearancePart",
          "type",
          type,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevTranslateToLanguage, prevTranslateFromLanguage]);
  return null;
}
