import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";
import FlowchartTopologyBlockDrag from "./FlowchartTopologyBlockDrag";
import useCoordinates from "./Context/useCoordinates";
import "./FlowchartStyles.css";

type FlowchartTopologyBlockTypes = {
  setCurrentTopologyBlockId: React.Dispatch<React.SetStateAction<string>>;
  currentTopologyBlockId: string;
} & TopologyBlockTypes;

export default function FlowchartTopologyBlock({
  _id,
  coordinatesX,
  coordinatesY,
  episodeId,
  name,
  setCurrentTopologyBlockId,
  currentTopologyBlockId,
}: FlowchartTopologyBlockTypes) {
  const { coordinates, setCoordinates } = useCoordinates();

  const topologyBlockRef = useRef<HTMLDivElement>(null);
  const [localCoordinates, setLocalCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>({
    coordinatesX,
    coordinatesY,
  });

  useEffect(() => {
    if (coordinatesX && coordinatesY) {
      setLocalCoordinates({ coordinatesX, coordinatesY });
    }
  }, [coordinatesX, coordinatesY]);

  useEffect(() => {
    if (_id === coordinates._id) {
      setLocalCoordinates({
        coordinatesX: coordinates.coordinatesX,
        coordinatesY: coordinates.coordinatesY,
      });
    }
  }, [_id, coordinates]);

  const updateCoordinates = useUpdateTopologyBlockCoordinates({
    topologyBlockId: _id,
  });

  const handleDragOnStop = (_e: DraggableEvent, ui: DraggableData) => {
    setCoordinates({ _id, coordinatesX: ui.x, coordinatesY: ui.y });
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
            x: localCoordinates?.coordinatesX || 0,
            y: localCoordinates?.coordinatesY || 0,
          }}
          position={{
            x: localCoordinates?.coordinatesX || 0,
            y: localCoordinates?.coordinatesY || 0,
          }}
          onStop={handleDragOnStop}
          bounds="parent"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem(`${episodeId}-topologyBlockId`, _id);
              if (clicked) {
                setCurrentTopologyBlockId((prev) => {
                  if (prev !== _id) {
                    return _id;
                  } else {
                    return prev;
                  }
                });
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
            className={`${showAllTopologyBlocks ? "z-[2]" : "z-[1]"} ${
              currentTopologyBlockId === _id
                ? "bg-green-300 text-white"
                : "bg-white "
            } w-[10rem] text-[2rem] rounded-md shadow-md absolute px-[1rem] py-[.5rem] active:cursor-move cursor-default whitespace-nowrap min-w-fit`}
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
