import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";

type UpdateChoiceOptionTopologyBlockTypes = {
  choiceOptionId: string;
};

type UpdateChoiceOptionTopologyBlockOnMutationTypes = {
  topologyBlockId: string;
};

export default function useUpdateChoiceOptionTopologyBlock({
  choiceOptionId,
}: UpdateChoiceOptionTopologyBlockTypes) {
  return useMutation({
    mutationFn: async ({
      topologyBlockId,
    }: UpdateChoiceOptionTopologyBlockOnMutationTypes) =>
      await axiosCustomized.patch(
        `/plotFieldCommands/choices/options/${choiceOptionId}/topologyBlocks/${topologyBlockId}`
      ),
  });
}
