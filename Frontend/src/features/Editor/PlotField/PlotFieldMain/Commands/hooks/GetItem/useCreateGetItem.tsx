import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateGetItemTypes = {
  plotFieldCommandId: string;
};

export default function useCreateGetItem({
  plotFieldCommandId,
}: CreateGetItemTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/getItems`
      ),
  });
}
