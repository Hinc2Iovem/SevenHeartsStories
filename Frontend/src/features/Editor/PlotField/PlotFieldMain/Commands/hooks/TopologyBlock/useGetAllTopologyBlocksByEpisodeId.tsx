import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TopologyBlockTypes } from "../../../../../../../types/TopologyBlock/TopologyBlockTypes";

type GetTopologyBlocksTypes = {
  episodeId: string;
};

export default function useGetAllTopologyBlocksByEpisodeId({
  episodeId,
}: GetTopologyBlocksTypes) {
  return useQuery({
    queryKey: ["episode", episodeId, "topologyBlock"],
    queryFn: async () =>
      await axiosCustomized
        .get<TopologyBlockTypes[]>(`/topologyBlocks/episodes/${episodeId}`)
        .then((r) => r.data),
    enabled: !!episodeId,
  });
}
