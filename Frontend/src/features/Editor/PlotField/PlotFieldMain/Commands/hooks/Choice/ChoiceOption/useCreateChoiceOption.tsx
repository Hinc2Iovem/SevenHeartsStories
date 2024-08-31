import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { ChoiceOptionVariationsTypes } from "../../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type CreateChoiceOptionTypes = {
  plotFieldCommandChoiceId: string;
  plotFieldCommandId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};
type CreateChoiceOptionOnMutationTypes = {
  type: ChoiceOptionVariationsTypes;
};

export default function useCreateChoiceOption({
  plotFieldCommandChoiceId,
  plotFieldCommandId,
  language = "russian",
}: CreateChoiceOptionTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type }: CreateChoiceOptionOnMutationTypes) =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/choices/${plotFieldCommandChoiceId}/options`,
        {
          type,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "choice",
          plotFieldCommandId,
          "translation",
          language,
          "option",
        ],
        exact: true,
        type: "active",
      });
    },
  });
}
