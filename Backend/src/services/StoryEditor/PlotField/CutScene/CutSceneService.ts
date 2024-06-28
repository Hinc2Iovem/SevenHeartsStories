import createHttpError from "http-errors";
import CutScene from "../../../../models/StoryEditor/PlotField/CutScene/CutScene";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetCutSceneByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getCutSceneByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetCutSceneByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingCutScene = await CutScene.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingCutScene) {
    return null;
  }

  return existingCutScene;
};

type CreateCutSceneTypes = {
  plotFieldCommandId: string;
};

export const createCutSceneService = async ({
  plotFieldCommandId,
}: CreateCutSceneTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await CutScene.create({
    plotFieldCommandId,
  });
};

type UpdateCutSceneTypes = {
  cutSceneName: string | undefined;
  cutSceneId: string;
};

export const updateCutSceneService = async ({
  cutSceneName,
  cutSceneId,
}: UpdateCutSceneTypes) => {
  validateMongoId({ value: cutSceneId, valueName: "CutScene" });

  const existingCutScene = await CutScene.findById(cutSceneId).exec();
  if (!existingCutScene) {
    throw createHttpError(400, "CutScene with such id wasn't found");
  }

  if (!cutSceneName?.trim().length) {
    throw createHttpError(400, "CutScene is required");
  }

  existingCutScene.cutSceneName = cutSceneName;

  return await existingCutScene.save();
};

type DeleteCutSceneTypes = {
  cutSceneId: string;
};

export const deleteCutSceneService = async ({
  cutSceneId,
}: DeleteCutSceneTypes) => {
  validateMongoId({ value: cutSceneId, valueName: "CutScene" });

  await CutScene.findByIdAndDelete(cutSceneId);

  return `CutScene with id ${cutSceneId} was removed`;
};
