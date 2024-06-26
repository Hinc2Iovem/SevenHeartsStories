import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandOptionCharacteristicSchema = new mongoose.Schema({
  plotFieldCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoiceOption",
  },
  amountOfPoints: {
    type: Number,
  },
  characterCharacteristicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterCharacteristic",
  },
});

type PlotFieldCommandOptionCharacteristic = InferSchemaType<
  typeof plotFieldCommandOptionCharacteristicSchema
>;

export default model<PlotFieldCommandOptionCharacteristic>(
  "PlotFieldCommandOptionCharacteristic",
  plotFieldCommandOptionCharacteristicSchema
);
