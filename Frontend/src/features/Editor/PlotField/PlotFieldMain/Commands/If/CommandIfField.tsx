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
import useUpdateOrderInsideCommandIf from "../hooks/If/useUpdateOrderInsideCommandIf";
import useGetAllPlotFieldCommandsByIfIdInsideElse from "../hooks/useGetAllPlotFieldCommandsByIfIdInsideIElse";
import useGetAllPlotFieldCommandsByIfIdInsideIf from "../hooks/useGetAllPlotFieldCommandsByIfIdInsideIf";
import PlotfieldItemInsideIf from "../PlotfieldItemInsideIf";
import CommandIfValues from "./CommandIfValues";
import { generateMongoObjectId } from "../../../../../../utils/generateMongoObjectId";
import { AllPossiblePlotFieldComamndsTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";

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
  const createCommandInsideIf = useCreateBlankCommandInsideIf({
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

  const [
    currentAmountOfCommandsInsideElse,
    setCurrentAmountOfCommandsInsideElse,
  ] = useState(commandIf?.amountOfCommandsInsideElse);
  const [currentAmountOfCommandsInsideIf, setCurrentAmountOfCommandsInsideIf] =
    useState(commandIf?.amountOfCommandsInsideIf);

  useEffect(() => {
    if (commandIf) {
      setCommandIfId(commandIf._id);
      setCurrentAmountOfCommandsInsideElse(
        commandIf.amountOfCommandsInsideElse
      );
      setCurrentAmountOfCommandsInsideIf(commandIf.amountOfCommandsInsideIf);
    }
  }, [commandIf]);

  const handleCreateCommand = (isElse: boolean) => {
    const _id = generateMongoObjectId();
    if (isElse) {
      createCommandInsideElse.mutate({
        commandOrder: currentAmountOfCommandsInsideElse as number,
        _id,
        command: "" as AllPossiblePlotFieldComamndsTypes,
        isElse,
        topologyBlockId,
        commandIfId,
      });
      setCurrentAmountOfCommandsInsideElse((prev) => {
        if (prev) {
          return prev + 1;
        } else {
          return 1;
        }
      });
      if (createCommandInsideElse.isError) {
        setCurrentAmountOfCommandsInsideElse((prev) => {
          if (prev) {
            return prev - 1;
          } else {
            return 0;
          }
        });
      }
    } else {
      createCommandInsideIf.mutate({
        commandOrder: currentAmountOfCommandsInsideIf as number,
        _id,
        command: "" as AllPossiblePlotFieldComamndsTypes,
        isElse,
        topologyBlockId,
        commandIfId,
      });
      setCurrentAmountOfCommandsInsideIf((prev) => {
        if (prev) {
          return prev + 1;
        } else {
          return 1;
        }
      });
      if (createCommandInsideIf.isError) {
        setCurrentAmountOfCommandsInsideIf((prev) => {
          if (prev) {
            return prev - 1;
          } else {
            return 0;
          }
        });
      }
    }
  };

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

    const orderedCommandsInsideElse = [...(commandsInsideElse || [])];
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
      <div className="min-w-[10rem] w-full flex flex-col gap-[1rem]">
        <div className="flex flex-grow w-full relative items-center gap-[1rem]">
          <h3 className="text-[1.4rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-green-200 text-gray-600 cursor-default">
            {nameValue}
          </h3>
          <ButtonHoverPromptModal
            contentName="Создать строку"
            positionByAbscissa="right"
            className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-green-200"
            asideClasses="text-[1.3rem] -translate-y-1/3"
            onClick={() => handleCreateCommand(false)}
            variant="rectangle"
          >
            <img
              src={plus}
              alt="+"
              className="w-[1.5rem] absolute translate-y-1/2 -translate-x-1/2 left-[0rem] bottom-0 z-[2]"
            />
            <img src={commandImg} alt="Commands" className="w-[3rem]" />
          </ButtonHoverPromptModal>
        </div>
      </div>
      <CommandIfValues ifId={commandIfId} />
      <DragDropContext onDragEnd={handleOnDragEndInsideIf}>
        <Droppable droppableId="commandIf">
          {(provided: DroppableProvided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-[1rem] py-[.5rem] w-full bg-green-200 rounded-md"
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
          positionByAbscissa="right"
          className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-neutral-magnolia z-[2]"
          asideClasses="text-[1.3rem] -translate-y-1/3"
          onClick={() => handleCreateCommand(true)}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 -translate-x-1/2 left-[0rem] bottom-0"
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
              className="flex flex-col gap-[1rem] py-[.5rem] w-full bg-neutral-magnolia rounded-md"
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
