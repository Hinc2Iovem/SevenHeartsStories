import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateEpisodeTranslationTypes = {
  episodeId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateEpisodeTranslationOnMutationTypes = {
  episodeName?: string;
  description?: string;
};

export default function useUpdateEpisodeTranslation({
  episodeId,
  language,
}: UpdateEpisodeTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      episodeName,
      description,
    }: UpdateEpisodeTranslationOnMutationTypes) =>
      await axiosCustomized.patch(`/translations/episodes/${episodeId}`, {
        currentLanguage: language,
        title: episodeName,
        description,
      }),
  });
}
