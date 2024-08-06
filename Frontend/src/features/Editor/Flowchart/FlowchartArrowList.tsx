import { useEffect, useState } from "react";
import { useCoordinates } from "./Context/useCoordinates";
import { TopologyBlockConnectionTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useGetTopologyBlockById from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetTopologyBlockById";
import { FlowchartArrow } from "./FlowchartArrow";

export default function FlowchartArrowList({
  sourceBlockId,
  targetBlockId,
}: TopologyBlockConnectionTypes) {
  const {
    _id: currentId,
    coordinatesX: currentCoordinatesX,
    coordinatesY: currentCoordinatesY,
  } = useCoordinates();

  const { data: sourceBlock } = useGetTopologyBlockById({
    topologyBlockId: sourceBlockId,
  });
  const { data: targetBlock } = useGetTopologyBlockById({
    topologyBlockId: targetBlockId,
  });

  const [sourceCoordinates, setSourceCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>(null);
  const [targetCoordinates, setTargetCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>(null);

  useEffect(() => {
    if (sourceBlock) {
      setSourceCoordinates({
        coordinatesX: sourceBlock.coordinatesX,
        coordinatesY: sourceBlock.coordinatesY,
      });
    }
    if (currentId === sourceBlockId) {
      setSourceCoordinates({
        coordinatesX: currentCoordinatesX,
        coordinatesY: currentCoordinatesY,
      });
    }
  }, [
    sourceBlock,
    currentId,
    currentCoordinatesX,
    currentCoordinatesY,
    sourceBlockId,
  ]);

  useEffect(() => {
    if (targetBlock) {
      setTargetCoordinates({
        coordinatesX: targetBlock.coordinatesX,
        coordinatesY: targetBlock.coordinatesY,
      });
    }
    if (currentId === targetBlockId) {
      setTargetCoordinates({
        coordinatesX: currentCoordinatesX,
        coordinatesY: currentCoordinatesY,
      });
    }
  }, [
    targetBlock,
    currentId,
    currentCoordinatesX,
    currentCoordinatesY,
    targetBlockId,
  ]);

  return (
    <>
      {targetCoordinates && sourceCoordinates ? (
        <FlowchartArrow
          endPoint={{
            x: targetCoordinates.coordinatesX,
            y: targetCoordinates.coordinatesY,
          }}
          startPoint={{
            x: sourceCoordinates.coordinatesX,
            y: sourceCoordinates.coordinatesY,
          }}
          config={{
            arrowColor: "black",
            strokeWidth: 1.5,
            dotEndingBackground: "white",
            dotEndingRadius: 3,
            arrowHeadEndingSize: 6,
          }}
        />
      ) : null}
    </>
  );
}
