import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosCustomized } from "../../api/axios";
import useCheckKeysCombinationExpandFlowchart from "../../hooks/helpers/useCheckKeysCombinationExpandFlowchart";
import useCheckKeysCombinationExpandPlotField from "../../hooks/helpers/useCheckKeysCombinationExpandPlotField";
import { TopologyBlockTypes } from "../../types/TopologyBlock/TopologyBlockTypes";
import Flowchart from "./Flowchart/Flowchart";
import PlotField from "./PlotField/PlotField";
import useCreateTopologyBlock from "./PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useCreateTopologyBlock";
import FlowchartExpanded from "./Flowchart/FlowchartExpanded";
import "./Flowchart/FlowchartStyles.css";

export default function EditorMain() {
  const { episodeId } = useParams();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const keyCombinationToExpandPlotField =
    useCheckKeysCombinationExpandPlotField();
  const keyCombinationToExpandFlowChart =
    useCheckKeysCombinationExpandFlowchart();

  const [scale, setScale] = useState(1);
  const [showScalePercentage, setShowScalePercentage] = useState(false);

  const { data: firstTopologyBlock } = useQuery({
    queryKey: ["editor", "episode", episodeId, "firstTopologyBlock"],
    queryFn: async () =>
      await axiosCustomized
        .get<TopologyBlockTypes>(
          `/topologyBlocks/episodes/${episodeId}/firstBlock`
        )
        .then((r) => r.data),
  });
  const [currentTopologyBlockId, setCurrentTopologyBlockId] = useState(
    firstTopologyBlock?._id ?? ""
  );

  const checkScrollbarPresence = () => {
    const hasScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;
    setHasScrollbar(hasScrollbar);
  };

  useEffect(() => {
    if (firstTopologyBlock) {
      setCurrentTopologyBlockId(firstTopologyBlock._id);
    }
    checkScrollbarPresence();
  }, [firstTopologyBlock]);

  const createTopologyBlock = useCreateTopologyBlock({
    episodeId: episodeId ?? "",
  });

  return (
    <>
      {keyCombinationToExpandPlotField ? (
        <main className={`flex w-full min-h-[calc(100vh-7rem)] justify-center`}>
          <PlotField
            expandPlotField={
              keyCombinationToExpandPlotField === "expandPlotField"
            }
            topologyBlockId={currentTopologyBlockId}
          />
        </main>
      ) : keyCombinationToExpandFlowChart ? (
        <main
          className={`max-w-full h-[calc(100vh-7rem)] overflow-auto shadow-md rounded-md bg-primary-light-blue relative | containerScroll`}
        >
          <div className="min-w-[500rem] min-h-[500rem] absolute w-full h-full border-[3px] border-gray-400 border-dashed">
            <div className="absolute bg-white left-[calc(50%-.2rem)] w-[.4rem] min-h-[500rem] h-full"></div>
            <div className="absolute bg-white left-[calc(50%-.2rem)] w-[.4rem] min-h-[500rem] h-full rotate-90"></div>
          </div>
          <div
            className={`${
              showScalePercentage ? "" : "hidden"
            } fixed z-[2] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md top-[6.8rem] translate-x-[.5rem]`}
          >
            {(scale * 100).toFixed(0)}%
          </div>

          <FlowchartExpanded
            scale={scale}
            setScale={setScale}
            setShowScalePercentage={setShowScalePercentage}
            expandFlowchart={
              keyCombinationToExpandFlowChart === "expandFlowchart"
            }
            hasScrollbar={hasScrollbar}
          />

          <button
            onClick={() => createTopologyBlock.mutate()}
            className="fixed active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md bottom-[2rem] translate-x-[1rem]"
          >
            Создать Блок
          </button>
        </main>
      ) : (
        <main
          className={`flex w-full min-h-[calc(100vh-7rem)] justify-center relative`}
        >
          <PlotField topologyBlockId={currentTopologyBlockId} />
          <div
            className={`${
              showScalePercentage ? "" : "hidden"
            } fixed top-[1rem] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md translate-x-[calc(50%+1rem)] z-[10]`}
          >
            {(scale * 100).toFixed(0)}%
          </div>

          <Flowchart
            scale={scale}
            setScale={setScale}
            setShowScalePercentage={setShowScalePercentage}
            expandFlowchart={
              keyCombinationToExpandFlowChart === "expandFlowchart"
            }
            hasScrollbar={hasScrollbar}
          />

          <button
            onClick={() => createTopologyBlock.mutate()}
            className="fixed active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md bottom-[1rem] translate-x-[calc(50%+1rem)] z-[10]"
          >
            Создать Блок
          </button>
        </main>
      )}
    </>
  );
}
