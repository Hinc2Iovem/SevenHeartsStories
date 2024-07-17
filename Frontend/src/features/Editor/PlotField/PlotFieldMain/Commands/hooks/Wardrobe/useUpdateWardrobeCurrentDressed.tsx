import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateWardrobeCurrentDressedTypes = {
  commandWardrobeId: string;
  isCurrentDressed: boolean;
};

export default function useUpdateWardrobeCurrentDressed({
  commandWardrobeId,
  isCurrentDressed,
}: UpdateWardrobeCurrentDressedTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/wardrobes/${commandWardrobeId}`,
        {
          isCurrentDressed,
        }
      ),
  });
}
