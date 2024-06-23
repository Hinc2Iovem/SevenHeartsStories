import { RequestHandler } from "express";
import {
  createGetItemService,
  deleteGetItemService,
  updateGetItemService,
} from "../../../../services/StoryEditor/Flowchart/GetItem/GetItemService";

type CreateGetItemParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/getItems
// @access Private
export const createGetItemController: RequestHandler<
  CreateGetItemParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await createGetItemService({
      flowchartCommandId: req.params.flowchartCommandId,
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
};

// @route PATCH http://localhost:3500/flowchartCommands/getItems/:getItemId
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

// @route DELETE http://localhost:3500/flowchartCommands/getItems/:getItemId
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
