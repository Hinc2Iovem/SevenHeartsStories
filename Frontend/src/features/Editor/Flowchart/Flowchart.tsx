import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useCreateTopologyBlock from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useCreateTopologyBlock";
import useGetAllTopologyBlocksByEpisodeId from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import FlowchartTopologyBlockRemake from "./FlowchartTopologyBlockRemake";
import "./FlowchartStyles.css";

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
  const [scale, setScale] = useState(1);
  const [showScalePercentage, setShowScalePercentage] = useState(false);
  const boundsRef = useRef<HTMLDivElement>(null);

  const createTopologyBlock = useCreateTopologyBlock({
    episodeId: episodeId ?? "",
  });

  const handleZoom = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.1), 3));
    }
  };

  useEffect(() => {
    const bounds = boundsRef.current;
    if (bounds) {
      bounds.addEventListener("wheel", handleZoom);
      setShowScalePercentage(true);
      return () => {
        setShowScalePercentage(false);
        bounds.removeEventListener("wheel", handleZoom);
      };
    }
  }, []);

  return (
    <section
      className={`${
        expandPlotField ? "w-full rounded-md" : "w-1/2"
      } bg-white shadow-md overflow-auto relative h-full | container`}
    >
      <div
        className={`${
          showScalePercentage ? "" : "hidden"
        } fixed z-[2] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md top-[6.5rem] right-[1.5rem]`}
      >
        {(scale * 100).toFixed(0)}%
      </div>
      <div
        ref={boundsRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
        className="min-w-[500rem] min-h-[500rem] bg-primary-pastel-blue relative h-full w-full box-content pr-[1.7rem]"
      >
        {allTopologyBlocks
          ? allTopologyBlocks.map((tb) => (
              <FlowchartTopologyBlockRemake
                key={tb._id}
                expandPlotField={expandPlotField}
                hasScrollbar={hasScrollbar}
                {...tb}
              />
            ))
          : null}
      </div>
      <button
        onClick={() => createTopologyBlock.mutate()}
        className="fixed active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md bottom-[1rem] translate-x-[1rem]"
      >
        Создать Блок
      </button>
    </section>
  );
}
