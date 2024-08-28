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
    firstTopologyBlock?._id ?? ""
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
      {keyCombinationToExpandPlotField === "expandPlotField" ? (
        <main className={`flex w-full justify-center`}>
          <PlotField
            setShowHeader={setShowHeader}
            expandPlotField={
              keyCombinationToExpandPlotField === "expandPlotField"
            }
            topologyBlockId={currentTopologyBlockId}
          />
        </main>
      ) : keyCombinationToExpandFlowChart === "expandFlowchart" ? (
        <main
          className={`max-w-full h-[calc(100vh-2rem)] overflow-auto shadow-md rounded-md bg-primary-light-blue relative | containerScroll`}
        >
          <div className="min-w-[500rem] min-h-[500rem] absolute w-full h-full border-[3px] border-gray-400 border-dashed">
            <div className="absolute bg-white left-[calc(50%-.2rem)] w-[.4rem] min-h-[500rem] h-full"></div>
            <div className="absolute bg-white left-[calc(50%-.2rem)] w-[.4rem] min-h-[500rem] h-full rotate-90"></div>
          </div>
          <div
            className={`fixed z-[2] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md top-[2rem] translate-x-[1rem]`}
          >
            {(scale * 100).toFixed(0)}%
          </div>
          <CoordinatesProvider>
            <Flowchart
              expanded={true}
              currentTopologyBlockId={currentTopologyBlockId}
              setCurrentTopologyBlockId={setCurrentTopologyBlockId}
              scale={scale}
              setScale={setScale}
            />
          </CoordinatesProvider>
        </main>
      ) : (
        <main
          className={`flex w-full h-[calc(100vh-2.30rem)] justify-center relative`}
        >
          <PlotField
            setShowHeader={setShowHeader}
            topologyBlockId={currentTopologyBlockId}
          />
          <div
            className={`fixed top-[2rem] active:scale-[0.98] text-[1.3rem] transition-all bg-white hover:bg-primary-light-blue hover:text-white text-gray-700 shadow-md px-[1rem] py-[.5rem] rounded-md translate-x-[calc(50%+1rem)] z-[10]`}
          >
            {(scale * 100).toFixed(0)}%
          </div>
          <CoordinatesProvider>
            <Flowchart
              expanded={false}
              currentTopologyBlockId={currentTopologyBlockId}
              setCurrentTopologyBlockId={setCurrentTopologyBlockId}
              scale={scale}
              setScale={setScale}
            />
          </CoordinatesProvider>
        </main>
      )}
    </>
  );
}
