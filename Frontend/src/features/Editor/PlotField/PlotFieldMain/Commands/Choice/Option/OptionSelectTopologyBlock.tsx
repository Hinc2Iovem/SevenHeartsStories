import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEscapeOfModal from "../../../../../../../hooks/UI/useEscapeOfModal";
import useUpdateChoiceOptionTopologyBlock from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionTopologyBlock";
import useGetAllTopologyBlocksByIdId from "../../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import useGetTopologyBlockById from "../../hooks/TopologyBlock/useGetTopologyBlockById";

type OptionSelecteTopologyBlockTypes = {
  topologyBlockId: string;
  choiceOptionId: string;
};

export default function OptionSelectTopologyBlock({
  topologyBlockId,
  choiceOptionId,
}: OptionSelecteTopologyBlockTypes) {
  const { episodeId } = useParams();
  const { data: topologyBlock } = useGetTopologyBlockById({ topologyBlockId });
  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);
  const [currentTopologyBlockName, setCurrentTopologyBlockName] = useState("");

  useEffect(() => {
    if (topologyBlock) {
      setCurrentTopologyBlockName(topologyBlock?.name || "");
    }
  }, [topologyBlock]);

  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByIdId({
    episodeId: episodeId ?? "",
  });
  const updateOptionTopologyBlock = useUpdateChoiceOptionTopologyBlock({
    choiceOptionId,
  });

  useEscapeOfModal({
    setValue: setShowAllTopologyBlocks,
    value: showAllTopologyBlocks,
  });
  return (
    <div className="relative">
      <button
        onClick={() => setShowAllTopologyBlocks((prev) => !prev)}
        className="text-[1.3rem] outline-gray-300 text-gray-700 shadow-md rounded-md px-[1rem] py-[.5rem]"
        type="button"
      >
        {currentTopologyBlockName ?? "Текущая Ветка"}
      </button>
      <aside
        className={`${
          showAllTopologyBlocks ? "" : "hidden"
        } z-[10] flex flex-col gap-[1rem] p-[.5rem] absolute min-w-fit w-full rounded-md shadow-md bg-white right-[0rem] translate-y-[.5rem]`}
      >
        {allTopologyBlocks?.map((tb) => (
          <button
            key={tb._id}
            type="button"
            onClick={() => {
              setShowAllTopologyBlocks(false);
              setCurrentTopologyBlockName(tb?.name || "");
              updateOptionTopologyBlock.mutate({ topologyBlockId: tb._id });
            }}
            className={`${topologyBlockId === tb._id ? "hidden" : ""} ${
              tb.isStartingTopologyBlock ? "hidden" : ""
            } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
          >
            {tb.name}
          </button>
        ))}
      </aside>
    </div>
  );
}
