import { useRef } from "react";
import useOutOfModal from "../../../hooks/UI/useOutOfModal";
import useCreateTopologyBlockConnection from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useCreateTopologyBlockConnection";
import useGetAllTopologyBlocksByEpisodeId from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";

type FlowchartTopologyBlockDraggProps = {
  episodeId: string;
  name: string | undefined;
  _id: string;
  setShowAllTopologyBlocks: React.Dispatch<React.SetStateAction<boolean>>;
  showAllTopologyBlocks: boolean;
};

export default function FlowchartTopologyBlockDragg({
  _id,
  episodeId,
  name,
  setShowAllTopologyBlocks,
  showAllTopologyBlocks,
}: FlowchartTopologyBlockDraggProps) {
  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutOfModal({
    modalRef,
    setShowModal: setShowAllTopologyBlocks,
    showModal: showAllTopologyBlocks,
  });

  const createConnectionTopologyBlocks = useCreateTopologyBlockConnection({
    sourceBlockId: _id,
    episodeId,
  });

  return (
    <>
      {name || "Forgot Name"}
      <aside
        ref={modalRef}
        className={`${
          showAllTopologyBlocks ? "" : "hidden"
        } px-[1rem] py-[.5rem] flex flex-col gap-[1rem] min-w-fit bg-white rounded-md shadow-md text-[2rem] absolute translate-y-[1rem] translate-x-[-1rem] max-h-[15rem] overflow-auto | containerScroll`}
      >
        {allTopologyBlocks
          ? allTopologyBlocks.map((tb) => (
              <button
                onClick={() => {
                  setShowAllTopologyBlocks(false);
                  createConnectionTopologyBlocks.mutate({
                    targetBlockId: tb._id,
                  });
                }}
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
    </>
  );
}
