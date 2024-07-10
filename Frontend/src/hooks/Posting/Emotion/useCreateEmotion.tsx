import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";

type CreateEmotionTypes = {
  characterId: string;
  emotionName: string;
};

export default function useCreateEmotion({
  characterId,
  emotionName,
}: CreateEmotionTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new", "emotion", emotionName],
    mutationFn: async () =>
      await axiosCustomized.post(
        `/characterEmotions/characters/${characterId}`,
        {
          emotionName,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["emotions", "character", characterId],
        exact: true,
        type: "active",
      });
    },
  });
}
