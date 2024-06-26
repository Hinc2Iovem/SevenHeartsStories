import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandOptionRequirementSchema = new mongoose.Schema({
  plotFieldCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoiceOption",
  },
  requiredKey: {
    type: String,
  },
  requiredCharacteristic: {
    type: String,
  },
  amountOfPoints: {
    type: Number,
  },
});

type PlotFieldCommandOptionRequirement = InferSchemaType<
  typeof plotFieldCommandOptionRequirementSchema
>;

export default model<PlotFieldCommandOptionRequirement>(
  "PlotFieldCommandOptionRequirement",
  plotFieldCommandOptionRequirementSchema
);
