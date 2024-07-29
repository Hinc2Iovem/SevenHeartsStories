import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";
import { SCROLLBAR_WIDTH } from "./Flowchart";

type FlowchartTopologyBlockTypes = {
  hasScrollbar: boolean;
  expandPlotField: boolean;
} & TopologyBlockTypes;

const FlowchartTopologyBlock = forwardRef<
  HTMLDivElement,
  FlowchartTopologyBlockTypes
>(function FlowchartTopologyBlock(
  {
    _id,
    coordinatesX,
    coordinatesY,
    episodeId,
    name,
    hasScrollbar,
    expandPlotField,
  },
  ref
) {
  const [resized, setResized] = useState(false);
  const topologyBlockRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    coordinatesX: number;
    coordinatesY: number;
  } | null>(null);
  const [blockWidth, setBlockWidth] = useState(0);

  const recalculateCoordinates = () => {
    if (ref && "current" in ref && ref.current) {
      let widthOfSection = ref.current.clientWidth;
      if (hasScrollbar) {
        widthOfSection -= SCROLLBAR_WIDTH;
      }
      const onePercentValue = widthOfSection / 100;
      const coordinatesXResult = coordinatesX * onePercentValue;

      setCoordinates({
        coordinatesX:
          coordinatesXResult + blockWidth >= widthOfSection
            ? widthOfSection - blockWidth
            : coordinatesXResult,
        coordinatesY,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => setResized(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resizeBlockWidth = () => {
    if (ref && "current" in ref && ref.current) {
      let widthOfSection = ref.current?.clientWidth || 0;
      if (hasScrollbar) {
        widthOfSection -= SCROLLBAR_WIDTH;
      }
      const newBlockWidth = widthOfSection * 0.1;
      setBlockWidth(newBlockWidth > 50 ? newBlockWidth : 50);
    }
  };

  useLayoutEffect(() => {
    if (resized) {
      resizeBlockWidth();
      recalculateCoordinates();
      setResized(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resized]);

  useLayoutEffect(() => {
    resizeBlockWidth();
    if (blockWidth) {
      recalculateCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockWidth, expandPlotField]);

  const updateCoordinates = useUpdateTopologyBlockCoordinates({
    topologyBlockId: _id,
    episodeId: episodeId ?? "",
  });

  const handleDragOnStop = (_e: DraggableEvent, ui: DraggableData) => {
    if (ref && "current" in ref && ref.current && topologyBlockRef.current) {
      let widthOfSection = ref.current.clientWidth;
      if (hasScrollbar) {
        widthOfSection -= SCROLLBAR_WIDTH;
      }
      const onePercentValue = widthOfSection / 100;
      const positionOfTopologyBlockPercentage =
        ui.x + blockWidth >= widthOfSection ? 100 : ui.x / onePercentValue;

      setCoordinates({
        coordinatesX: positionOfTopologyBlockPercentage,
        coordinatesY: ui.y,
      });
      updateCoordinates.mutate({
        coordinatesX: positionOfTopologyBlockPercentage,
        coordinatesY: ui.y,
      });
    }
  };

  return (
    <>
      {coordinates && !resized ? (
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
            style={{ width: `${blockWidth}px` }}
            className={`text-[1.4rem] absolute bg-red-300 active:cursor-move cursor-default whitespace-nowrap`}
          >
            {name || "Забыл имя"}
          </div>
        </Draggable>
      ) : null}
    </>
  );
});

export default FlowchartTopologyBlock;
