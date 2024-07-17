import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateWaitTextTypes = {
  waitId: string;
  waitValue: number;
};

export default function useUpdateWaitText({
  waitId,
  waitValue,
}: UpdateWaitTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(`/plotFieldCommands/wait/${waitId}`, {
        waitValue,
      }),
  });
}
