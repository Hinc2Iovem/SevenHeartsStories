import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateWardrobeTypes = {
  plotFieldCommandId: string;
};

export default function useCreateWardrobe({
  plotFieldCommandId,
}: CreateWardrobeTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/wardrobes`
      ),
  });
}
