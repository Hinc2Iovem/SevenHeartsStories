import { RequestHandler } from "express";
import {
  createGetItemService,
  deleteGetItemService,
  updateGetItemService,
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

type CreateGetItemParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/getItems
// @access Private
export const createGetItemController: RequestHandler<
  CreateGetItemParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await createGetItemService({
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

type UpdateGetItemParams = {
  getItemId: string;
};
type UpdateGetItemBody = {
  buttonText: string | undefined;
  itemDescription: string | undefined;
  itemName: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/getItems/:getItemId
// @access Private
export const updateGetItemController: RequestHandler<
  UpdateGetItemParams,
  unknown,
  UpdateGetItemBody,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await updateGetItemService({
      buttonText: req.body.buttonText,
      getItemId: req.params.getItemId,
      itemDescription: req.body.itemDescription,
      itemName: req.body.itemName,
      currentLanguage: req.body.currentLanguage,
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
