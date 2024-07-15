import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";

type CreateSayCommandTypes = {
  plotFieldIdCommandId: string;
  topologyBlockId: string;
};

export default function useCreateSayCommand({
  plotFieldIdCommandId,
  topologyBlockId,
}: CreateSayCommandTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type }: { type: CommandSayVariationTypes }) =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldIdCommandId}/say/characters/:characterId`,
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
