import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
type CreateSayCharacterCommandTypes = {
  plotFieldIdCommandId: string;
  topologyBlockId: string;
  characterId: string;
};
export default function useCreateSayCharacterCommand({
  plotFieldIdCommandId,
  topologyBlockId,
  characterId,
}: CreateSayCharacterCommandTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type }: { type: CommandSayVariationTypes }) =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldIdCommandId}/say/characters/${characterId}`,
        {
          type,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfield", "topologyBlock", topologyBlockId],
        exact: true,
        type: "active",
      });
    },
  });
}
