import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";
import FlowchartTopologyBlockDragg from "./FlowchartTopologyBlockDragg";
import "./FlowchartStyles.css";

type FlowchartTopologyBlockTypes = {
  hasScrollbar: boolean;
  expandFlowchart: boolean;
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

  const [clicked, setClicked] = useState(false);
  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);

  return (
    <>
      {coordinates ? (
        <Draggable
          nodeRef={topologyBlockRef}
          defaultPosition={{
            x: coordinates.coordinatesX,
            y: coordinates.coordinatesY,
          }}
          position={{
            x: coordinates.coordinatesX,
            y: coordinates.coordinatesY,
          }}
          onStop={handleDragOnStop}
          bounds="parent"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (clicked) {
                setShowAllTopologyBlocks(true);
                setClicked(false);
              } else {
                setClicked(true);
                setTimeout(() => {
                  setClicked(false);
                }, 300);
              }
            }}
            ref={topologyBlockRef}
            className={`z-[20] w-[10rem] text-[2rem] rounded-md shadow-md absolute bg-white px-[1rem] py-[.5rem] active:cursor-move cursor-default whitespace-nowrap min-w-fit`}
          >
            <FlowchartTopologyBlockDragg
              _id={_id}
              name={name}
              episodeId={episodeId}
              setShowAllTopologyBlocks={setShowAllTopologyBlocks}
              showAllTopologyBlocks={showAllTopologyBlocks}
            />
          </div>
        </Draggable>
      ) : null}
    </>
  );
}
