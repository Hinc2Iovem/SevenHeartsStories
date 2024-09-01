import { useEffect, useRef, useState } from "react";
import useGetCommandCall from "../hooks/Call/useGetCommandCall";
import useUpdateCallText from "../hooks/Call/useUpdateCallText";
import useGetTopologyBlockById from "../hooks/TopologyBlock/useGetTopologyBlockById";
import useGetAllTopologyBlocksByEpisodeId from "../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../hooks/UI/useOutOfModal";

type CommandCallFieldTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  command: string;
};

export default function CommandCallField({
  plotFieldCommandId,
  topologyBlockId,
  command,
}: CommandCallFieldTypes) {
  const { episodeId } = useParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const [nameValue] = useState<string>(command ?? "Call");

  const { data: commandCall } = useGetCommandCall({
    plotFieldCommandId,
    topologyBlockId,
  });
  const [commandCallId, setCommandCallId] = useState("");
  const [targetBlockId, setTargetBlockId] = useState("");
  const [currentTopologyBlockName, setCurrentTopologyBlockName] = useState("");

  const { data: currentTopologyBlock } = useGetTopologyBlockById({
    topologyBlockId: targetBlockId,
  });

  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId: episodeId ?? "",
  });

  const [showAllTopologyBlocks, setShowAllTopologyBlocks] = useState(false);

  useEffect(() => {
    if (currentTopologyBlock) {
      setCurrentTopologyBlockName(currentTopologyBlock?.name || "");
    }
  }, [currentTopologyBlock]);

  useEffect(() => {
    if (commandCall) {
      setCommandCallId(commandCall._id);
      setTargetBlockId(commandCall.targetBlockId);
    }
  }, [commandCall]);

  const updateCallText = useUpdateCallText({
    callId: commandCallId,
    sourceBlockId: topologyBlockId,
    targetBlockId,
    episodeId: episodeId || "",
  });

  useEffect(() => {
    if (
      commandCall?.targetBlockId !== targetBlockId &&
      targetBlockId?.trim().length
    ) {
      updateCallText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetBlockId]);

  useOutOfModal({
    modalRef,
    setShowModal: setShowAllTopologyBlocks,
    showModal: showAllTopologyBlocks,
  });

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>
      <div className="relative">
        <button
          className="text-[1.3rem] bg-white rounded-md shadow-md text-gray-700 px-[1rem] py-[.5rem]"
          onClick={(e) => {
            e.stopPropagation();
            setShowAllTopologyBlocks((prev) => !prev);
          }}
        >
          {currentTopologyBlockName || "Блок"}
        </button>
        <aside
          ref={modalRef}
          className={`${
            showAllTopologyBlocks ? "" : "hidden"
          } z-[10] flex flex-col gap-[1rem] p-[.5rem] max-h-[15rem] overflow-y-auto absolute min-w-fit w-full rounded-md shadow-md bg-white right-[0rem] translate-y-[.5rem] | containerScroll`}
        >
          {allTopologyBlocks?.map((tb) => (
            <button
              key={tb._id}
              type="button"
              onClick={() => {
                setShowAllTopologyBlocks(false);
                setTargetBlockId(tb._id);
                setCurrentTopologyBlockName(tb?.name || "");
              }}
              className={`${topologyBlockId === tb._id ? "hidden" : ""} ${
                tb._id === targetBlockId ? "hidden" : ""
              } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md`}
            >
              {tb.name}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
