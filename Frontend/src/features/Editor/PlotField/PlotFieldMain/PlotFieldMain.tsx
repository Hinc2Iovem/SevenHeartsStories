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

type PlotFieldMainTypes = {
  topologyBlockId: string;
  showAllCommands: boolean;
};

export default function PlotFieldMain({
  topologyBlockId,
  showAllCommands,
}: PlotFieldMainTypes) {
  const { data: plotfieldCommands } = useGetAllPlotFieldCommands({
    topologyBlockId,
  });

  const [commands, setCommands] = useState(plotfieldCommands || []);

  useEffect(() => {
    if (plotfieldCommands) {
      setCommands(plotfieldCommands);
    }
  }, [plotfieldCommands]);

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
      className={`${
        showAllCommands ? "hidden" : ""
      } mt-[.5rem] h-[calc(100vh-8rem)] overflow-y-auto | containerScroll`}
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
