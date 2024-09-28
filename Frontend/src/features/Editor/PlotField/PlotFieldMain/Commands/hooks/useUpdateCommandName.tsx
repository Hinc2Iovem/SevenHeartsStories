import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";
import usePlotfieldCommands from "../../../PlotFieldContext";
import { AllPossiblePlotFieldComamndsTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";

type UpdateCommandNameTypes = {
  plotFieldCommandId: string;
  value?: string;
  topologyBlockId: string;
  commandIfId?: string;
  commandOrder?: number;
};

type UpdateCommandNameOnMutationTypes = {
  valueOnMutation?: string;
  valueForSay: boolean;
};

export default function useUpdateCommandName({
  plotFieldCommandId,
  value,
  topologyBlockId,
  commandIfId,
  commandOrder,
}: UpdateCommandNameTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      valueForSay,
      valueOnMutation,
    }: UpdateCommandNameOnMutationTypes) =>
      await axiosCustomized.patch(
        `/plotField/${plotFieldCommandId}/topologyBlocks/commandName`,
        {
          commandName: valueForSay
            ? "say"
            : value?.toLowerCase() || valueOnMutation?.toLowerCase(),
        }
      ),
    onMutate: () => {
      if (commandIfId?.trim().length) {
        queryClient.invalidateQueries({
          queryKey: ["plotfield", "commandIf", commandIfId, "insideIf"],
          exact: true,
          type: "active",
        });
        queryClient.invalidateQueries({
          queryKey: ["plotfield", "commandIf", commandIfId, "insideElse"],
          exact: true,
          type: "active",
        });
      }
    },
  });
}
