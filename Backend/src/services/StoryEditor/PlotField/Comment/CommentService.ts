import createHttpError from "http-errors";
import { Types } from "mongoose";
import Comment from "../../../../models/StoryEditor/PlotField/Comment/Comment";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";

type GetCommentByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getCommentByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetCommentByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingComment = await Comment.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingComment) {
    return null;
  }

  return existingComment;
};

type CreateCommentTypes = {
  plotFieldCommandId: string;
};

export const createCommentService = async ({
  plotFieldCommandId,
}: CreateCommentTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Comment.create({
    plotFieldCommandId,
  });
};

type UpdateCommentTypes = {
  commentId: string;
  comment?: string;
};

export const updateCommentService = async ({
  comment,
  commentId,
}: UpdateCommentTypes) => {
  validateMongoId({ value: commentId, valueName: "Comment" });

  const existingComment = await Comment.findById(commentId).exec();
  if (!existingComment) {
    throw createHttpError(400, "Comment with such id wasn't found");
  }

  if (comment?.trim().length) {
    existingComment.comment = comment;
    return await existingComment.save();
  } else {
    return existingComment;
  }
};

type DeleteCommentTypes = {
  commentId: string;
};

export const deleteCommentService = async ({
  commentId,
}: DeleteCommentTypes) => {
  validateMongoId({ value: commentId, valueName: "Comment" });

  await Comment.findByIdAndDelete(commentId);

  return `Comment with id ${commentId} was removed`;
};
