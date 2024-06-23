import createHttpError from "http-errors";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../utils/validateMongoId";
import Episode from "../../../models/StoryData/Episode";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";

type TopologyBlockCreate = {
  episodeId: string;
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
};

export const topologyBlockCreateService = async ({
  episodeId,
  coordinatesX,
  coordinatesY,
}: TopologyBlockCreate) => {
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
