import { TopologyBlockConnectionTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useGetTopologyBlockById from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetTopologyBlockById";
import { FlowchartArrow } from "./FlowchartArrow";

export default function FlowchartArrowList({
  sourceBlockId,
  targetBlockId,
}: TopologyBlockConnectionTypes) {
  const { data: targetBlock } = useGetTopologyBlockById({
    topologyBlockId: targetBlockId,
  });
  const { data: sourceBlock } = useGetTopologyBlockById({
    topologyBlockId: sourceBlockId,
  });

  return (
    <FlowchartArrow
      endPoint={{
        x: targetBlock?.coordinatesX || 0,
        y: targetBlock?.coordinatesY || 0,
      }}
      startPoint={{
        x: sourceBlock?.coordinatesX || 0,
        y: sourceBlock?.coordinatesY || 0,
      }}
      config={{
        arrowColor: "white",
        strokeWidth: 2.5,
        controlPointsColor: "#aaa",
        dotEndingBackground: "black",
        dotEndingRadius: 4,
      }}
    />
  );
}
