import createHttpError from "http-errors";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../utils/validateMongoId";
import Episode from "../../../models/StoryData/Episode";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { Types } from "mongoose";
import TopologyBlockConnection from "../../../models/StoryEditor/Topology/TopologyBlockConnection";

type GetFirstTopologyBlockTypes = {
  episodeId: string;
};

export const getFirstTopologyBlockService = async ({
  episodeId,
}: GetFirstTopologyBlockTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  const existingTopologyBlock = await TopologyBlock.findOne({
    episodeId,
    isStartingTopologyBlock: true,
  })
    .lean()
    .exec();

  if (!existingTopologyBlock) {
    return null;
  }
  return existingTopologyBlock;
};

type GetTopologyBlockByEpisodeIdTypes = {
  episodeId: string;
};

export const getTopologyBlockByEpisodeIdService = async ({
  episodeId,
}: GetTopologyBlockByEpisodeIdTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  const existingTopologyBlocks = await TopologyBlock.find({
    episodeId,
  })
    .lean()
    .exec();

  if (!existingTopologyBlocks.length) {
    return [];
  }
  return existingTopologyBlocks;
};

type GetTopologyBlockByIdTypes = {
  topologyBlockId: string;
};

export const getTopologyBlockByIdService = async ({
  topologyBlockId,
}: GetTopologyBlockByIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });
  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).lean();
  if (!existingTopologyBlock) {
    return null;
  }
  return existingTopologyBlock;
};

type GetTopologyBlockByConnectionTypes = {
  sourceBlockId: string;
};

export const getTopologyBlockByConnectionService = async ({
  sourceBlockId,
}: GetTopologyBlockByConnectionTypes) => {
  validateMongoId({ value: sourceBlockId, valueName: "sourceBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    sourceBlockId
  ).lean();

  if (!existingTopologyBlock) {
    return null;
  }

  return await TopologyBlockConnection.find({ sourceBlockId }).lean();
};

type TopologyBlockCreateTypes = {
  episodeId: string;
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
};

export const unrelatedTopologyBlockCreateService = async ({
  episodeId,
  coordinatesX,
  coordinatesY,
}: TopologyBlockCreateTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  if (!coordinatesX || !coordinatesY) {
    throw createHttpError(400, "Coordinates are required");
  }

  const newTopologyBlock = await TopologyBlock.create({
    episodeId,
    coordinatesX,
    coordinatesY,
  });

  await TopologyBlockInfo.create({
    topologyBlockId: newTopologyBlock._id,
    amountOfAchievements: 0,
    amountOfAmethysts: 0,
    amountOfAuthorWords: 0,
    amountOfCharacterWords: 0,
    amountOfWords: 0,
  });
  return newTopologyBlock;
};

type TopologyBlockUpdateByCoordinatesYTypes = {
  sourceBlockId: string;
  targetBlockId: string;
};

export const unrelatedTopologyBlockUpdateByCoordinatesYService = async ({
  sourceBlockId,
  targetBlockId,
}: TopologyBlockUpdateByCoordinatesYTypes) => {
  validateMongoId({ value: targetBlockId, valueName: "targetBlock" });
  validateMongoId({ value: sourceBlockId, valueName: "sourceBlock" });

  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).exec();
  if (!existingTargetBlock) {
    throw createHttpError(400, "Such targetBlock doesn't exist");
  }

  const existingSourceBlock = await TopologyBlock.findById(
    sourceBlockId
  ).exec();
  if (!existingSourceBlock) {
    throw createHttpError(400, "Such sourceBlock doesn't exist");
  }

  if (existingSourceBlock.coordinatesY < existingTargetBlock.coordinatesY) {
    if (
      !existingTargetBlock.children.includes(new Types.ObjectId(sourceBlockId))
    ) {
      existingTargetBlock.children.push(new Types.ObjectId(sourceBlockId));
      await TopologyBlockConnection.create({
        sourceBlockId: targetBlockId,
        targetBlockId: sourceBlockId,
      });
    }
  } else if (
    existingSourceBlock.coordinatesY > existingTargetBlock.coordinatesY
  ) {
    if (
      !existingSourceBlock.children.includes(new Types.ObjectId(targetBlockId))
    )
      existingSourceBlock.children.push(new Types.ObjectId(targetBlockId));
    await TopologyBlockConnection.create({ sourceBlockId, targetBlockId });
  }

  await existingSourceBlock.save();
  await existingTargetBlock.save();
  return existingSourceBlock;
};

type TopologyBlockUpdateCoordinates = {
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
  topologyBlockId: string;
};

export const topologyBlockUpdateCoordinatesService = async ({
  coordinatesX,
  coordinatesY,
  topologyBlockId,
}: TopologyBlockUpdateCoordinates) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  if (coordinatesX) {
    existingTopologyBlock.coordinatesX = coordinatesX;
  }
  if (coordinatesY) {
    existingTopologyBlock.coordinatesY = coordinatesY;
  }

  return await existingTopologyBlock.save();
};

type TopologyBlockUpdateName = {
  newName: string | undefined;
  topologyBlockId: string;
};

export const topologyBlockUpdateNameService = async ({
  newName,
  topologyBlockId,
}: TopologyBlockUpdateName) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  if (!newName?.trim().length) {
    return existingTopologyBlock;
  }

  existingTopologyBlock.name = newName;

  return await existingTopologyBlock.save();
};

type TopologyBlockDelete = {
  topologyBlockId: string;
};

export const topologyBlockDeleteService = async ({
  topologyBlockId,
}: TopologyBlockDelete) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();

  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  await existingTopologyBlock.deleteOne();

  return `Topology block with id: ${topologyBlockId} was removed`;
};
