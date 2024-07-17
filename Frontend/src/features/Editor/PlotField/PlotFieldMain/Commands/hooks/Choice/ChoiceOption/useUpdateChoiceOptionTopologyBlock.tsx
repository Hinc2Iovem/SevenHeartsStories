import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";

type UpdateChoiceOptionTopologyBlockTypes = {
  choiceOptionId: string;
  topologyBlockId: string;
};

export default function useUpdateChoiceOptionTopologyBlock({
  choiceOptionId,
  topologyBlockId,
}: UpdateChoiceOptionTopologyBlockTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/choices/options/${choiceOptionId}/topologyBlocks/${topologyBlockId}`
      ),
  });
}
