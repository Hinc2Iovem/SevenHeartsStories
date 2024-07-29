import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosCustomized } from "../../api/axios";
import useCheckKeysCombinationExpandPlotField from "../../hooks/helpers/useCheckKeysCombinationExpandPlotField";
import { TopologyBlockTypes } from "../../types/TopologyBlock/TopologyBlockTypes";
import Flowchart from "./Flowchart/Flowchart";
import PlotField from "./PlotField/PlotField";

export default function EditorMain() {
  const { episodeId } = useParams();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const keyCombinationToExpand = useCheckKeysCombinationExpandPlotField();

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
      {keyCombinationToExpand ? (
        <main className="flex w-full">
          <PlotField
            expandPlotField={keyCombinationToExpand === "expandPlotField"}
            topologyBlockId={currentTopologyBlockId}
          />
        </main>
      ) : (
        <main className="flex w-full">
          <PlotField topologyBlockId={currentTopologyBlockId} />
          <Flowchart
            expandPlotField={keyCombinationToExpand === "expandPlotField"}
            hasScrollbar={hasScrollbar}
          />
        </main>
      )}
    </>
  );
}
