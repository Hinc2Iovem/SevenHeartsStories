import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { TranslationStoryTypes } from "../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type DebouncedTranslationsTypes = {
  language?: CurrentlyAvailableLanguagesTypes;
  text: string;
  textFieldName: string;
};

const getDebouncedStories = async ({
  language = "russian",
  text,
  textFieldName,
}: DebouncedTranslationsTypes): Promise<TranslationStoryTypes[]> => {
  return await axiosCustomized
    .get(
      `/translations/textFieldNames?currentLanguage=${language}&textFieldName=${textFieldName}&text=${text}`
    )
    .then((r) => r.data);
};

export default function useGetTranslationByTextFieldName({
  debouncedValue,
}: {
  debouncedValue: string;
}) {
  return useQuery({
    queryKey: ["translation", "textFieldName", "stories", debouncedValue],
    queryFn: () =>
      getDebouncedStories({ text: debouncedValue, textFieldName: "storyName" }),
    enabled: debouncedValue?.trim().length > 0,
  });
}
