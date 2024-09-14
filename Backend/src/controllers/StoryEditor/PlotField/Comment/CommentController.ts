import { RequestHandler } from "express";
import {
  createCommentDuplicateService,
  createCommentService,
  deleteCommentService,
  getCommentByPlotFieldCommandIdService,
  updateCommentService,
} from "../../../../services/StoryEditor/PlotField/Comment/CommentService";

type GetCommentByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/comments
// @access Private
export const getCommentByPlotFieldCommandIdController: RequestHandler<
  GetCommentByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const comment = await getCommentByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateCommentParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/comments
// @access Private
export const createCommentController: RequestHandler<
  CreateCommentParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const comment = await createCommentService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateCommentDuplicateParams = {
  topologyBlockId: string;
};

type CreateCommentDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/comments/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createCommentDuplicateController: RequestHandler<
  CreateCommentDuplicateParams,
  unknown,
  CreateCommentDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const comment = await createCommentDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
    });
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateCommentParams = {
  commentId: string;
};

type UpdateCommentBody = {
  comment: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/comments/:commentId
// @access Private
export const updateCommentController: RequestHandler<
  UpdateCommentParams,
  unknown,
  UpdateCommentBody,
  unknown
> = async (req, res, next) => {
  try {
    const comment = await updateCommentService({
      commentId: req.params.commentId,
      comment: req.body.comment,
    });
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteCommentParams = {
  commentId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/comments/:commentId
// @access Private
export const deleteCommentController: RequestHandler<
  DeleteCommentParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const comment = await deleteCommentService({
      commentId: req.params.commentId,
    });
    if (comment) {
      return res.status(201).json(comment);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
