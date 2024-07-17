import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateAchievementTypes = {
  storyId: string;
  plotFieldCommandId: string;
};

export default function useCreateAchievement({
  plotFieldCommandId,
  storyId,
}: CreateAchievementTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/stories/${storyId}/plotFieldCommands/${plotFieldCommandId}/achievements`
      ),
  });
}
