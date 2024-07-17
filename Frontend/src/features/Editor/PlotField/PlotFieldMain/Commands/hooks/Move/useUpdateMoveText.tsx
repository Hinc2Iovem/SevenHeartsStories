import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateMoveTextTypes = {
  moveId: string;
  moveValue: number;
};

export default function useUpdateMoveText({
  moveId,
  moveValue,
}: UpdateMoveTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(`/plotFieldCommands/moves/${moveId}`, {
        moveValue,
      }),
  });
}
