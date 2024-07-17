import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { BackgroundTypes } from "../../../../../../../types/StoryEditor/PlotField/Background/BackgroundTypes";

type GetCommandBackgroundTypes = {
  plotFieldCommandId: string;
};

export default function useGetCommandBackground({
  plotFieldCommandId,
}: GetCommandBackgroundTypes) {
  return useQuery({
    queryKey: ["plotfieldCommand", plotFieldCommandId, "background"],
    queryFn: async () =>
      await axiosCustomized
        .get<BackgroundTypes>(
          `/plotFieldCommands/${plotFieldCommandId}/backgrounds`
        )
        .then((r) => r.data),
  });
}
