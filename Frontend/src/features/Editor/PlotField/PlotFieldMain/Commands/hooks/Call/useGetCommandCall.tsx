import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CallTypes } from "../../../../../../../types/StoryEditor/PlotField/Call/CallTypes";

type GetCommandCallTypes = {
  plotFieldCommandId: string;
};

export default function useGetCommandCall({
  plotFieldCommandId,
}: GetCommandCallTypes) {
  return useQuery({
    queryKey: ["plotfieldCommand", plotFieldCommandId, "call"],
    queryFn: async () =>
      await axiosCustomized
        .get<CallTypes>(`/plotFieldCommands/${plotFieldCommandId}/calls`)
        .then((r) => r.data),
  });
}
