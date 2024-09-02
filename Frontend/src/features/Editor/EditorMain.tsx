import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PossibleCommandsCreatedByCombinationOfKeysTypes } from "../../const/COMMANDS_CREATED_BY_KEY_COMBINATION";
import useCheckKeysCombinationExpandFlowchart from "../../hooks/helpers/useCheckKeysCombinationExpandFlowchart";
import useCheckKeysCombinationExpandPlotField from "../../hooks/helpers/useCheckKeysCombinationExpandPlotField";
import Flowchart from "./Flowchart/Flowchart";
import "./Flowchart/FlowchartStyles.css";
import PlotField from "./PlotField/PlotField";
import useGetFirstTopologyBlock from "./PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetFirstTopologyBlock";
import { CoordinatesProvider } from "./Flowchart/Context/CoordinatesContext";

type EditorMainTypes = {
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditorMain({ setShowHeader }: EditorMainTypes) {
  const { episodeId } = useParams();
  const [command, setCommand] =
    useState<PossibleCommandsCreatedByCombinationOfKeysTypes>(
      "" as PossibleCommandsCreatedByCombinationOfKeysTypes
    );

  const keyCombinationToExpandPlotField =
    useCheckKeysCombinationExpandPlotField({ setCommand, command });
  const keyCombinationToExpandFlowChart =
    useCheckKeysCombinationExpandFlowchart({ setCommand, command });

  const [scale, setScale] = useState(1);

  const { data: firstTopologyBlock } = useGetFirstTopologyBlock({
    episodeId: episodeId || "",
  });

  const [localTopologyBlockId] = useState(
    localStorage.getItem(`${episodeId}-topologyBlockId`)
  );

  const [currentTopologyBlockId, setCurrentTopologyBlockId] = useState(
    firstTopologyBlock?._id || ""
  );

  // const checkScrollbarPresence = () => {
  //   const hasScrollbar =
  //     document.documentElement.scrollHeight > window.innerHeight;
  //   setHasScrollbar(hasScrollbar);
  // };

  useEffect(() => {
    if (localTopologyBlockId) {
      setCurrentTopologyBlockId(localTopologyBlockId);
    } else if (firstTopologyBlock) {
      setCurrentTopologyBlockId(firstTopologyBlock._id);
    }
  }, [firstTopologyBlock, localTopologyBlockId]);

  return (
    <>
      <main
        className={`flex w-full h-[calc(100vh-2.30rem)] justify-center relative`}
      >
        <PlotField
          setShowHeader={setShowHeader}
          topologyBlockId={currentTopologyBlockId}
          keyCombinationToExpandPlotField={keyCombinationToExpandPlotField}
        />
        <div
          className={`${
            keyCombinationToExpandPlotField === "expandPlotField"
              ? "hidden"
              : ""
          } fixed top-[2rem] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md translate-x-[calc(50%+1rem)] z-[10]`}
        >
          {(scale * 100).toFixed(0)}%
        </div>
        <CoordinatesProvider>
          <Flowchart
            currentTopologyBlockId={currentTopologyBlockId}
            setCurrentTopologyBlockId={setCurrentTopologyBlockId}
            keyCombinationToExpandFlowChart={keyCombinationToExpandFlowChart}
            scale={scale}
            setScale={setScale}
          />
        </CoordinatesProvider>
      </main>
    </>
  );
}
