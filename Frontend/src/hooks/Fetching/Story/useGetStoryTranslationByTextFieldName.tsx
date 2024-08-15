import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { TranslationStoryTypes } from "../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { StoryFilterTypes } from "../../../features/Story/Story";

type DebouncedTranslationsTypes = {
  language: CurrentlyAvailableLanguagesTypes;
  textFieldName: string;
};

const getDebouncedStories = async ({
  language = "russian",
  textFieldName,
}: DebouncedTranslationsTypes): Promise<TranslationStoryTypes[]> => {
  return await axiosCustomized
    .get(
      `/translations/textFieldNames?currentLanguage=${language}&textFieldName=${textFieldName}`
    )
    .then((r) => r.data);
};

export default function useGetStoryTranslationByTextFieldName({
  language,
  storiesType,
}: {
  language: CurrentlyAvailableLanguagesTypes;
  storiesType: StoryFilterTypes;
}) {
  return useQuery({
    queryKey: ["translation", "textFieldName", "stories"],
    queryFn: () =>
      getDebouncedStories({
        textFieldName: "storyName",
        language,
      }),
    enabled: !!language && storiesType === "all",
  });
}
