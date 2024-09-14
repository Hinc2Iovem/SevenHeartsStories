import { RequestHandler } from "express";
import {
  createCommandKeyService,
  deleteCommandKeyService,
  getKeyByPlotFieldCommandIdService,
  updateCommandKeyService,
  getKeyByStoryIdService,
  createKeyDuplicateService,
} from "../../../../services/StoryEditor/PlotField/Key/KeyService";

type GetKeyByStoryIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/stories/:storyId/keys
// @access Private
export const getKeyByStoryIdController: RequestHandler<
  GetKeyByStoryIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const key = await getKeyByStoryIdService({
      storyId: req.params.storyId,
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

type GetKeyByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/keys
// @access Private
export const getKeyByPlotFieldCommandIdController: RequestHandler<
  GetKeyByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const key = await getKeyByPlotFieldCommandIdService({
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

type CreateKeyDuplicateParams = {
  topologyBlockId: string;
  storyId: string;
};

type CreateKeyDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/keys/stories/:storyId/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createKeyDuplicateController: RequestHandler<
  CreateKeyDuplicateParams,
  unknown,
  CreateKeyDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const key = await createKeyDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      storyId: req.params.storyId,
      commandOrder: req.body.commandOrder,
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
type CreateKeyParams = {
  plotFieldCommandId: string;
  storyId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/stories/:storyId/keys
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
      storyId: req.params.storyId,
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
};

type UpdateKeyBody = {
  text: string;
};
// @route PATCH http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId/text
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
      text: req.body.text,
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

// type UpdateKeyTargetBlockParams = {
//   commandKeyId: string;
//   newTargetBlockId: string;
// };

// // @route PATCH http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId/targetBlocks/:newTargetBlockId/assingNewBlock
// // @access Private
// export const updateKeyTargetBlockIdController: RequestHandler<
//   UpdateKeyTargetBlockParams,
//   unknown,
//   unknown,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const key = await updateCommandKeyTargetBlockIdService({
//       newTargetBlockId: req.params.newTargetBlockId,
//       commandKeyId: req.params.commandKeyId,
//     });
//     if (key) {
//       return res.status(201).json(key);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

type DeleteKeyParams = {
  commandKeyId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/commandKeys/:commandKeyId
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
