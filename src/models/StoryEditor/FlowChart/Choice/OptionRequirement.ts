import mongoose, { InferSchemaType, model } from "mongoose";

export const flowchartCommandOptionRequirementSchema = new mongoose.Schema({
  flowchartCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandChoiceOption",
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

type FlowchartCommandOptionRequirement = InferSchemaType<
  typeof flowchartCommandOptionRequirementSchema
>;

export default model<FlowchartCommandOptionRequirement>(
  "FlowchartCommandOptionRequirement",
  flowchartCommandOptionRequirementSchema
);
