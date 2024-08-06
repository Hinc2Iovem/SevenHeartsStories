import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";
import { useCoordinates } from "./Context/useCoordinates";
import FlowchartTopologyBlockDrag from "./FlowchartTopologyBlockDrag";
import "./FlowchartStyles.css";

export default function FlowchartTopologyBlock({
  _id,
  coordinatesX,
  coordinatesY,
  episodeId,
  name,
}: TopologyBlockTypes) {
  const {
    setCoordinates: setCoordinatesGlobal,
    coordinatesX: currentCoordinatesX,
    _id: currentId,
    coordinatesY: currentCoordinatesY,
  } = useCoordinates();

  const topologyBlockRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>({
    coordinatesX,
    coordinatesY,
  });

  useEffect(() => {
    if (coordinatesX && coordinatesY) {
      setCoordinates({
        coordinatesX,
        coordinatesY,
      });
    }
  }, [coordinatesX, coordinatesY]);

  useEffect(() => {
    if (_id === currentId) {
      setCoordinates({
        coordinatesX: currentCoordinatesX,
        coordinatesY: currentCoordinatesY,
      });
    }
  }, [_id, currentId, currentCoordinatesX, currentCoordinatesY]);

  const updateCoordinates = useUpdateTopologyBlockCoordinates({
    topologyBlockId: _id,
  });

  const handleDragOnStop = (_e: DraggableEvent, ui: DraggableData) => {
    setCoordinatesGlobal({ _id, coordinatesX: ui.x, coordinatesY: ui.y });
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
            className={`${
              showAllTopologyBlocks ? "z-[2]" : "z-[1]"
            } w-[10rem] text-[2rem] rounded-md shadow-md absolute bg-white px-[1rem] py-[.5rem] active:cursor-move cursor-default whitespace-nowrap min-w-fit`}
          >
            <FlowchartTopologyBlockDrag
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
