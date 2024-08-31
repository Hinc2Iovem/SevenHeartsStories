import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";
import PlotfieldHeader from "./PlotFieldHeader/PlotfieldHeader";
import PlotFieldMain from "./PlotFieldMain/PlotFieldMain";

type PlotFieldProps = {
  topologyBlockId: string;
  keyCombinationToExpandPlotField: PossibleCommandsCreatedByCombinationOfKeysTypes;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PlotField({
  topologyBlockId,
  setShowHeader,
  keyCombinationToExpandPlotField,
}: PlotFieldProps) {
  console.log(keyCombinationToExpandPlotField);

  return (
    <section
      className={`${
        keyCombinationToExpandPlotField === "expandPlotField"
          ? "w-full"
          : " w-1/2"
      } ${
        keyCombinationToExpandPlotField === "expandPlotField" ||
        !keyCombinationToExpandPlotField
          ? ""
          : "hidden"
      } flex-grow flex-shrink-0 bg-white rounded-md shadow-md min-h-[20rem] h-full relative p-[1rem]`}
    >
      <PlotfieldHeader
        setShowHeader={setShowHeader}
        topologyBlockId={topologyBlockId}
      />
      <PlotFieldMain topologyBlockId={topologyBlockId} />
    </section>
  );
}
