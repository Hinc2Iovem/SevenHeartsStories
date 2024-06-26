import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandOptionPremiumSchema = new mongoose.Schema({
  plotFieldCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoiceOption",
  },
  priceAmethysts: {
    type: Number,
    required: true,
  },
});

type PlotFieldCommandOptionPremium = InferSchemaType<
  typeof plotFieldCommandOptionPremiumSchema
>;

export default model<PlotFieldCommandOptionPremium>(
  "PlotFieldCommandOptionPremium",
  plotFieldCommandOptionPremiumSchema
);
