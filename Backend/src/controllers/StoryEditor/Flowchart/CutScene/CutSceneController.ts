import { RequestHandler } from "express";
import {
  createCutSceneService,
  deleteCutSceneService,
} from "../../../../services/StoryEditor/Flowchart/CutScene/CutSceneService";

type CreateCutSceneParams = {
  flowchartCommandId: string;
};

type CreateCutSceneBody = {
  cutSceneName: string | undefined;
};

export const createCutSceneController: RequestHandler<
  CreateCutSceneParams,
  unknown,
  CreateCutSceneBody,
  unknown
> = async (req, res, next) => {
  try {
    const cutScene = await createCutSceneService({
      cutSceneName: req.body.cutSceneName,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (cutScene) {
      return res.status(201).json(cutScene);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteCutSceneParams = {
  cutSceneId: string;
};

export const deleteCutSceneController: RequestHandler<
  DeleteCutSceneParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const cutScene = await deleteCutSceneService({
      cutSceneId: req.params.cutSceneId,
    });
    if (cutScene) {
      return res.status(201).json(cutScene);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
