import { RequestHandler } from "express";
import {
  createAmbientDuplicateService,
  createAmbientService,
  deleteAmbientService,
  getAmbientByPlotFieldCommandIdService,
  updateAmbientService,
} from "../../../../services/StoryEditor/PlotField/Ambient/AmbientService";

type GetAmbientByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ambients
// @access Private
export const getAmbientByPlotFieldCommandIdController: RequestHandler<
  GetAmbientByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await getAmbientByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateAmbientParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ambients
// @access Private
export const createAmbientController: RequestHandler<
  CreateAmbientParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await createAmbientService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateAmbientDuplicateParams = {
  topologyBlockId: string;
};

type CreateAmbientDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/ambients/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createAmbientDuplicateController: RequestHandler<
  CreateAmbientDuplicateParams,
  unknown,
  CreateAmbientDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const ambient = await createAmbientDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
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

// @route PATCH http://localhost:3500/plotFieldCommands/ambients/:ambientId
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

// @route DELETE http://localhost:3500/plotFieldCommands/ambients/:ambientId
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
