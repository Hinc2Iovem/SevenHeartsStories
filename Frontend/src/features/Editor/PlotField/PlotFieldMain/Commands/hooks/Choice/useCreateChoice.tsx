import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type CreateChoiceTypes = {
  plotFieldCommandId: string;
};

export default function useCreateChoice({
  plotFieldCommandId,
}: CreateChoiceTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.post(
        `/plotFieldCommands/${plotFieldCommandId}/choices`
      ),
  });
}
