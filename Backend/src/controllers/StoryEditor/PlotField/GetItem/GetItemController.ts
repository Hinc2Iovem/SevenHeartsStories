import { RequestHandler } from "express";
import {
  createGetItemDuplicateService,
  deleteGetItemService,
  getItemByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/GetItem/GetItemService";

type GetItemByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/getItems
// @access Private
export const getItemByPlotFieldCommandIdController: RequestHandler<
  GetItemByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await getItemByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateGetItemDuplicateParams = {
  topologyBlockId: string;
};

type CreateGetItemDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/getItems/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createGetItemDuplicateController: RequestHandler<
  CreateGetItemDuplicateParams,
  unknown,
  CreateGetItemDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await createGetItemDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteGetItemParams = {
  getItemId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/getItems/:getItemId
// @access Private
export const deleteGetItemController: RequestHandler<
  DeleteGetItemParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await deleteGetItemService({
      getItemId: req.params.getItemId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
