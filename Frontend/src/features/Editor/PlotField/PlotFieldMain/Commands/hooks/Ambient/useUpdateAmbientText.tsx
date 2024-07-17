import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateAmbientTextTypes = {
  ambientId: string;
};

export default function useUpdateAmbientText({
  ambientId,
}: UpdateAmbientTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(`/plotFieldCommands/ambients${ambientId}`),
  });
}
