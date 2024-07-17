import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../../api/axios";

type CreateWardrobeAppearanceTypeTypes = {
  commandWardrobeId: string;
  appearancePartId: string;
};

export default function useCreateWardrobeAppearanceTypeBlock({
  commandWardrobeId,
  appearancePartId,
}: CreateWardrobeAppearanceTypeTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/wardrobes/${commandWardrobeId}/appearanceParts/${appearancePartId}`
      ),
  });
}
