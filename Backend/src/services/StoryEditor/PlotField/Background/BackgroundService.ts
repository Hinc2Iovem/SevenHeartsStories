import createHttpError from "http-errors";
import Background from "../../../../models/StoryEditor/PlotField/Background/Background";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type CreateBackgroundTypes = {
  plotFieldCommandId: string;
};

export const createBackgroundService = async ({
  plotFieldCommandId,
}: CreateBackgroundTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Background.create({
    plotFieldCommandId,
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
