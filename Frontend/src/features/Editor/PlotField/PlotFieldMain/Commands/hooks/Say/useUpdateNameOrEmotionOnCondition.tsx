import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateNameOrEmotionTypes = {
  plotFieldCommandSayId: string;
  characterId: string;
  characterEmotionId: string;
};

export default function useUpdateNameOrEmotionOnCondition({
  plotFieldCommandId,
  prevEmotionId,
}: {
  plotFieldCommandId: string;
  prevEmotionId: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      plotFieldCommandSayId,
      characterEmotionId,
      characterId,
    }: UpdateNameOrEmotionTypes) =>
      await axiosCustomized.patch(
        `/plotFieldCommands/say/${plotFieldCommandSayId}/characterOrEmotionId`,
        {
          characterEmotionId,
          characterId,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfieldComamnd", plotFieldCommandId, "say"],
        exact: true,
        type: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["character", "emotion", prevEmotionId],
        exact: true,
        type: "all",
      });
    },
  });
}
