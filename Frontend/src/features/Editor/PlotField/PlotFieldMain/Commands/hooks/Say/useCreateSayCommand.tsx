import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";

type CreateSayCommandTypes = {
  plotFieldCommandId: string;
};

export default function useCreateSayCommand({
  plotFieldCommandId,
}: CreateSayCommandTypes) {
  return useMutation({
    mutationFn: async ({ type }: { type: CommandSayVariationTypes }) =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/say/characters/:characterId`,
        {
          type,
        }
      ),
  });
}
