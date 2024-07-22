import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import commandImg from "../../../../../../assets/images/Editor/command.png";
import plus from "../../../../../../assets/images/shared/add.png";
import ButtonHoverPromptModal from "../../../../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import useCreateBlankCommandInsideIf from "../hooks/If/useCreateBlankCommandInsideIf";
import useGetCommandIf from "../hooks/If/useGetCommandIf";
import PlotfieldItemInsideIf from "../PlotfieldItemInsideIf";
import useGetAllPlotFieldCommandsByIfIdInsideIf from "../hooks/useGetAllPlotFieldCommandsByIfIdInsideIf";
import useGetAllPlotFieldCommandsByIfIdInsideElse from "../hooks/useGetAllPlotFieldCommandsByIfIdInsideIElse";
import useUpdateOrderInsideCommandIf from "../hooks/If/useUpdateOrderInsideCommandIf";

type CommandIfFieldTypes = {
  plotFieldCommandId: string;
  command: string;
  topologyBlockId: string;
};

export default function CommandIfField({
  plotFieldCommandId,
  command,
  topologyBlockId,
}: CommandIfFieldTypes) {
  const [nameValue] = useState<string>(command ?? "If");

  const { data: commandIf } = useGetCommandIf({
    plotFieldCommandId,
  });
  const [commandIfId, setCommandIfId] = useState("");
  const createCommandinsideIf = useCreateBlankCommandInsideIf({
    topologyBlockId,
    commandIfId,
  });
  const createCommandInsideElse = useCreateBlankCommandInsideIf({
    topologyBlockId,
    commandIfId,
    isElse: true,
  });

  const { data: commandsInsideIf } = useGetAllPlotFieldCommandsByIfIdInsideIf({
    commandIfId,
  });
  const { data: commandsInsideElse } =
    useGetAllPlotFieldCommandsByIfIdInsideElse({
      commandIfId,
    });

  const [commandsIf, setCommandsIf] = useState(commandsInsideIf ?? []);
  const [commandsElse, setCommandsElse] = useState(commandsInsideElse ?? []);

  useEffect(() => {
    if (commandsInsideIf) {
      setCommandsIf(commandsInsideIf);
    }
  }, [commandsInsideIf]);

  useEffect(() => {
    if (commandsInsideElse) {
      setCommandsElse(commandsInsideElse);
    }
  }, [commandsInsideElse]);

  const updateCommandOrder = useUpdateOrderInsideCommandIf({ commandIfId });

  useEffect(() => {
    if (commandIf) {
      setCommandIfId(commandIf._id);
    }
  }, [commandIf]);

  const handleOnDragEndInsideIf = (result: DropResult) => {
    if (!result?.destination) return;

    const orderedCommandsInsideIf = [...(commandsInsideIf ?? [])];
    const [reorderedItem] = orderedCommandsInsideIf.splice(
      result.source.index,
      1
    );
    orderedCommandsInsideIf.splice(result.destination.index, 0, reorderedItem);
    updateCommandOrder.mutate({
      newOrder: result.destination.index,
      plotFieldCommandId: result.draggableId,
    });
    setCommandsIf(orderedCommandsInsideIf);
  };

  const handleOnDragEndInsideElse = (result: DropResult) => {
    if (!result?.destination) return;

    const orderedCommandsInsideElse = [...(commandsInsideElse ?? [])];
    const [reorderedItem] = orderedCommandsInsideElse.splice(
      result.source.index,
      1
    );
    orderedCommandsInsideElse.splice(
      result.destination.index,
      0,
      reorderedItem
    );
    updateCommandOrder.mutate({
      newOrder: result.destination.index,
      plotFieldCommandId: result.draggableId,
    });
    setCommandsElse(orderedCommandsInsideElse);
  };

  return (
    <div className="flex gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] flex-col">
      <div className="min-w-[10rem] flex-grow w-full relative flex items-center gap-[1rem]">
        <h3 className="text-[1.4rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-green-200 text-gray-600 cursor-default">
          {nameValue}
        </h3>
        <ButtonHoverPromptModal
          contentName="Создать строку"
          positionByAbscissa="left"
          className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-green-200"
          asideClasses="text-[1.3rem] translate-x-1/4 -translate-y-2/3"
          onClick={() => createCommandinsideIf.mutate()}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 translate-x-1/2 right-[0rem] bottom-0 z-[2]"
          />
          <img src={commandImg} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </div>
      <DragDropContext onDragEnd={handleOnDragEndInsideIf}>
        <Droppable droppableId="commandIf">
          {(provided: DroppableProvided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-[1rem] w-full bg-green-200 rounded-md"
            >
              {commandsIf?.map((p, i) => {
                return (
                  <Draggable key={p._id} draggableId={p._id} index={i}>
                    {(provided) => (
                      <PlotfieldItemInsideIf provided={provided} {...p} />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="min-w-[10rem] flex-grow w-full relative flex items-center gap-[1rem] p-[.5rem]">
        <h3 className="text-[1.4rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-neutral-magnolia text-gray-700 cursor-default">
          Else
        </h3>
        <ButtonHoverPromptModal
          contentName="Создать строку"
          positionByAbscissa="left"
          className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-neutral-magnolia z-[2]"
          asideClasses="text-[1.3rem] translate-x-1/4 -translate-y-2/3"
          onClick={() => createCommandInsideElse.mutate()}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 translate-x-1/2 right-[0rem] bottom-0"
          />
          <img src={commandImg} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </div>
      <DragDropContext onDragEnd={handleOnDragEndInsideElse}>
        <Droppable droppableId="commandIfElse">
          {(provided: DroppableProvided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-[1rem] w-full bg-neutral-magnolia rounded-md"
            >
              {commandsElse?.map((p, i) => {
                return (
                  <Draggable key={p._id} draggableId={p._id} index={i}>
                    {(provided) => (
                      <PlotfieldItemInsideIf provided={provided} {...p} />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
