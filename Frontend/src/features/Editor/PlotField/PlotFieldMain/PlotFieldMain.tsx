import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import PlotfieldItem from "./Commands/PlotfieldItem";
import useGetAllPlotFieldCommands from "./Commands/hooks/useGetAllPlotFieldCommands";
import useUpdateCommandOrder from "./Commands/hooks/useUpdateCommandOrder";
import { useEffect, useState } from "react";
import usePlotfieldCommands from "../PlotFieldContext";
import { PlotFieldTypes } from "../../../../types/StoryEditor/PlotField/PlotFieldTypes";

type PlotFieldMainTypes = {
  topologyBlockId: string;
  showAllCommands: boolean;
  renderedAsSubPlotfield?: boolean;
};

export default function PlotFieldMain({
  topologyBlockId,
  showAllCommands,
  renderedAsSubPlotfield = false,
}: PlotFieldMainTypes) {
  const { commands: optimisticCommands } = usePlotfieldCommands();

  const { data: plotfieldCommands } = useGetAllPlotFieldCommands({
    topologyBlockId,
  });

  const [commands, setCommands] = useState(plotfieldCommands || []);

  useEffect(() => {
    if (plotfieldCommands) {
      setCommands(plotfieldCommands);
    }
  }, [plotfieldCommands]);

  useEffect(() => {
    if (
      optimisticCommands &&
      topologyBlockId === optimisticCommands[0]?.topologyBlockId
    ) {
      setCommands((prev) => {
        return [
          ...prev,
          ...(optimisticCommands as unknown as PlotFieldTypes[]),
        ];
      });
    }
  }, [optimisticCommands, topologyBlockId]);

  const updateCommandOrder = useUpdateCommandOrder();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result?.destination) return;

    const orderedCommands = [...(commands ?? [])];
    const [reorderedItem] = orderedCommands.splice(result.source.index, 1);
    orderedCommands.splice(result.destination.index, 0, reorderedItem);
    updateCommandOrder.mutate({
      newOrder: result.destination.index,
      plotFieldCommandId: result.draggableId,
    });
    setCommands(orderedCommands);
  };

  return (
    <main
      className={`${showAllCommands ? "hidden" : ""} ${
        renderedAsSubPlotfield
          ? "h-fit max-h-[calc(100vh-8rem)] bg-white"
          : "h-[calc(100vh-8rem)]"
      } mt-[.5rem] overflow-y-auto | containerScroll`}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="plotFieldCommands">
          {(provided: DroppableProvided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-[1rem] w-full"
            >
              {commands?.map((p, i) => {
                return (
                  <Draggable key={p._id} draggableId={p._id} index={i}>
                    {(provided) => <PlotfieldItem provided={provided} {...p} />}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
