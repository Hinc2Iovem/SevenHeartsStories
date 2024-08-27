import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";

type UpdateCommandSayTypes = {
  plotFieldCommandSayId: string;
  plotFieldCommandId: string;
};

export default function useUpdateCommandSayType({
  plotFieldCommandSayId,
  plotFieldCommandId,
}: UpdateCommandSayTypes) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (type: CommandSayVariationTypes) =>
      await axiosCustomized.patch(
        `/plotFieldCommands/say/${plotFieldCommandSayId}/type`,
        {
          type,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfieldComamnd", plotFieldCommandId, "say"],
        exact: true,
        type: "active",
      });
    },
  });
}
