import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";

type UpdateConditionBlockTopologyBlockIdTypes = {
  conditionBlockId: string;
  topologyBlockId: string;
};

export default function useUpdateConditionBlockTopologyBlockId({
  conditionBlockId,
  topologyBlockId,
}: UpdateConditionBlockTopologyBlockIdTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/commandConditions/conditionBlocks/${conditionBlockId}/topologyBlocks/${topologyBlockId}`
      ),
  });
}
