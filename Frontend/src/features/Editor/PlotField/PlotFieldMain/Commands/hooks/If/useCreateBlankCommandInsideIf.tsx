import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

export default function useCreateBlankCommandInsideIf({
  topologyBlockId,
  commandIfId,
  isElse = false,
}: {
  topologyBlockId: string;
  commandIfId: string;
  isElse?: boolean;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new", "plotfield", "topologyBlock", topologyBlockId],
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotField/topologyBlocks/${topologyBlockId}/commandIfs/${commandIfId}`,
        { isElse }
      ),
    onSuccess: () => {
      if (isElse) {
        queryClient.invalidateQueries({
          queryKey: ["plotfield", "commandIf", commandIfId, "insideElse"],
          type: "active",
          exact: true,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["plotfield", "commandIf", commandIfId, "insideIf"],
          type: "active",
          exact: true,
        });
      }
    },
  });
}
