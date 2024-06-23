import { RequestHandler } from "express";
import {
  flowchartCommandCreateService,
  flowchartCommandDeleteService,
  flowchartCommandUpdateCommandNameService,
  flowchartCommandUpdateCommandOrderService,
  flowchartCommandUpdateCommandSideService,
} from "../../../services/StoryEditor/Flowchart/FlowchartCommandService";

type FlowchartCommandCreateParams = {
  flowchartId: string;
};

// @route POST http://localhost:3500/flowchartCommands/flowchart/:flowchartId
// @access Private
export const flowchartCommandControllerCreate: RequestHandler<
  FlowchartCommandCreateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const flowchartCommand = await flowchartCommandCreateService({
      flowchartId: req.params.flowchartId,
    });
    if (flowchartCommand) {
      return res.status(201).json(flowchartCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type FlowchartCommandUpdateParams = {
  flowchartCommandId: string;
};

type FlowchartCommandUpdateBody = {
  commandSide: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/:flowchartCommandId/commandSide
// @access Private
export const flowchartCommandControllerUpdateCommandSide: RequestHandler<
  FlowchartCommandUpdateParams,
  unknown,
  FlowchartCommandUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const flowchartCommand = await flowchartCommandUpdateCommandSideService({
      commandSide: req.body.commandSide,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (flowchartCommand) {
      return res.status(201).json(flowchartCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type FlowchartCommandUpdateNameBody = {
  commandName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/:flowchartCommandId/commandName
// @access Private
export const flowchartCommandControllerUpdateCommandName: RequestHandler<
  FlowchartCommandUpdateParams,
  unknown,
  FlowchartCommandUpdateNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const flowchartCommand = await flowchartCommandUpdateCommandNameService({
      commandName: req.body.commandName,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (flowchartCommand) {
      return res.status(201).json(flowchartCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type FlowchartCommandUpdateOrderBody = {
  newOrder: number;
};

// @route PATCH http://localhost:3500/flowchartCommands/:flowchartCommandId/commandOrder
// @access Private
export const flowchartCommandControllerUpdateCommandOrder: RequestHandler<
  FlowchartCommandUpdateParams,
  unknown,
  FlowchartCommandUpdateOrderBody,
  unknown
> = async (req, res, next) => {
  try {
    const flowchartCommand = await flowchartCommandUpdateCommandOrderService({
      newOrder: req.body.newOrder,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (flowchartCommand) {
      return res.status(201).json(flowchartCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route DELETE http://localhost:3500/flowchartCommands/:flowchartCommandId
// @access Private
export const flowchartCommandControllerDelete: RequestHandler<
  FlowchartCommandUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const flowchartCommand = await flowchartCommandDeleteService({
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (flowchartCommand) {
      return res.status(201).json(flowchartCommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
