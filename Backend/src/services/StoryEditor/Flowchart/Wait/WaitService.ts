import createHttpError from "http-errors";
import Wait from "../../../../models/StoryEditor/Flowchart/Wait/Wait";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateWaitTypes = {
  waitValue: number | undefined;
  flowchartCommandId: string;
};

export const createWaitService = async ({
  waitValue,
  flowchartCommandId,
}: CreateWaitTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!waitValue) {
    throw createHttpError(400, "WaitValue is required");
  }

  return await Wait.create({
    waitValue,
    flowchartCommandId,
  });
};

type DeleteWaitTypes = {
  waitId: string;
};

export const deleteWaitService = async ({ waitId }: DeleteWaitTypes) => {
  validateMongoId({ value: waitId, valueName: "Wait" });

  await Wait.findByIdAndDelete(waitId);

  return `Wait with id ${waitId} was rewaitd`;
};
