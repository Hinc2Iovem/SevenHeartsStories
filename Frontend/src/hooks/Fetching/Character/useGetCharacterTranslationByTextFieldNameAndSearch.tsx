import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import {
  AllTranslationTextFieldNamesTypes,
  TranslationCharacterTypes,
} from "../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type DebouncedTranslationsTypes = {
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  textFieldName: AllTranslationTextFieldNamesTypes;
};

const getDebouncedCharacters = async ({
  language = "russian",
  text,
  textFieldName,
}: DebouncedTranslationsTypes): Promise<TranslationCharacterTypes[]> => {
  return await axiosCustomized
    .get(
      `/translations/textFieldNames/search?currentLanguage=${language}&textFieldName=${textFieldName}&text=${text}`
    )
    .then((r) => r.data);
};

export default function useGetCharacterTranslationByTextFieldNameAndSearch({
  debouncedValue,
  language,
}: {
  debouncedValue: string;
  language: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: [
      "translation",
      "textFieldName",
      "search",
      "characters",
      debouncedValue,
    ],
    queryFn: () =>
      getDebouncedCharacters({
        text: debouncedValue,
        textFieldName: "characterName",
        language,
      }),
    enabled: !!language,
  });
}
