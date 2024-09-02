import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "choiceQuestion"
// choiceType = multiple | common | timelimit

export const plotFieldCommandChoiceSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  choiceType: {
    type: String,
  },
  exitBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  isAuthor: {
    type: Boolean,
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  characterEmotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterEmotion",
  },
  timeLimit: {
    type: Number,
  },
  timeLimitDefaultOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoiceOption",
  },
  amountOfOptions: {
    type: Number,
    default: 0,
  },
});

type PlotFieldCommandChoice = InferSchemaType<
  typeof plotFieldCommandChoiceSchema
>;

export default model<PlotFieldCommandChoice>(
  "PlotFieldCommandChoice",
  plotFieldCommandChoiceSchema
);
