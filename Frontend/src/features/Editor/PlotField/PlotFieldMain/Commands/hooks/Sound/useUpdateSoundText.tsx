import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateSoundTextTypes = {
  soundId: string;
  storyId: string;
  soundName: string;
};

export default function useUpdateSoundText({
  soundId,
  storyId,
  soundName,
}: UpdateSoundTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/stories/${storyId}/sounds/${soundId}`,
        {
          soundName,
        }
      ),
  });
}
