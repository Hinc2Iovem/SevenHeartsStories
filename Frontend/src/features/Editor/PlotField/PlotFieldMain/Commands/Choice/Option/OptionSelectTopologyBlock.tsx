import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../../hooks/UI/useOutOfModal";
import useUpdateChoiceOptionTopologyBlock from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionTopologyBlock";
import useGetAllTopologyBlocksByEpisodeId from "../../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import useGetTopologyBlockById from "../../hooks/TopologyBlock/useGetTopologyBlockById";

type OptionSelecteTopologyBlockTypes = {
  setShowAllTopologyBlocks: React.Dispatch<React.SetStateAction<boolean>>;
  topologyBlockId: string;
  choiceOptionId: string;
  showAllTopologyBlocks: boolean;
  setTopologyBlockId: React.Dispatch<React.SetStateAction<string>>;
  currentTopologyBlockId: string;
};

export default function OptionSelectTopologyBlock({
  topologyBlockId,
  choiceOptionId,
  setShowAllTopologyBlocks,
  showAllTopologyBlocks,
  setTopologyBlockId,
  currentTopologyBlockId,
}: OptionSelecteTopologyBlockTypes) {
  const { episodeId } = useParams();
  const { data: topologyBlock } = useGetTopologyBlockById({ topologyBlockId });
  const [currentTopologyBlockName, setCurrentTopologyBlockName] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topologyBlock) {
      setCurrentTopologyBlockName(topologyBlock?.name || "");
    }
  }, [topologyBlock]);

  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId: episodeId ?? "",
  });
  const updateOptionTopologyBlock = useUpdateChoiceOptionTopologyBlock({
    choiceOptionId,
  });

  useOutOfModal({
    modalRef,
    setShowModal: setShowAllTopologyBlocks,
    showModal: showAllTopologyBlocks,
  });

  return (
    <div className="relative ml-auto pr-[.2rem] pb-[.2rem]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowAllTopologyBlocks((prev) => !prev);
        }}
        className="text-[1.3rem] self-end outline-gray-300 text-gray-700 shadow-md rounded-md px-[1rem] py-[.5rem]"
        type="button"
      >
        {currentTopologyBlockName || "Текущая Ветка"}
      </button>
      <aside
        ref={modalRef}
        className={`${
          showAllTopologyBlocks ? "" : "hidden"
        } overflow-y-auto max-h-[15rem] z-[10] flex flex-col gap-[1rem] p-[.5rem] absolute min-w-fit w-full rounded-md shadow-md bg-white right-[0rem] translate-y-[.5rem] | containerScroll`}
      >
        {(topologyBlockId && (allTopologyBlocks?.length || 0) > 1) ||
        (!topologyBlockId && allTopologyBlocks?.length) ? (
          allTopologyBlocks?.map((tb) => (
            <button
              key={tb._id}
              type="button"
              onClick={() => {
                setShowAllTopologyBlocks(false);
                setCurrentTopologyBlockName(tb?.name || "");
                setTopologyBlockId(tb._id);
                updateOptionTopologyBlock.mutate({ topologyBlockId: tb._id });
              }}
              className={`${topologyBlockId === tb._id ? "hidden" : ""} ${
                currentTopologyBlockId === tb._id ? "hidden" : ""
              } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
            >
              {tb.name}
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowAllTopologyBlocks(false);
            }}
            className={` px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
          >
            Пусто
          </button>
        )}
      </aside>
    </div>
  );
}
