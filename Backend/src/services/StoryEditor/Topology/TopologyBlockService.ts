import createHttpError from "http-errors";
import { Types } from "mongoose";
import Episode from "../../../models/StoryData/Episode";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockConnection from "../../../models/StoryEditor/Topology/TopologyBlockConnection";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { validateMongoId } from "../../../utils/validateMongoId";

type GetTargetBlocksBySourceBlockIdTypes = {
  sourceBlockId: string;
};

export const getTargetBlocksBySourceBlockIdService = async ({
  sourceBlockId,
}: GetTargetBlocksBySourceBlockIdTypes) => {
  validateMongoId({ value: sourceBlockId, valueName: "sourceBlock" });

  const existingTargetBlocks = await TopologyBlockConnection.find({
    sourceBlockId,
  }).exec();

  if (!existingTargetBlocks.length) {
    return [];
  }

  const allTargetBlocks = [];
  for (const tb of existingTargetBlocks) {
    const existingTopologyBlock = await TopologyBlock.findById(tb.targetBlockId)
      .lean()
      .exec();
    if (existingTopologyBlock) {
      allTargetBlocks.push(existingTopologyBlock);
    }
  }
  return allTargetBlocks;
};

type GetSourceBlocksByTargetBlockIdTypes = {
  targetBlockId: string;
};

export const getSourceBlocksByTargetBlockIdService = async ({
  targetBlockId,
}: GetSourceBlocksByTargetBlockIdTypes) => {
  validateMongoId({ value: targetBlockId, valueName: "targetBlock" });

  const existingTargetBlock = await TopologyBlockConnection.find({
    targetBlockId,
  }).exec();
  if (!existingTargetBlock.length) {
    return [];
  }

  const allSourceBlocks = [];
  for (const tb of existingTargetBlock) {
    const existingTopologyBlock = await TopologyBlock.findById(tb.sourceBlockId)
      .lean()
      .exec();
    if (existingTopologyBlock) {
      allSourceBlocks.push(existingTopologyBlock);
    }
  }
  return allSourceBlocks;
};

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

type GetTopologyBlockConnectionByEpisodeIdTypes = {
  episodeId: string;
};

export const getTopologyBlockConnectionByEpisodeIdService = async ({
  episodeId,
}: GetTopologyBlockConnectionByEpisodeIdTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  const existingTopologyBlockConnections = await TopologyBlockConnection.find({
    episodeId,
  })
    .lean()
    .exec();

  if (!existingTopologyBlockConnections.length) {
    return [];
  }
  return existingTopologyBlockConnections;
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
    throw createHttpError(400, "Topology Block with such id doesn't exist");
  }

  const existingTopologyBlocksConnection = await TopologyBlockConnection.find({
    sourceBlockId,
  }).lean();

  if (!existingTopologyBlocksConnection.length) {
    return [];
  }

  return existingTopologyBlocksConnection;
};

type TopologyBlockCreateTypes = {
  episodeId: string;
};

export const unrelatedTopologyBlockCreateService = async ({
  episodeId,
}: TopologyBlockCreateTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  const amountOfTopologyBlockInEpisode = await TopologyBlock.find({
    episodeId,
  }).countDocuments();

  const lastTopologyBlock = await TopologyBlock.findOne({
    episodeId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(1)
    .lean();

  const newTopologyBlock = await TopologyBlock.create({
    episodeId,
    coordinatesX: lastTopologyBlock?.coordinatesX || 0,
    coordinatesY: (lastTopologyBlock?.coordinatesY || 0) + 50 || 150,
    name: `Блок - ${amountOfTopologyBlockInEpisode}`,
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

  if (coordinatesX || coordinatesX === 0) {
    existingTopologyBlock.coordinatesX = coordinatesX;
  }
  if (coordinatesY || coordinatesY === 0) {
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

type TopologyBlockUpdateTopologyBlockInfo = {
  addOrMinusAmountOfCommand?: string;
  topologyBlockId: string;
};

export const topologyBlockUpdateTopologyBlockInfoService = async ({
  addOrMinusAmountOfCommand,
  topologyBlockId,
}: TopologyBlockUpdateTopologyBlockInfo) => {
  validateMongoId({ value: topologyBlockId, valueName: "topologyBlock" });

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such topologyBlock doesn't exist");
  }

  console.log("addOrMinusAmountOfCommand: ", addOrMinusAmountOfCommand);

  if (addOrMinusAmountOfCommand?.trim().length) {
    if (
      addOrMinusAmountOfCommand.toLowerCase() !== "add" &&
      addOrMinusAmountOfCommand.toLowerCase() !== "minus"
    ) {
      throw createHttpError(
        400,
        "Value for addOrMinusAmountOfCommand may only be equal to add or minus"
      );
    }

    if (existingTopologyBlock.topologyBlockInfo) {
      existingTopologyBlock.topologyBlockInfo.amountOfCommands +=
        addOrMinusAmountOfCommand.trim().toLowerCase() === "add" ? 1 : -1;
    } else {
      const newTopologyBlockInfo = {
        amountOfCommands: 1,
        amountOfAchievements: 0,
      };
      existingTopologyBlock.topologyBlockInfo = newTopologyBlockInfo;
    }
  }

  return await existingTopologyBlock.save();
};

type TopologyBlockCreateConnection = {
  targetBlockId: string;
  episodeId: string;
  sourceBlockId: string;
};

export const topologyBlockCreateConnectionService = async ({
  sourceBlockId,
  episodeId,
  targetBlockId,
}: TopologyBlockCreateConnection) => {
  validateMongoId({ value: targetBlockId, valueName: "targetBlock" });
  validateMongoId({ value: episodeId, valueName: "Episode" });
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

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  const existingConnection = await TopologyBlockConnection.findOne({
    sourceBlockId,
    targetBlockId,
    episodeId,
  });

  if (existingConnection) {
    throw createHttpError(400, "Such Connection already exists");
  }

  return await TopologyBlockConnection.create({
    sourceBlockId,
    targetBlockId,
    episodeId,
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
