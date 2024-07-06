import createHttpError from "http-errors";
import Background from "../../../../models/StoryEditor/PlotField/Background/Background";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetBackgroundByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getBackgroundByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetBackgroundByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingBackground = await Background.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingBackground) {
    return null;
  }

  return existingBackground;
};
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
  imgUrl: string | undefined;
};

export const updateBackgroundService = async ({
  backgroundName,
  backgroundId,
  musicName,
  imgUrl,
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
  if (imgUrl?.trim().length) {
    existingBackground.imgUrl = imgUrl;
  }

  return await existingBackground.save();
};

type UpdateBackgroundImgTypes = {
  backgroundId: string;
  imgUrl: string | undefined;
};

// export const backgroundUpdateImgService = async ({
//   backgroundId,
//   imgUrl,
// }: UpdateBackgroundImgTypes) => {
//   validateMongoId({ value: backgroundId, valueName: "Background" });

//   const existingBackground = await Background.findById(backgroundId).exec();
//   if (!existingBackground) {
//     throw createHttpError(400, "Background with such id wasn't found");
//   }

//   if (!imgUrl?.trim().length) {
//     throw createHttpError(400, "imgUrl is required");
//   }

//   existingBackground.imgUrl = imgUrl;

//   return await existingBackground.save();
// };

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
