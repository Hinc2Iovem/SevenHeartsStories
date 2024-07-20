import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateWardrobeCurrentDressedTypes = {
  commandWardrobeId: string;
  isCurrentDressed: boolean;
  characterId: string;
};

export default function useUpdateWardrobeCurrentDressedAndCharacterId({
  commandWardrobeId,
  characterId,
  isCurrentDressed,
}: UpdateWardrobeCurrentDressedTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/wardrobes/${commandWardrobeId}`,
        {
          isCurrentDressed,
          characterId,
        }
      ),
  });
}
