import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type GetCommandIfTypes = {
  commandIfId: string;
};
type GetCommandIfOnMutationTypes = {
  plotFieldCommandId: string;
  newOrder: number;
};

export default function useUpdateOrderInsideCommandIf({
  commandIfId,
}: GetCommandIfTypes) {
  return useMutation({
    mutationFn: async ({
      newOrder,
      plotFieldCommandId,
    }: GetCommandIfOnMutationTypes) => {
      console.log("sending newOrder: ", newOrder);

      await axiosCustomized.patch(
        `/plotFieldCommands/${plotFieldCommandId}/ifs/${commandIfId}/newOrder`,
        {
          newOrder,
        }
      );
    },
  });
}
