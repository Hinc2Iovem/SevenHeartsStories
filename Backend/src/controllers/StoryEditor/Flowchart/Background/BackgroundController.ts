import { RequestHandler } from "express";
import {
  createBackgroundService,
  deleteBackgroundService,
  updateBackgroundService,
} from "../../../../services/StoryEditor/Flowchart/Background/BackgroundService";

type CreateBackgroundParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/backgrounds
// @access Private
export const createBackgroundController: RequestHandler<
  CreateBackgroundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const background = await createBackgroundService({
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateBackgroundParams = {
  backgroundId: string;
};

type UpdateBackgroundBody = {
  backgroundName: string | undefined;
  pointOfMovement: number | undefined;
  musicName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/backgrounds/:backgroundId
// @access Private
export const updateBackgroundController: RequestHandler<
  UpdateBackgroundParams,
  unknown,
  UpdateBackgroundBody,
  unknown
> = async (req, res, next) => {
  try {
    const background = await updateBackgroundService({
      backgroundName: req.body.backgroundName,
      pointOfMovement: req.body.pointOfMovement,
      musicName: req.body.musicName,
      backgroundId: req.params.backgroundId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteBackgroundParams = {
  backgroundId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/backgrounds/:backgroundId
// @access Private
export const deleteBackgroundController: RequestHandler<
  DeleteBackgroundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const background = await deleteBackgroundService({
      backgroundId: req.params.backgroundId,
    });
    if (background) {
      return res.status(201).json(background);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
