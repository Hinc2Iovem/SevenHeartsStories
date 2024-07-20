import createHttpError from "http-errors";
import Music from "../../../../models/StoryData/Music";
import Background from "../../../../models/StoryEditor/PlotField/Background/Background";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";

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
  pointOfMovement: string | undefined;
};

export const updateBackgroundService = async ({
  backgroundName,
  backgroundId,
  pointOfMovement,
}: UpdateBackgroundTypes) => {
  validateMongoId({ value: backgroundId, valueName: "Background" });

  const existingBackground = await Background.findById(backgroundId).exec();
  if (!existingBackground) {
    throw createHttpError(400, "Background with such id wasn't found");
  }

  if (backgroundName?.trim().length) {
    existingBackground.backgroundName = backgroundName;
  }

  if (pointOfMovement?.trim().length) {
    existingBackground.pointOfMovement = pointOfMovement;
  }

  return await existingBackground.save();
};

type UpdateBackgroundMusicIdTypes = {
  backgroundId: string;
  storyId: string;
  musicName: string | undefined;
};

export const backgroundUpdateMusicIdService = async ({
  backgroundId,
  storyId,
  musicName,
}: UpdateBackgroundMusicIdTypes) => {
  validateMongoId({ value: backgroundId, valueName: "Background" });

  const existingBackground = await Background.findById(backgroundId).exec();
  if (!existingBackground) {
    throw createHttpError(400, "Background with such id wasn't found");
  }

  if (!musicName?.trim().length) {
    throw createHttpError(400, "imgUrl is required");
  }

  const musicLibrary = await Music.findOne({ musicName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  const backgroundCommand = await Background.findById(backgroundId).exec();

  if (!musicLibrary) {
    const newMusicInLibrary = await Music.create({ musicName, storyId });
    if (backgroundCommand) {
      backgroundCommand.musicId = newMusicInLibrary._id;
      return await backgroundCommand.save();
    } else {
      throw createHttpError(400, "Music command wasn't even created");
    }
  } else {
    if (backgroundCommand) {
      backgroundCommand.musicId = musicLibrary._id;
      return await backgroundCommand.save();
    } else {
      throw createHttpError(400, "Sound command wasn't even created");
    }
  }
};

type UpdateBackgroundImgTypes = {
  backgroundId: string;
  imgUrl: string | undefined;
};

export const backgroundUpdateImgService = async ({
  backgroundId,
  imgUrl,
}: UpdateBackgroundImgTypes) => {
  validateMongoId({ value: backgroundId, valueName: "Background" });

  const existingBackground = await Background.findById(backgroundId).exec();
  if (!existingBackground) {
    throw createHttpError(400, "Background with such id wasn't found");
  }

  if (!imgUrl?.trim().length) {
    throw createHttpError(400, "imgUrl is required");
  }

  existingBackground.imgUrl = imgUrl;

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
