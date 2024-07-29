import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosCustomized } from "../../api/axios";
import useCheckKeysCombinationExpandPlotField from "../../hooks/helpers/useCheckKeysCombinationExpandPlotField";
import { TopologyBlockTypes } from "../../types/TopologyBlock/TopologyBlockTypes";
import Flowchart from "./Flowchart/Flowchart";
import PlotField from "./PlotField/PlotField";
import useCheckKeysCombinationExpandFlowchart from "../../hooks/helpers/useCheckKeysCombinationExpandFlowchart";

export default function EditorMain() {
  const { episodeId } = useParams();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const keyCombinationToExpandPlotField =
    useCheckKeysCombinationExpandPlotField();
  const keyCombinationToExpandFlowChart =
    useCheckKeysCombinationExpandFlowchart();

  console.log(
    "keyCombinationToExpandFlowChart: ",
    keyCombinationToExpandFlowChart
  );

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
          className={`flex w-full min-h-[calc(100vh-7rem)] shadow-md rounded-md justify-center`}
        >
          <Flowchart
            expandPlotField={
              keyCombinationToExpandFlowChart === "expandFlowchart"
            }
            hasScrollbar={hasScrollbar}
          />
        </main>
      ) : (
        <main className={`flex w-full min-h-[calc(100vh-7rem)] justify-center`}>
          <PlotField topologyBlockId={currentTopologyBlockId} />
          <Flowchart
            expandPlotField={
              keyCombinationToExpandPlotField === "expandPlotField"
            }
            hasScrollbar={hasScrollbar}
          />
        </main>
      )}
    </>
  );
}
