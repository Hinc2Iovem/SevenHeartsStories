import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";

type UpdateBackgroundTextTypes = {
  backgroundId: string;
  backgroundName: string;
  musicName?: string;
  pointOfMovement?: number;
};

export default function useUpdateBackgroundText({
  backgroundId,
  backgroundName,
  musicName,
  pointOfMovement,
}: UpdateBackgroundTextTypes) {
  return useMutation({
    mutationFn: async () =>
      await axiosCustomized.patch(
        `/plotFieldCommands/backgrounds${backgroundId}`,
        {
          backgroundName,
          pointOfMovement,
          musicName,
        }
      ),
  });
}
