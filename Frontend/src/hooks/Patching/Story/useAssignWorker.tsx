import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";

type AssignWorkerTypes = {
  storyId: string;
};

type AssignWorkerOnMutationTypes = {
  staffId: string;
};

export default function useAssignWorker({ storyId }: AssignWorkerTypes) {
  return useMutation({
    mutationKey: ["assignStory", storyId],
    mutationFn: async ({ staffId }: AssignWorkerOnMutationTypes) =>
      await axiosCustomized.patch(
        `/stories/${storyId}/staff/${staffId}/assignWorkers`
      ),
  });
}
