import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateMusicTextTypes = {
  musicId: string;
  storyId: string;
  musicName: string;
};

export default function useUpdateMusicText({
  musicId,
  storyId,
  musicName,
}: UpdateMusicTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/stories/${storyId}/music/${musicId}`,
        {
          musicName,
        }
      ),
  });
}
