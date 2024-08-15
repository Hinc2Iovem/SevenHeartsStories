import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";

type AssignWorkerTypes = {
  storyId: string;
  currentUserId: string;
};

type AssignWorkerOnMutationTypes = {
  staffId: string;
};

export default function useAssignWorker({
  storyId,
  currentUserId,
}: AssignWorkerTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["assignStory", storyId],
    mutationFn: async ({ staffId }: AssignWorkerOnMutationTypes) =>
      await axiosCustomized.patch(
        `/stories/${storyId}/staff/${staffId}/assignWorkers`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignedStories", "staff", currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });
}
