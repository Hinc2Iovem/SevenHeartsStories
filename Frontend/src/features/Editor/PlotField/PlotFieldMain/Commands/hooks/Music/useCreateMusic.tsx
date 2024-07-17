import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateMusicTypes = {
  plotFieldCommandId: string;
  storyId: string;
};

export default function useCreateMusic({
  plotFieldCommandId,
  storyId,
}: CreateMusicTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/stories/${storyId}/${plotFieldCommandId}/music`
      ),
  });
}
