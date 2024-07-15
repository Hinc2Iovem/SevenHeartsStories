import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { PlotFieldTypes } from "../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import PlotfieldItem from "./Commands/PlotfieldItem";

type PlotFieldMainTypes = {
  topologyBlockId: string;
};

export default function PlotFieldMain({ topologyBlockId }: PlotFieldMainTypes) {
  const { data: plotfieldCommands } = useQuery({
    queryKey: ["plotfield", "topologyBlock", topologyBlockId],
    queryFn: async () =>
      await axiosCustomized
        .get<PlotFieldTypes[]>(`/plotField/topologyBlocks/${topologyBlockId}`)
        .then((r) => r.data),
    select: (data) => data.sort((a, b) => a.commandOrder - b.commandOrder),
  });

  return (
    <main className="mt-[2rem]">
      <ul className="flex flex-col gap-[1rem] w-full">
        {plotfieldCommands?.map((p) => (
          <PlotfieldItem key={p._id} {...p} />
        ))}
      </ul>
    </main>
  );
}
