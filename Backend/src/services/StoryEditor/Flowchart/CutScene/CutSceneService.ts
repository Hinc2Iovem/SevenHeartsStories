import createHttpError from "http-errors";
import CutScene from "../../../../models/StoryEditor/Flowchart/CutScene/CutScene";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateCutSceneTypes = {
  flowchartCommandId: string;
};

export const createCutSceneService = async ({
  flowchartCommandId,
}: CreateCutSceneTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await CutScene.create({
    flowchartCommandId,
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
