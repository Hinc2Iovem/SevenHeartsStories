import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { StoryInfoTypes } from "../../../types/StoryData/Story/StoryTypes";

export default function useGetAssignedStories({
  staffId,
}: {
  staffId: string;
}) {
  return useQuery({
    queryKey: ["assignedStories", "staff", staffId],
    queryFn: async () =>
      await axiosCustomized
        .get<StoryInfoTypes[]>(`/stories/staff/${staffId}/assignWorkers`)
        .then((r) => r.data),
  });
}
