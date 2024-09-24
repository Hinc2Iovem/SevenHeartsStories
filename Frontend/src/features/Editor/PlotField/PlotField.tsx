import { useState } from "react";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";
import PlotfieldHeader from "./PlotFieldHeader/PlotfieldHeader";
import useGetTopologyBlockById from "./PlotFieldMain/Commands/hooks/TopologyBlock/useGetTopologyBlockById";
import PlotFieldMain from "./PlotFieldMain/PlotFieldMain";
import ShowAllCommandsPlotfield from "./ShowAllCommands/ShowAllCommandsPlotfield";

type PlotFieldProps = {
  topologyBlockId: string;
  command: PossibleCommandsCreatedByCombinationOfKeysTypes;
  hideFlowchartFromScriptwriter: boolean;
  expansionDivDirection: "right" | "left";
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  setHideFlowchartFromScriptwriter: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setExpansionDivDirection: React.Dispatch<
    React.SetStateAction<"right" | "left">
  >;
};

export default function PlotField({
  topologyBlockId,
  command,
  hideFlowchartFromScriptwriter,
  expansionDivDirection,
  setShowHeader,
  setHideFlowchartFromScriptwriter,
  setExpansionDivDirection,
}: PlotFieldProps) {
  const { data: currentTopologyBlock } = useGetTopologyBlockById({
    topologyBlockId,
  });
  const [showAllCommands, setShowAllCommands] = useState<boolean>(false);

  return (
    <section
      className={`${
        command === "expandPlotField" || expansionDivDirection === "right"
          ? "w-full"
          : " w-1/2"
      } ${
        command === "expandPlotField" || !command ? "" : "hidden"
      } flex-grow flex-shrink-0 bg-white rounded-md shadow-md min-h-[20rem] h-full relative p-[1rem]`}
    >
      <ShowAllCommandsPlotfield
        amountOfCommands={
          currentTopologyBlock?.topologyBlockInfo.amountOfCommands || 1
        }
        topologyBlockId={topologyBlockId}
        showAllCommands={showAllCommands}
        setShowAllCommands={setShowAllCommands}
      />
      {currentTopologyBlock ? (
        <PlotfieldHeader
          setShowAllCommands={setShowAllCommands}
          showAllCommands={showAllCommands}
          hideFlowchartFromScriptwriter={hideFlowchartFromScriptwriter}
          amountOfCommands={
            currentTopologyBlock?.topologyBlockInfo.amountOfCommands || 1
          }
          setExpansionDivDirection={setExpansionDivDirection}
          setShowHeader={setShowHeader}
          topologyBlockId={topologyBlockId}
          setHideFlowchartFromScriptwriter={setHideFlowchartFromScriptwriter}
        />
      ) : null}
      <PlotFieldMain
        showAllCommands={showAllCommands}
        topologyBlockId={topologyBlockId}
      />
    </section>
  );
}
