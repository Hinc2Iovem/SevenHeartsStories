import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateSeasonTranslationTypes = {
  seasonId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateSeasonTranslationOnMutationTypes = {
  seasonName?: string;
};

export default function useUpdateSeasonTranslation({
  seasonId,
  language,
}: UpdateSeasonTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      seasonName,
    }: UpdateSeasonTranslationOnMutationTypes) =>
      await axiosCustomized.patch(`/translations/seasons/${seasonId}`, {
        currentLanguage: language,
        title: seasonName,
      }),
  });
}
