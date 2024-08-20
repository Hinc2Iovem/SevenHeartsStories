import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";

type CreateSayCommandTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  characterId?: string;
};

export default function useCreateSayCommand({
  plotFieldCommandId,
  topologyBlockId,
  characterId,
}: CreateSayCommandTypes) {
  return useMutation({
    mutationFn: async ({ type }: { type: CommandSayVariationTypes }) =>
      await axiosCustomized.post(
        `/says/${plotFieldCommandId}/topologyBlocks/${topologyBlockId}/translations`,
        {
          type,
          characterId,
        }
      ),
  });
}
