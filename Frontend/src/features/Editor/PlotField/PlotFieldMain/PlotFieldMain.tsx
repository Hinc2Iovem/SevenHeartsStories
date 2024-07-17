import PlotfieldItem from "./Commands/PlotfieldItem";
import useGetAllPlotFieldCommands from "./Commands/hooks/useGetAllPlotFieldCommands";

type PlotFieldMainTypes = {
  topologyBlockId: string;
};

export default function PlotFieldMain({ topologyBlockId }: PlotFieldMainTypes) {
  const { data: plotfieldCommands } = useGetAllPlotFieldCommands({
    topologyBlockId,
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
