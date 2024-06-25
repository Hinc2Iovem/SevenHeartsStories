import mongoose from "mongoose";
import TopologyBlockConnection from "../models/StoryEditor/Topology/TopologyBlockConnection";

type CreateTopologyBlockTypes = {
  sourceBlockId: mongoose.Types.ObjectId;
  targetBlockId: mongoose.Types.ObjectId;
};

export const createTopologyBlockConnection = async ({
  sourceBlockId,
  targetBlockId,
}: CreateTopologyBlockTypes) => {
  return await TopologyBlockConnection.create({ sourceBlockId, targetBlockId });
};
