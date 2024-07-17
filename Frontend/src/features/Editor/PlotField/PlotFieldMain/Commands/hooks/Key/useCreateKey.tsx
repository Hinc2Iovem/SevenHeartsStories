import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateKeyTypes = {
  plotFieldCommandId: string;
};

export default function useCreateKey({ plotFieldCommandId }: CreateKeyTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/keys`
      ),
  });
}
