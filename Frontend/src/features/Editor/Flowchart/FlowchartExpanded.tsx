import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useGetAllTopologyBlocksByEpisodeId from "../PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import FlowchartTopologyBlockRemake from "./FlowchartTopologyBlockRemake";
import "./FlowchartStyles.css";

type FlowChartTypes = {
  hasScrollbar: boolean;
  expandFlowchart: boolean;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setShowScalePercentage: React.Dispatch<React.SetStateAction<boolean>>;
  scale: number;
};

export const SCROLLBAR_WIDTH = 17;

export default function FlowchartExpanded({
  hasScrollbar,
  expandFlowchart,
  scale,
  setScale,
  setShowScalePercentage,
}: FlowChartTypes) {
  const { episodeId } = useParams();
  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
    episodeId: episodeId ?? "",
  });

  const boundsRef = useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
      ref={boundsRef}
      className={`w-full rounded-md min-w-[500rem] min-h-[500rem] border-white border-[4px] border-dashed shadow-md relative bg-primary-pastel-blue`}
    >
      {allTopologyBlocks
        ? allTopologyBlocks.map((tb) => (
            <FlowchartTopologyBlockRemake
              key={tb._id}
              expandFlowchart={expandFlowchart}
              hasScrollbar={hasScrollbar}
              {...tb}
            />
          ))
        : null}
    </section>
  );
}
