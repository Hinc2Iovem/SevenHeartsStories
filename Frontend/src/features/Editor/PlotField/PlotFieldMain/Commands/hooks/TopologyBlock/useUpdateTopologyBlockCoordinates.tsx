import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateTopologyBlockCoordinatesTypes = {
  topologyBlockId: string;
  episodeId: string;
};
type UpdateTopologyBlockCoordinatesOnMutationTypes = {
  coordinatesX: number;
  coordinatesY: number;
};

export default function useUpdateTopologyBlockCoordinates({
  topologyBlockId,
  episodeId,
}: UpdateTopologyBlockCoordinatesTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      coordinatesX,
      coordinatesY,
    }: UpdateTopologyBlockCoordinatesOnMutationTypes) => {
      await axiosCustomized.patch(
        `/topologyBlocks/${topologyBlockId}/coordinates`,
        {
          coordinatesX,
          coordinatesY,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["episode", episodeId, "topologyBlock", "first"],
        exact: true,
        type: "active",
      });
    },
  });
}
