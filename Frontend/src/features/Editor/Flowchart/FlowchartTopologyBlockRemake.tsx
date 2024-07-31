import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TopologyBlockTypes } from "../../../types/TopologyBlock/TopologyBlockTypes";
import useUpdateTopologyBlockCoordinates from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useUpdateTopologyBlockCoordinates";
import useOutOfModal from "../../../hooks/UI/useOutOfModal";
import useGetAllTopologyBlocksByEpisodeId from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
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
  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId,
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

  const [clicked, setClicked] = useState(false);

  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutOfModal({
    modalRef,
    setShowModal: setShowAllTopologyBlocks,
    showModal: showAllTopologyBlocks,
  });
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
          <div className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (clicked) {
                  console.log("lol");
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
              className={`w-[10rem] text-[2rem] rounded-md shadow-md absolute bg-white px-[1rem] py-[.5rem] active:cursor-move cursor-default whitespace-nowrap min-w-fit`}
            >
              {name || "Forgot Name"}
            </div>
            <aside
              ref={modalRef}
              className={`${
                showAllTopologyBlocks ? "" : "hidden"
              } px-[1rem] py-[.5rem] flex flex-col gap-[1rem] min-w-fit bg-white rounded-md shadow-md text-[2rem] absolute translate-y-[4.5rem] max-h-[15rem] overflow-auto | containerScroll`}
            >
              {allTopologyBlocks
                ? allTopologyBlocks.map((tb) => (
                    <button
                      className={`${
                        tb._id === _id ? "hidden" : ""
                      } text-gray-700 bg-white hover:text-white hover:bg-primary-pastel-blue transition-all px-[1rem] py-[.5rem] outline-gray-300 rounded-md hover:shadow-md`}
                      key={tb._id}
                    >
                      {tb.name || `Нету имени`}
                    </button>
                  ))
                : "Нету"}
            </aside>
          </div>
        </Draggable>
      ) : null}
    </>
  );
}
