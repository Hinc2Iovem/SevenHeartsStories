import mongoose, { InferSchemaType, model } from "mongoose";

export const translationSchema = new mongoose.Schema({
  commandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  appearancePartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppearancePart",
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  characterEmotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterEmotion",
  },
  commandLibraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommandLibrary",
  },
  episodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode",
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  choiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandChoiceOption",
  },
  choiceOptionCharacteristicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandOptionCharacteristic",
  },
  language: {
    type: String,
    required: true,
  },
  textFieldName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  amountOfWords: {
    type: Number,
    default: 0,
  },
});

type Translation = InferSchemaType<typeof translationSchema>;

export default model<Translation>("Translation", translationSchema);
