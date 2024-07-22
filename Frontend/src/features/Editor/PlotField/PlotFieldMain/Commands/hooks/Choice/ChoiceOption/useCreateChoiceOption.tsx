import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { ChoiceOptionVariationsTypes } from "../../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";

type CreateChoiceOptionTypes = {
  plotFieldCommandChoiceId: string;
  episodeId: string;
  topologyBlockId: string;
};
type CreateChoiceOptionOnMutationTypes = {
  type: ChoiceOptionVariationsTypes;
};

export default function useCreateChoiceOption({
  episodeId,
  plotFieldCommandChoiceId,
  topologyBlockId,
}: CreateChoiceOptionTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type }: CreateChoiceOptionOnMutationTypes) =>
      await axiosCustomized.post(
        `/plotFieldCommands/choices/${plotFieldCommandChoiceId}/options/episodes/${episodeId}/topologyBlocks/${topologyBlockId}`,
        {
          type,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["choice", plotFieldCommandChoiceId, "option"],
        exact: true,
        type: "active",
      });
    },
  });
}
