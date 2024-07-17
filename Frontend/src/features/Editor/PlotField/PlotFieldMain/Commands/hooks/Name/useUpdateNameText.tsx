import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateNameTextTypes = {
  nameId: string;
  characterId: string;
  newName: string;
};

export default function useUpdateNameText({
  nameId,
  characterId,
  newName,
}: UpdateNameTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/characters/${characterId}/names/${nameId}`,
        {
          newName,
        }
      ),
  });
}
