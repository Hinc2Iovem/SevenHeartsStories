import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      seasonName,
    }: UpdateSeasonTranslationOnMutationTypes) =>
      await axiosCustomized.patch(`/translations/seasons/${seasonId}`, {
        currentLanguage: language,
        title: seasonName,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["translation", language, "season", seasonId],
        exact: true,
        type: "active",
      });
    },
  });
}
