import createHttpError from "http-errors";
import CutScene from "../../../../models/StoryEditor/Flowchart/CutScene/CutScene";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateCutSceneTypes = {
  cutSceneName: string | undefined;
  flowchartCommandId: string;
};

export const createCutSceneService = async ({
  cutSceneName,
  flowchartCommandId,
}: CreateCutSceneTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!cutSceneName?.trim().length) {
    throw createHttpError(400, "CutScene is required");
  }

  return await CutScene.create({
    cutSceneName,
    flowchartCommandId,
  });
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
