import { RequestHandler } from "express";
import {
  commandIfUpdateCommandIfOrderService,
  createIfService,
  deleteIfService,
  getIfByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/ServiceIf/IfService";

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

// type AddAnotherValueBlockTypes = {
//   commandIfId: string;
// };

// // @route POST http://localhost:3500/plotFieldCommands/ifs/:commandIfId/addCondititon
// // @access Private
// export const addAnotherBlockCommandIfController: RequestHandler<
//   AddAnotherValueBlockTypes,
//   unknown,
//   unknown,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const commandIf = await addAnotherBlockIfService({
//       commandIfId: req.params.commandIfId,
//     });
//     if (commandIf) {
//       return res.status(201).json(commandIf);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

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
