import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";

type UpdateCommandNameTypes = {
  plotFieldCommandId: string;
  value: string;
  topologyBlockId: string;
  commandIfId: string;
};

export default function useUpdateCommandName({
  plotFieldCommandId,
  value,
  topologyBlockId,
  commandIfId,
}: UpdateCommandNameTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ valueForSay }: { valueForSay: boolean }) =>
      await axiosCustomized.patch(
        `/plotField/${plotFieldCommandId}/topologyBlocks/commandName`,
        {
          commandName: valueForSay ? "say" : value.toLowerCase(),
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfield", "topologyBlock", topologyBlockId],
        exact: true,
        type: "active",
      });
      if (commandIfId?.trim().length) {
        queryClient.invalidateQueries({
          queryKey: ["plotfield", "commandIf", commandIfId],
          exact: true,
          type: "active",
        });
      }
    },
  });
}
