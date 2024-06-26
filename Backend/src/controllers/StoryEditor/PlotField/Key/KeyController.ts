import { RequestHandler } from "express";
import {
  createCommandKeyService,
  deleteCommandKeyService,
  updateCommandKeyService,
  updateCommandKeyTargetBlockIdService,
} from "../../../../services/StoryEditor/PlotField/Key/KeyService";

type CreateKeyParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/keys
// @access Private
export const createKeyController: RequestHandler<
  CreateKeyParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const key = await createCommandKeyService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (key) {
      return res.status(201).json(key);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateKeyParams = {
  commandKeyId: string;
  targetBlockId: string;
};

type UpdateKeyBody = {
  sourceBlockId: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId/targetBlocks/:targetBlockId
// @access Private
export const updateKeyController: RequestHandler<
  UpdateKeyParams,
  unknown,
  UpdateKeyBody,
  unknown
> = async (req, res, next) => {
  try {
    const key = await updateCommandKeyService({
      commandKeyId: req.params.commandKeyId,
      sourceBlockId: req.body.sourceBlockId,
      targetBlockId: req.params.targetBlockId,
    });
    if (key) {
      return res.status(201).json(key);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateKeyTargetBlockParams = {
  commandKeyId: string;
  newTargetBlockId: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId/targetBlocks/:newTargetBlockId/assingNewBlock
// @access Private
export const updateKeyTargetBlockIdController: RequestHandler<
  UpdateKeyTargetBlockParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const key = await updateCommandKeyTargetBlockIdService({
      newTargetBlockId: req.params.newTargetBlockId,
      commandKeyId: req.params.commandKeyId,
    });
    if (key) {
      return res.status(201).json(key);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteKeyParams = {
  commandKeyId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId/targetBlocks
// @access Private
export const deleteKeyController: RequestHandler<
  DeleteKeyParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const key = await deleteCommandKeyService({
      commandKeyId: req.params.commandKeyId,
    });
    if (key) {
      return res.status(201).json(key);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
