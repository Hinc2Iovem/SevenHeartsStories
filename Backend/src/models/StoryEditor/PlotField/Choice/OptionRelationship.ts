import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandOptionRelationshipSchema = new mongoose.Schema({
  plotFieldCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoiceOption",
  },
  characterName: {
    type: String,
    required: true,
  },
  amountOfPoints: {
    type: Number,
    required: true,
  },
});

type PlotFieldCommandOptionRelationship = InferSchemaType<
  typeof plotFieldCommandOptionRelationshipSchema
>;

export default model<PlotFieldCommandOptionRelationship>(
  "PlotFieldCommandOptionRelationship",
  plotFieldCommandOptionRelationshipSchema
);
