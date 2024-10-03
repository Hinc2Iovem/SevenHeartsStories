import { RequestHandler } from "express";
import {
  commandIfUpdateCommandIfOrderService,
  createIfDuplicateService,
  createIfService,
  deleteIfService,
  getCommandIdsAndOrdersByCommandIfIdService,
  getIfByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/ServiceIf/IfService";

type GetCommandIfByCommandIfIdParams = {
  commandIfId: string;
};

type GetCommandIfByCommandIfIdQuery = {
  isElse: boolean;
};

// @route GET http://localhost:3500/plotFieldCommands/ifs/:commandIfId/checkOrder
// @access Private
export const getCommandIdsAndOrdersByCommandIfIdController: RequestHandler<
  GetCommandIfByCommandIfIdParams,
  unknown,
  unknown,
  GetCommandIfByCommandIfIdQuery
> = async (req, res, next) => {
  try {
    const commandIf = await getCommandIdsAndOrdersByCommandIfIdService({
      commandIfId: req.params.commandIfId,
      isElse: req.query.isElse,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCommandIfByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs
// @access Private
export const getCommandIfByPlotFieldCommandIdController: RequestHandler<
  GetCommandIfByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandIf = await getIfByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateCommandIfDuplicateParams = {
  topologyBlockId: string;
};

type CreateCommandIfDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/ifs/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createCommandIfDuplicateController: RequestHandler<
  CreateCommandIfDuplicateParams,
  unknown,
  CreateCommandIfDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandIf = await createIfDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateCommandIfParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs
// @access Private
export const createCommandIfController: RequestHandler<
  CreateCommandIfParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandIf = await createIfService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateCommandIfOrderParams = {
  plotFieldCommandId: string;
  commandIfId: string;
};
type UpdateCommandIfOrderBody = {
  newOrder: number;
};

// @route PATCH http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs/:commandIfId/newOrder
// @access Private
export const updateCommandIfOrderController: RequestHandler<
  UpdateCommandIfOrderParams,
  unknown,
  UpdateCommandIfOrderBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandIf = await commandIfUpdateCommandIfOrderService({
      commandIfId: req.params.commandIfId,
      newOrder: req.body.newOrder,
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteCommandIfParams = {
  ifId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/ifs/:ifId
// @access Private
export const deleteCommandIfController: RequestHandler<
  DeleteCommandIfParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandIf = await deleteIfService({
      ifId: req.params.ifId,
    });
    if (commandIf) {
      return res.status(201).json(commandIf);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
