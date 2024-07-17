import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";
import { ChoiceOptionVariationsTypes } from "../../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";

type CreateChoiceOptionTypes = {
  type: ChoiceOptionVariationsTypes;
  plotFieldCommandChoiceId: string;
  episodeId: string;
  topologyBlockId: string;
};

export default function useCreateChoiceOption({
  episodeId,
  plotFieldCommandChoiceId,
  topologyBlockId,
  type,
}: CreateChoiceOptionTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/choices/${plotFieldCommandChoiceId}/options/episodes/${episodeId}/topologyBlocks/${topologyBlockId}`,
        {
          type,
        }
      ),
  });
}
