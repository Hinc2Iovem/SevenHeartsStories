import PlotfieldHeader from "./PlotFieldHeader/PlotfieldHeader";
import PlotFieldMain from "./PlotFieldMain/PlotFieldMain";

type PlotFieldProps = {
  topologyBlockId: string;
};

export default function PlotField({ topologyBlockId }: PlotFieldProps) {
  return (
    <section className="w-1/2 bg-white rounded-md shadow-md min-h-[20rem] relative p-[1rem]">
      <PlotfieldHeader topologyBlockId={topologyBlockId} />
      <PlotFieldMain topologyBlockId={topologyBlockId} />
    </section>
  );
}
