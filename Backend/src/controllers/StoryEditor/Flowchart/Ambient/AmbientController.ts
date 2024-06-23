import { RequestHandler } from "express";
import {
  createAmbientService,
  deleteAmbientService,
  updateAmbientService,
} from "../../../../services/StoryEditor/Flowchart/Ambient/AmbientService";

type CreateAmbientParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/ambients
// @access Private
export const createAmbientController: RequestHandler<
  CreateAmbientParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await createAmbientService({
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (ambient) {
      return res.status(201).json(ambient);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateAmbientParams = {
  ambientId: string;
};

type UpdateAmbientBody = {
  ambientName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/ambients/:ambientId
// @access Private
export const updateAmbientController: RequestHandler<
  UpdateAmbientParams,
  unknown,
  UpdateAmbientBody,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await updateAmbientService({
      ambientName: req.body.ambientName,
      ambientId: req.params.ambientId,
    });
    if (ambient) {
      return res.status(201).json(ambient);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteAmbientParams = {
  ambientId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/ambients/:ambientId
// @access Private
export const deleteAmbientController: RequestHandler<
  DeleteAmbientParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await deleteAmbientService({
      ambientId: req.params.ambientId,
    });
    if (ambient) {
      return res.status(201).json(ambient);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
