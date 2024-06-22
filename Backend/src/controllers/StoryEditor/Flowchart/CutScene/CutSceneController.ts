import { RequestHandler } from "express";
import {
  createCutSceneService,
  deleteCutSceneService,
  updateCutSceneService,
} from "../../../../services/StoryEditor/Flowchart/CutScene/CutSceneService";

type CreateCutSceneParams = {
  flowchartCommandId: string;
};

export const createCutSceneController: RequestHandler<
  CreateCutSceneParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const cutScene = await createCutSceneService({
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

type UpdateCutSceneParams = {
  cutSceneId: string;
};

type UpdateCutSceneBody = {
  cutSceneName: string | undefined;
};

export const updateCutSceneController: RequestHandler<
  UpdateCutSceneParams,
  unknown,
  UpdateCutSceneBody,
  unknown
> = async (req, res, next) => {
  try {
    const cutScene = await updateCutSceneService({
      cutSceneName: req.body.cutSceneName,
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
