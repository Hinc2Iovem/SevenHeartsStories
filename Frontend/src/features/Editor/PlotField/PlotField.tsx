import PlotfieldHeader from "./PlotFieldHeader/PlotfieldHeader";
import PlotFieldMain from "./PlotFieldMain/PlotFieldMain";

type PlotFieldProps = {
  topologyBlockId: string;
  expandPlotField?: boolean;
};

export default function PlotField({
  topologyBlockId,
  expandPlotField,
}: PlotFieldProps) {
  return (
    <section
      className={`${
        expandPlotField ? "w-full" : " w-1/2"
      } flex-grow flex-shrink-0 bg-white rounded-md shadow-md min-h-[20rem] relative p-[1rem] h-fit`}
    >
      <PlotfieldHeader topologyBlockId={topologyBlockId} />
      <PlotFieldMain topologyBlockId={topologyBlockId} />
    </section>
  );
}
