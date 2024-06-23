import mongoose, { InferSchemaType, model } from "mongoose";

export const topologyBlockInfoSchema = new mongoose.Schema({
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  amountOfAchievements: {
    type: Number,
    default: 0,
  },
  amountOfWords: {
    type: Number,
    default: 0,
  },
  amountOfCharacterWords: {
    type: Number,
    default: 0,
  },
  amountOfAuthorWords: {
    type: Number,
    default: 0,
  },
  amountOfAmethysts: {
    type: Number,
    default: 0,
  },
});

type TopologyBlockInfo = InferSchemaType<typeof topologyBlockInfoSchema>;

export default model<TopologyBlockInfo>(
  "TopologyBlockInfo",
  topologyBlockInfoSchema
);
