import createHttpError from "http-errors";
import { validateMongoId } from "../../../utils/validateMongoId";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";

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
