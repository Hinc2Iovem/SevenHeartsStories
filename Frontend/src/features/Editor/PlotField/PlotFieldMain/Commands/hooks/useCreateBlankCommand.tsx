import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";
import { PlotFieldTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";

type NewCommandTypes = {
  _id: string;
  commandIfId?: string;
  isElse?: boolean;
  topologyBlockId: string;
  commandOrder: number;
};

export default function useCreateBlankCommand({
  topologyBlockId,
}: {
  topologyBlockId: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new", "plotfield", "topologyBlock", topologyBlockId],
    mutationFn: async (commandOrder) => {
      return await axiosCustomized
        .post<PlotFieldTypes>(`/plotField/topologyBlocks/${topologyBlockId}`, {
          commandOrder: commandOrder.commandOrder,
        })
        .then((r) => r.data);
    },
    onMutate: async (newCommand: NewCommandTypes) => {
      await queryClient.cancelQueries({
        queryKey: ["plotfield", "topologyBlock", topologyBlockId],
      });

      const prevCommands = queryClient.getQueryData([
        "plotfield",
        "topologyBlock",
        topologyBlockId,
      ]);

      queryClient.setQueryData(
        ["plotfield", "topologyBlock", topologyBlockId],
        (old: PlotFieldTypes[]) => [...old, newCommand]
      );

      return { prevCommands };
    },
    onError: (err, newCommand, context) => {
      queryClient.setQueryData(
        ["plotfield", "topologyBlock", topologyBlockId],
        context?.prevCommands
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfield", "topologyBlock", topologyBlockId],
        type: "active",
        exact: true,
      });
    },
  });
}
