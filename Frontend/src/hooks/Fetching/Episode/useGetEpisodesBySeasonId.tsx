import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { EpisodeTypes } from "../../../types/StoryData/Episode/EpisodeTypes";

type GetEpisodesBySeasonIdTypes = {
  seasonId: string;
};

export default function useGetEpisodesBySeasonId({
  seasonId,
}: GetEpisodesBySeasonIdTypes) {
  return useQuery({
    queryKey: ["episodes", "seasons", seasonId],
    queryFn: async () =>
      await axiosCustomized
        .get<EpisodeTypes[]>(`/episodes/seasons/${seasonId}`)
        .then((r) => r.data),
    select: (data) => data.sort((a, b) => a.episodeOrder - b.episodeOrder),
    enabled: !!seasonId,
  });
}
