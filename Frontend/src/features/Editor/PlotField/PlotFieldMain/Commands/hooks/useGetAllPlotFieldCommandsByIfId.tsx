import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";
import { PlotFieldCommandIfTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";

export default function useGetAllPlotFieldCommandsByIfId({
  commandIfId,
}: {
  commandIfId: string;
}) {
  return useQuery({
    queryKey: ["plotfield", "commandIf", commandIfId],
    queryFn: async () =>
      await axiosCustomized
        .get<PlotFieldCommandIfTypes[]>(`/plotField/commandIfs/${commandIfId}`)
        .then((r) => r.data),
    select: (data) => data.sort((a, b) => a.commandOrder - b.commandOrder),
  });
}
