import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateStoryTranslationTypes = {
  storyId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateStoryTranslationOnMutationTypes = {
  storyGenre?: string;
  storyName?: string;
  storyDescription?: string;
};

export default function useUpdateStoryTranslation({
  storyId,
  language,
}: UpdateStoryTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      storyName,
      storyDescription,
      storyGenre,
    }: UpdateStoryTranslationOnMutationTypes) =>
      await axiosCustomized.patch(`/translations/stories/${storyId}`, {
        currentLanguage: language,
        title: storyName,
        description: storyDescription,
        genre: storyGenre,
      }),
  });
}
