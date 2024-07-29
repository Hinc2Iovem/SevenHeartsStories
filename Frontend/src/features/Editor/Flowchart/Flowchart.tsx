import { useRef } from "react";
import { useParams } from "react-router-dom";
import useCreateTopologyBlock from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useCreateTopologyBlock";
import useGetAllTopologyBlocksByEpisodeId from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import FlowchartTopologyBlock from "./FlowchartTopologyBlock";

type FlowChartTypes = {
  hasScrollbar: boolean;
  expandPlotField: boolean;
};

export const SCROLLBAR_WIDTH = 17;

export default function Flowchart({
  hasScrollbar,
  expandPlotField,
}: FlowChartTypes) {
  const { episodeId } = useParams();
  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId: episodeId ?? "",
  });

  const boundsRef = useRef<HTMLDivElement>(null);

  const createTopologyBlock = useCreateTopologyBlock({
    episodeId: episodeId ?? "",
  });

  return (
    <section className="w-1/2 bg-white shadow-md overflow-x-auto">
      <div ref={boundsRef} className="w-[300rem] bg-black relative">
        {allTopologyBlocks
          ? allTopologyBlocks.map((tb) => (
              <FlowchartTopologyBlock
                key={tb._id}
                {...tb}
                expandPlotField={expandPlotField}
                hasScrollbar={hasScrollbar}
                ref={boundsRef}
              />
            ))
          : null}
      </div>
      <button
        onClick={() => createTopologyBlock.mutate()}
        className="fixed active:scale-[0.98] text-[1.3rem] transition-all bg-primary-pastel-blue hover:bg-primary-light-blue text-white shadow-md px-[1rem] py-[.5rem] rounded-md bottom-[1rem] translate-x-[1rem]"
      >
        Создать Блок
      </button>
    </section>
  );
}
