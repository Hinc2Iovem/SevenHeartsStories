import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import { ConditionBlockTypes } from "../../../../../../types/StoryEditor/PlotField/Condition/ConditionTypes";
import useUpdateConditionBlockTopologyBlockId from "../hooks/Condition/ConditionBlock/useUpdateConditionBlockTopologyBlockId";
import useGetConditionValueByConditionBlockId from "../hooks/Condition/ConditionValue/useGetAllConditionValuesByConditionBlockId";
import useGetAllTopologyBlocksByEpisodeId from "../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import useGetTopologyBlockById from "../hooks/TopologyBlock/useGetTopologyBlockById";
import ConditionValueItem from "./ConditionValueItem";
import DisplayOrderOfIfsModal from "./DisplayOrderOfIfsModal";

type ConditionBlockItemTypes = {
  amountOfIfBlocks?: number;
  allUsedOrderNumbers?: number[];
} & ConditionBlockTypes;

export default function ConditionBlockItem({
  _id,
  targetBlockId,
  isElse,
  amountOfIfBlocks,
  orderOfExecution,
  conditionId,
  allUsedOrderNumbers,
}: ConditionBlockItemTypes) {
  const { episodeId } = useParams();
  const [currentOrder, setCurrentOrder] = useState(orderOfExecution || null);

  const { data: topologyBlock } = useGetTopologyBlockById({
    topologyBlockId: targetBlockId,
  });
  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);
  const [currentTopologyBlockName, setCurrentTopologyBlockName] = useState("");
  const [newTopologyBlockId, setNewTopologyBlockId] = useState("");

  useEffect(() => {
    if (topologyBlock) {
      setCurrentTopologyBlockName(topologyBlock?.name || "");
    }
  }, [topologyBlock]);

  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId: episodeId ?? "",
  });

  useEscapeOfModal({
    setValue: setShowAllTopologyBlocks,
    value: showAllTopologyBlocks,
  });

  const { data: conditionValues } = useGetConditionValueByConditionBlockId({
    conditionBlockId: _id,
  });
  const updateTopologyBlock = useUpdateConditionBlockTopologyBlockId({
    conditionBlockId: _id,
    topologyBlockId: newTopologyBlockId,
  });

  useEffect(() => {
    if (newTopologyBlockId?.trim().length) {
      updateTopologyBlock.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTopologyBlockId]);

  return (
    <>
      {!isElse ? (
        <div
          className={`p-[1rem] flex flex-col gap-[1rem] w-full bg-white rounded-md shadow-md`}
        >
          {conditionValues?.map((cv) => (
            <ConditionValueItem key={cv._id} {...cv} />
          ))}

          <div className="relative w-full flex justify-between flex-wrap gap-[1rem]">
            <DisplayOrderOfIfsModal
              conditionBlockId={_id}
              allUsedOrderNumbers={allUsedOrderNumbers || []}
              commandConditionId={conditionId}
              setCurrentOrder={setCurrentOrder}
              currentOrder={currentOrder}
              amountOfIfBlocks={amountOfIfBlocks || 0}
            />
            <button
              onClick={() => setShowAllTopologyBlocks((prev) => !prev)}
              className="flex-grow text-[1.4rem] outline-gray-300 text-gray-700 shadow-md rounded-md px-[1rem] py-[.5rem]"
              type="button"
            >
              {currentTopologyBlockName || "Текущая Ветка"}
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
                    setNewTopologyBlockId(tb._id);
                  }}
                  className={`${targetBlockId === tb._id ? "hidden" : ""} ${
                    tb.isStartingTopologyBlock ? "hidden" : ""
                  } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
                >
                  {tb.name}
                </button>
              ))}
            </aside>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-[1rem] w-full bg-white rounded-md shadow-md`}
        >
          <div className="relative self-end w-full flex-grow">
            <button
              onClick={() => setShowAllTopologyBlocks((prev) => !prev)}
              className="w-full flex-grow text-[1.4rem] outline-gray-300 text-gray-700 shadow-md rounded-md px-[1rem] py-[.5rem]"
              type="button"
            >
              {currentTopologyBlockName || "Текущая Ветка"}
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
                    setNewTopologyBlockId(tb._id);
                  }}
                  className={`${targetBlockId === tb._id ? "hidden" : ""} ${
                    tb.isStartingTopologyBlock ? "hidden" : ""
                  } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
                >
                  {tb.name}
                </button>
              ))}
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
