import { RequestHandler } from "express";
import {
  createBackgroundService,
  deleteBackgroundService,
} from "../../../../services/StoryEditor/Flowchart/Background/BackgroundService";

type CreateBackgroundParams = {
  flowchartCommandId: string;
};

type CreateBackgroundBody = {
  backgroundName: string | undefined;
  pointOfMovement: number | undefined;
  musicName: string | undefined;
};

export const createBackgroundController: RequestHandler<
  CreateBackgroundParams,
  unknown,
  CreateBackgroundBody,
  unknown
> = async (req, res, next) => {
  try {
    const background = await createBackgroundService({
      backgroundName: req.body.backgroundName,
      pointOfMovement: req.body.pointOfMovement,
      musicName: req.body.musicName,
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

type DeleteBackgroundParams = {
  backgroundId: string;
};

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
