import { useQuery } from "@tanstack/react-query";
import Flowchart from "./Flowchart/Flowchart";
import PlotField from "./PlotField/PlotField";
import { useParams } from "react-router-dom";
import { axiosCustomized } from "../../api/axios";
import { TopologyBlockTypes } from "../../types/TopologyBlock/TopologyBlockTypes";
import { useEffect, useState } from "react";

export default function EditorMain() {
  const { episodeId } = useParams();
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

  useEffect(() => {
    if (firstTopologyBlock) {
      setCurrentTopologyBlockId(firstTopologyBlock._id);
    }
  }, [firstTopologyBlock]);

  return (
    <main className="flex w-full">
      <PlotField topologyBlockId={currentTopologyBlockId} />
      <Flowchart />
    </main>
  );
}
