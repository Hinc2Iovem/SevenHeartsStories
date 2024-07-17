import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateKeyTextTypes = {
  commandKeyId: string;
  sourceBlockId: string;
  targetBlockId: string;
};

export default function useUpdateKeyText({
  commandKeyId,
  sourceBlockId,
  targetBlockId,
}: UpdateKeyTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/commandKeys/${commandKeyId}/sourceBlocks/${sourceBlockId}/targetBlocks/${targetBlockId}`
      ),
  });
}
