import { RequestHandler } from "express";
import {
  createCutSceneService,
  deleteCutSceneService,
  updateCutSceneService,
} from "../../../../services/StoryEditor/PlotField/CutScene/CutSceneService";

type CreateCutSceneParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/cutScenes
// @access Private
export const createCutSceneController: RequestHandler<
  CreateCutSceneParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const cutScene = await createCutSceneService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

// @route PATCH http://localhost:3500/plotFieldCommands/cutScenes/:cutSceneId
// @access Private
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

// @route DELETE http://localhost:3500/plotFieldCommands/cutScenes/:cutSceneId
// @access Private
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
