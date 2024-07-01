import createHttpError from "http-errors";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../utils/validateMongoId";
import Episode from "../../../models/StoryData/Episode";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { Types } from "mongoose";
import TopologyBlockConnection from "../../../models/StoryEditor/Topology/TopologyBlockConnection";
import { SexualOrientationTypes } from "../../../consts/SEXUAL_ORIENTATION";

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

type TopologyBlockUpdateSexualOrientations = {
  sexualOrientationType: string | undefined;
  topologyBlockId: string;
};

export const topologyBlockUpdateSexualOrientationsService = async ({
  sexualOrientationType,
  topologyBlockId,
}: TopologyBlockUpdateSexualOrientations) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  if (
    sexualOrientationType &&
    SexualOrientationTypes.includes(sexualOrientationType.toLowerCase())
  ) {
    existingTopologyBlock.sexualOrientationType =
      sexualOrientationType.toLowerCase();
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

type TopologyBlockCreateConnection = {
  targetBlockId: string;
  sourceBlockId: string;
};

export const topologyBlockCreateConnectionService = async ({
  sourceBlockId,
  targetBlockId,
}: TopologyBlockCreateConnection) => {
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

  return await TopologyBlockConnection.create({
    sourceBlockId,
    targetBlockId,
  });
};

type TopologyBlockUpdateConnection = {
  targetBlockId: string;
  newTargetBlockId: string;
  sourceBlockId: string;
};

export const topologyBlockUpdateConnectionService = async ({
  sourceBlockId,
  newTargetBlockId,
  targetBlockId,
}: TopologyBlockUpdateConnection) => {
  validateMongoId({ value: targetBlockId, valueName: "targetBlock" });
  validateMongoId({ value: sourceBlockId, valueName: "sourceBlock" });
  validateMongoId({ value: newTargetBlockId, valueName: "NewTargetBlock" });

  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).exec();
  if (!existingTargetBlock) {
    throw createHttpError(400, "Such targetBlock doesn't exist");
  }
  const existingNewTargetBlock = await TopologyBlock.findById(
    newTargetBlockId
  ).exec();
  if (!existingNewTargetBlock) {
    throw createHttpError(400, "Such newTargetBlock doesn't exist");
  }
  const existingSourceBlock = await TopologyBlock.findById(
    sourceBlockId
  ).exec();
  if (!existingSourceBlock) {
    throw createHttpError(400, "Such sourceBlock doesn't exist");
  }

  const existingConnection = await TopologyBlockConnection.findOne({
    sourceBlockId,
    targetBlockId,
  }).exec();
  if (!existingConnection) {
    return await TopologyBlockConnection.create({
      sourceBlockId,
      targetBlockId: newTargetBlockId,
    });
  }
  existingConnection.targetBlockId = new Types.ObjectId(newTargetBlockId);
  return await existingConnection.save();
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
