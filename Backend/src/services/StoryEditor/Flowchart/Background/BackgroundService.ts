import createHttpError from "http-errors";
import Background from "../../../../models/StoryEditor/Flowchart/Background/Background";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateBackgroundTypes = {
  backgroundName: string | undefined;
  flowchartCommandId: string;
  pointOfMovement: number | undefined;
  musicName: string | undefined;
};

export const createBackgroundService = async ({
  backgroundName,
  flowchartCommandId,
  musicName,
  pointOfMovement,
}: CreateBackgroundTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!backgroundName?.trim().length) {
    throw createHttpError(400, "Background is required");
  }

  return await Background.create({
    backgroundName,
    flowchartCommandId,
    musicName: musicName ?? "",
    pointOfMovement: pointOfMovement ?? 0,
  });
};

type DeleteBackgroundTypes = {
  backgroundId: string;
};

export const deleteBackgroundService = async ({
  backgroundId,
}: DeleteBackgroundTypes) => {
  validateMongoId({ value: backgroundId, valueName: "Background" });

  await Background.findByIdAndDelete(backgroundId);

  return `Background with id ${backgroundId} was removed`;
};
