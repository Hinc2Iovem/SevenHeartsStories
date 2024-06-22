import createHttpError from "http-errors";
import Move from "../../../../models/StoryEditor/Flowchart/Move/Move";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateMoveTypes = {
  flowchartCommandId: string;
};

export const createMoveService = async ({
  flowchartCommandId,
}: CreateMoveTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Move.create({
    flowchartCommandId,
  });
};

type UpdateMoveTypes = {
  moveValue: number | undefined;
  moveId: string;
};

export const updateMoveService = async ({
  moveValue,
  moveId,
}: UpdateMoveTypes) => {
  validateMongoId({ value: moveId, valueName: "Move" });

  const existingMove = await Move.findById(moveId).exec();
  if (!existingMove) {
    throw createHttpError(400, "Move with such id wasn't found");
  }

  if (!moveValue) {
    throw createHttpError(400, "MoveValue is required");
  }

  existingMove.moveValue = moveValue;

  return await existingMove.save();
};

type DeleteMoveTypes = {
  moveId: string;
};

export const deleteMoveService = async ({ moveId }: DeleteMoveTypes) => {
  validateMongoId({ value: moveId, valueName: "Move" });

  await Move.findByIdAndDelete(moveId);

  return `Move with id ${moveId} was removed`;
};
