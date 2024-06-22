import createHttpError from "http-errors";
import Background from "../../../../models/StoryEditor/Flowchart/Background/Background";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateBackgroundTypes = {
  flowchartCommandId: string;
};

export const createBackgroundService = async ({
  flowchartCommandId,
}: CreateBackgroundTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Background.create({
    flowchartCommandId,
  });
};

type UpdateBackgroundTypes = {
  backgroundName: string | undefined;
  backgroundId: string;
  pointOfMovement: number | undefined;
  musicName: string | undefined;
};

export const updateBackgroundService = async ({
  backgroundName,
  backgroundId,
  musicName,
  pointOfMovement,
}: UpdateBackgroundTypes) => {
  validateMongoId({ value: backgroundId, valueName: "Background" });

  const existingBackground = await Background.findById(backgroundId).exec();
  if (!existingBackground) {
    throw createHttpError(400, "Background with such id wasn't found");
  }

  if (!backgroundName?.trim().length) {
    throw createHttpError(400, "Background is required");
  }

  existingBackground.backgroundName = backgroundName;
  if (musicName?.trim().length) {
    existingBackground.musicName = musicName;
  }
  if (pointOfMovement) {
    existingBackground.pointOfMovement = pointOfMovement;
  }

  return await existingBackground.save();
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
