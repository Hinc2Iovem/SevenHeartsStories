import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../api/axios";
import { PlotFieldTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";

export default function useGetAllPlotFieldCommands({
  topologyBlockId,
}: {
  topologyBlockId: string;
}) {
  return useQuery({
    queryKey: ["plotfield", "topologyBlock", topologyBlockId],
    queryFn: async () =>
      await axiosCustomized
        .get<PlotFieldTypes[]>(`/plotField/topologyBlocks/${topologyBlockId}`)
        .then((r) => r.data),
    select: (data) => data.sort((a, b) => a.commandOrder - b.commandOrder),
    enabled: !!topologyBlockId,
  });
}
