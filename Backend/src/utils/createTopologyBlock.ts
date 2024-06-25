import mongoose, { Types } from "mongoose";
import TopologyBlock from "../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../models/StoryEditor/Topology/TopologyBlockInfo";

type CreateTopologyBlockTypes = {
  coordinatesX: number | undefined;
  coordinatesY: number | undefined;
  episodeId: mongoose.Types.ObjectId;
  choiceOptionId?: mongoose.Types.ObjectId;
  isStartingTopologyBlock?: boolean;
  sourceBlockId: mongoose.Types.ObjectId;
  name: string;
};

export const createTopologyBlock = async ({
  coordinatesX,
  coordinatesY,
  episodeId,
  name,
  sourceBlockId,
  choiceOptionId,
  isStartingTopologyBlock,
}: CreateTopologyBlockTypes) => {
  const parentTopologyBlock = await TopologyBlock.findById(
    sourceBlockId
  ).exec();

  const newBlock = await TopologyBlock.create({
    coordinatesX,
    coordinatesY,
    episodeId,
    name,
    sourceBlockId,
    choiceOptionId,
    isStartingTopologyBlock,
  });
  if (!parentTopologyBlock?.children.includes(newBlock._id)) {
    parentTopologyBlock?.children.push(newBlock._id);
  }

  await TopologyBlockInfo.create({
    topologyBlockId: newBlock._id,
    amountOfAchievements: 0,
    amountOfAmethysts: 0,
    amountOfAuthorWords: 0,
    amountOfCharacterWords: 0,
    amountOfWords: 0,
  });
  return newBlock;
};
