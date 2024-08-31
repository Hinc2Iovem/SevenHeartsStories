import { RequestHandler } from "express";
import {
  addAnotherBlockConditionService,
  getConditionBlocksByCommandConditionIdService,
  updateBlockConditionOrderOfExecutionService,
  updateBlockConditionTopologyBlockService,
} from "../../../../services/StoryEditor/PlotField/Condition/ConditionBlockService";

type GetConditionBlocksByCommandConditionIdParams = {
  commandConditionId: string;
};

// @route GET http://localhost:3500/commandConditions/:commandConditionId/conditionBlocks
// @access Private
export const getConditionBlocksByCommandConditionIdController: RequestHandler<
  GetConditionBlocksByCommandConditionIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await getConditionBlocksByCommandConditionIdService({
      commandConditionId: req.params.commandConditionId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type AddAnotherConditionBlockTypes = {
  commandConditionId: string;
};

// @route POST http://localhost:3500/commandConditions/:commandConditionId/conditionBlocks
// @access Private
export const addAnotherBlockConditionController: RequestHandler<
  AddAnotherConditionBlockTypes,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await addAnotherBlockConditionService({
      commandConditionId: req.params.commandConditionId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateConditionBlockTopologyBlockTypes = {
  conditionBlockId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

// @route POST http://localhost:3500/commandConditions/conditionBlocks/:conditionBlockId/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId
// @access Private
export const updateBlockConditionTopologyBlockController: RequestHandler<
  UpdateConditionBlockTopologyBlockTypes,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await updateBlockConditionTopologyBlockService({
      conditionBlockId: req.params.conditionBlockId,
      targetBlockId: req.params.targetBlockId,
      sourceBlockId: req.params.sourceBlockId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateConditionBlockOrderOfExecutionTypes = {
  conditionBlockId: string;
};
type UpdateConditionBlockOrderOfExecutionBody = {
  orderOfExecution: number;
};

// @route POST http://localhost:3500/commandConditions/conditionBlocks/:conditionBlockId/orderOfExecution
// @access Private
export const updateBlockConditionOrderOfExecutionController: RequestHandler<
  UpdateConditionBlockOrderOfExecutionTypes,
  unknown,
  UpdateConditionBlockOrderOfExecutionBody,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await updateBlockConditionOrderOfExecutionService({
      conditionBlockId: req.params.conditionBlockId,
      orderOfExecution: req.body.orderOfExecution,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// type DeleteConditionParams = {
//   conditionId: string;
// };

// // @route DELETE http://localhost:3500/plotFieldCommands/conditions/:conditionId
// // @access Private
// export const deleteConditionController: RequestHandler<
//   DeleteConditionParams,
//   unknown,
//   unknown,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const condition = await deleteConditionService({
//       conditionId: req.params.conditionId,
//     });
//     if (condition) {
//       return res.status(201).json(condition);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
