import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { StoryTypes } from "../../../types/StoryData/Story/StoryTypes";

export default function useGetAllStories() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () =>
      await axiosCustomized.get<StoryTypes[]>(`/stories`).then((r) => r.data),
  });
}
