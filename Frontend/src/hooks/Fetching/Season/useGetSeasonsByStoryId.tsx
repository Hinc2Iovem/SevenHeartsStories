import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { SeasonTypes } from "../../../types/StoryData/Season/SeasonTypes";

type GetSeasonsByStoryIdTypes = {
  storyId: string;
};

export default function useGetSeasonsByStoryId({
  storyId,
}: GetSeasonsByStoryIdTypes) {
  return useQuery({
    queryKey: ["stories", storyId, "seasons"],
    queryFn: async () =>
      await axiosCustomized
        .get<SeasonTypes[]>(`/stories/${storyId}/seasons`)
        .then((r) => r.data),
    enabled: !!storyId,
  });
}
