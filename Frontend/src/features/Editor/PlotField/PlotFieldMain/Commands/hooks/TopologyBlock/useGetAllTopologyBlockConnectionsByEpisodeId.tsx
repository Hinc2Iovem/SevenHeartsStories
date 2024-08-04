import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TopologyBlockConnectionTypes } from "../../../../../../../types/TopologyBlock/TopologyBlockTypes";

type GetTopologyBlocksTypes = {
  episodeId: string;
};

export default function useGetAllTopologyBlockConnectionsByEpisodeId({
  episodeId,
}: GetTopologyBlocksTypes) {
  return useQuery({
    queryKey: ["connection", "episode", episodeId],
    queryFn: async () =>
      await axiosCustomized
        .get<TopologyBlockConnectionTypes[]>(
          `/topologyBlocks/episodes/${episodeId}/connection`
        )
        .then((r) => r.data),
    enabled: !!episodeId,
  });
}
