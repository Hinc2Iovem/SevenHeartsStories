import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateSuitTextTypes = {
  suitId: string;
  characterIdId: string;
  suitName: string;
};

export default function useUpdateSuitText({
  suitId,
  characterIdId,
  suitName,
}: UpdateSuitTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/characters/${characterIdId}/suits/${suitId}`,
        {
          suitName,
        }
      ),
  });
}
