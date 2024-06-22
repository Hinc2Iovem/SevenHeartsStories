import createHttpError from "http-errors";
import Move from "../../../../models/StoryEditor/Flowchart/Move/Move";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateMoveTypes = {
  moveValue: number | undefined;
  flowchartCommandId: string;
};

export const createMoveService = async ({
  moveValue,
  flowchartCommandId,
}: CreateMoveTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!moveValue) {
    throw createHttpError(400, "MoveValue is required");
  }

  return await Move.create({
    moveValue,
    flowchartCommandId,
  });
};

type DeleteMoveTypes = {
  moveId: string;
};

export const deleteMoveService = async ({ moveId }: DeleteMoveTypes) => {
  validateMongoId({ value: moveId, valueName: "Move" });

  await Move.findByIdAndDelete(moveId);

  return `Move with id ${moveId} was removed`;
};
