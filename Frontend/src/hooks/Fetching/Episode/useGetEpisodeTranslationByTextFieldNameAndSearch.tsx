import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import {
  AllTranslationTextFieldNamesTypes,
  TranslationEpisodeTypes,
} from "../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type DebouncedTranslationsTypes = {
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  textFieldName: AllTranslationTextFieldNamesTypes;
};

const getDebouncedEpisodes = async ({
  language = "russian",
  text,
  textFieldName,
}: DebouncedTranslationsTypes): Promise<TranslationEpisodeTypes[]> => {
  return await axiosCustomized
    .get(
      `/translations/textFieldNames/search?currentLanguage=${language}&textFieldName=${textFieldName}&text=${text}`
    )
    .then((r) => r.data);
};

export default function useGetEpisodeTranslationByTextFieldNameAndSearch({
  debouncedValue,
  language,
  seasonId,
}: {
  debouncedValue: string;
  seasonId: string;
  language: CurrentlyAvailableLanguagesTypes;
}) {
  return useQuery({
    queryKey: [
      "translation",
      "textFieldName",
      "search",
      "episodes",
      debouncedValue,
    ],
    queryFn: () =>
      getDebouncedEpisodes({
        text: debouncedValue,
        textFieldName: "episodeName",
        language,
      }),
    enabled: !!language && !!seasonId,
  });
}
