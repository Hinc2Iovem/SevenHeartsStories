import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateCallTextTypes = {
  callId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

export default function useUpdateCallText({
  callId,
  sourceBlockId,
  targetBlockId,
}: UpdateCallTextTypes) {
  return useMutation({
    mutationFn: async () => {
      console.log("sending targetBlockId: ", targetBlockId);

      await axiosCustomized.patch(
        `/plotFieldCommands/calls/${callId}/targetBlocks/${targetBlockId}/sourceBlocks/${sourceBlockId}`
      );
    },
  });
}
