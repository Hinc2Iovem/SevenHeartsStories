import createHttpError from "http-errors";
import Wait from "../../../../models/StoryEditor/Flowchart/Wait/Wait";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateWaitTypes = {
  flowchartCommandId: string;
};

export const createWaitService = async ({
  flowchartCommandId,
}: CreateWaitTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Wait.create({
    flowchartCommandId,
  });
};

type UpdateWaitTypes = {
  waitValue: number | undefined;
  waitId: string;
};

export const updateWaitService = async ({
  waitValue,
  waitId,
}: UpdateWaitTypes) => {
  validateMongoId({ value: waitId, valueName: "Wait" });

  const existingWait = await Wait.findById(waitId).exec();
  if (!existingWait) {
    throw createHttpError(400, "Wait with such id wasn't found");
  }

  if (!waitValue) {
    throw createHttpError(400, "WaitValue is required");
  }

  existingWait.waitValue = waitValue;

  return await existingWait.save();
};

type DeleteWaitTypes = {
  waitId: string;
};

export const deleteWaitService = async ({ waitId }: DeleteWaitTypes) => {
  validateMongoId({ value: waitId, valueName: "Wait" });

  await Wait.findByIdAndDelete(waitId);

  return `Wait with id ${waitId} was rewaitd`;
};
