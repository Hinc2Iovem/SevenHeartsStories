import createHttpError from "http-errors";
import Move from "../../../../models/StoryEditor/PlotField/Move/Move";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetMoveByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getMoveByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetMoveByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingMove = await Move.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingMove) {
    return null;
  }

  return existingMove;
};

type CreateMoveTypes = {
  plotFieldCommandId: string;
};

export const createMoveService = async ({
  plotFieldCommandId,
}: CreateMoveTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Move.create({
    plotFieldCommandId,
  });
};

type UpdateMoveTypes = {
  moveValue: string | undefined;
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

  if (!moveValue?.trim().length) {
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
