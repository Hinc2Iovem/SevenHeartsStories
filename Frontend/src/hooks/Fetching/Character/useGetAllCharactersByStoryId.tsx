import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CharacterGetTypes } from "../../../types/StoryData/Character/CharacterTypes";

export default function useGetAllCharactersByStoryId({
  storyId,
}: {
  storyId: string;
}) {
  return useQuery({
    queryKey: ["story", storyId, "characters"],
    queryFn: async () =>
      await axiosCustomized
        .get<CharacterGetTypes[]>(`/characters/stories/${storyId}`)
        .then((r) => r.data),
    enabled: !!storyId,
  });
}
