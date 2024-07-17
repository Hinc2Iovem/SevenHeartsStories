import { RequestHandler } from "express";
import {
  getAllPlotFieldCommandsByIfIdService,
  getAllPlotFieldCommandsService,
  plotFieldCommandCreateInsideIfBlockService,
  plotFieldCommandCreateService,
  plotFieldCommandDeleteService,
  plotFieldCommandUpdateCommandNameService,
  plotFieldCommandUpdateCommandOrderService,
} from "../../../services/StoryEditor/PlotField/PlotFieldCommandService";

type GetAllPlotFieldCommandsByIfId = {
  commandIfId: string;
};

// @route GET http://localhost:3500/plotField/commandIfs/:commandIfId
// @access Private
export const getAllPlotFieldCommandsByIfIdController: RequestHandler<
  GetAllPlotFieldCommandsByIfId,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommands = await getAllPlotFieldCommandsByIfIdService({
      commandIfId: req.params.commandIfId,
    });
    if (plotFieldCommands) {
      return res.status(201).json(plotFieldCommands);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
type GetAllPlotFieldCommands = {
  topologyBlockId: string;
};

// @route GET http://localhost:3500/plotField/topologyBlocks/:topologyBlockId
// @access Private
export const getAllPlotFieldCommandsController: RequestHandler<
  GetAllPlotFieldCommands,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommands = await getAllPlotFieldCommandsService({
      topologyBlockId: req.params.topologyBlockId,
    });
    if (plotFieldCommands) {
      return res.status(201).json(plotFieldCommands);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type PlotFieldCommandCreateInsideIfBlockParams = {
  commandIfId: string;
  topologyBlockId: string;
};

type PlotFieldCommandCreateInsideIfBlockBody = {
  isElse?: boolean;
};

// @route POST http://localhost:3500/plotField/topologyBlocks/:topologyBlockId/commandIfs/:commandIfId
// @access Private
export const plotFieldCommandCreateInsideIfBlockController: RequestHandler<
  PlotFieldCommandCreateInsideIfBlockParams,
  unknown,
  PlotFieldCommandCreateInsideIfBlockBody,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommand = await plotFieldCommandCreateInsideIfBlockService({
      commandIfId: req.params.commandIfId,
      topologyBlockId: req.params.topologyBlockId,
      isElse: req.body.isElse,
    });
    if (plotFieldCommand) {
      return res.status(201).json(plotFieldCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type PlotFieldCommandCreateParams = {
  topologyBlockId: string;
};

// @route POST http://localhost:3500/plotField/topologyBlocks/:topologyBlockId
// @access Private
export const plotFieldCommandControllerCreate: RequestHandler<
  PlotFieldCommandCreateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommand = await plotFieldCommandCreateService({
      topologyBlockId: req.params.topologyBlockId,
    });
    if (plotFieldCommand) {
      return res.status(201).json(plotFieldCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type PlotFieldCommandUpdateParams = {
  plotFieldCommandId: string;
};

type PlotFieldCommandUpdateNameBody = {
  commandName: string | undefined;
};

// @route PATCH http://localhost:3500/plotField/:plotFieldCommandId/topologyBlocks/commandName
// @access Private
export const plotFieldCommandControllerUpdateCommandName: RequestHandler<
  PlotFieldCommandUpdateParams,
  unknown,
  PlotFieldCommandUpdateNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommand = await plotFieldCommandUpdateCommandNameService({
      commandName: req.body.commandName,
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (plotFieldCommand) {
      return res.status(201).json(plotFieldCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type PlotFieldCommandUpdateOrderBody = {
  newOrder: number;
};

// @route PATCH http://localhost:3500/plotField/:plotFieldCommandId/topologyBlocks/commandOrder
// @access Private
export const plotFieldCommandControllerUpdateCommandOrder: RequestHandler<
  PlotFieldCommandUpdateParams,
  unknown,
  PlotFieldCommandUpdateOrderBody,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommand = await plotFieldCommandUpdateCommandOrderService({
      newOrder: req.body.newOrder,
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (plotFieldCommand) {
      return res.status(201).json(plotFieldCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route DELETE http://localhost:3500/plotField/:plotFieldCommandId/topologyBlocks
// @access Private
export const plotFieldCommandControllerDelete: RequestHandler<
  PlotFieldCommandUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const plotFieldCommand = await plotFieldCommandDeleteService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (plotFieldCommand) {
      return res.status(201).json(plotFieldCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
