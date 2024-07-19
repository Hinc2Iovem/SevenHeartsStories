import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { MusicTypes } from "../../../../../../../types/StoryData/Music/MusicTypes";

type GetMusicByIdTypes = {
  musicId: string;
};

export default function useGetMusicById({ musicId }: GetMusicByIdTypes) {
  return useQuery({
    queryKey: ["stories", "music", musicId],
    queryFn: async () =>
      await axiosCustomized
        .get<MusicTypes>(`/stories/music/${musicId}`)
        .then((r) => r.data),
    enabled: !!musicId,
  });
}
