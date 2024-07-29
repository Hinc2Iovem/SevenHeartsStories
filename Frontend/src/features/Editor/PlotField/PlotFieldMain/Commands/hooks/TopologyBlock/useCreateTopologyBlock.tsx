import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

export default function useCreateTopologyBlock({
  episodeId,
}: {
  episodeId: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(`/topologyBlocks/episodes/${episodeId}`, {
        coordinatesX: 10,
        coordinatesY: 500,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["episode", episodeId, "topologyBlock"],
        exact: true,
        type: "active",
      });
    },
  });
}
