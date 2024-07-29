import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";

type FlowchartTopologyBlockTypes = {
  hasScrollbar: boolean;
  expandPlotField: boolean;
} & TopologyBlockTypes;

export default function FlowchartTopologyBlock({
  _id,
  coordinatesX,
  coordinatesY,
  episodeId,
  name,
}: FlowchartTopologyBlockTypes) {
  const topologyBlockRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>({
    coordinatesX,
    coordinatesY,
  });

  const updateCoordinates = useUpdateTopologyBlockCoordinates({
    topologyBlockId: _id,
    episodeId: episodeId ?? "",
  });

  const handleDragOnStop = (_e: DraggableEvent, ui: DraggableData) => {
    setCoordinates({
      coordinatesX: ui.x,
      coordinatesY: ui.y,
    });
    updateCoordinates.mutate({
      coordinatesX: ui.x,
      coordinatesY: ui.y,
    });
  };
  return (
    <>
      {coordinates ? (
        <Draggable
          nodeRef={topologyBlockRef}
          defaultPosition={{
            x: coordinates.coordinatesX,
            y: coordinates.coordinatesY,
          }}
          onStop={handleDragOnStop}
          bounds="parent"
        >
          <div
            ref={topologyBlockRef}
            className={`w-[10rem] rounded-md shadow-md text-[2rem] absolute bg-white px-[1rem] py-[.5rem] active:cursor-move cursor-default whitespace-nowrap min-w-fit`}
          >
            {name || "Forgot Name"}
          </div>
        </Draggable>
      ) : null}
    </>
  );
}
