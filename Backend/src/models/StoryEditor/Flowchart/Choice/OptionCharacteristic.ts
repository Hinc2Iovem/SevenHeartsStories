import mongoose, { InferSchemaType, model } from "mongoose";

export const flowchartCommandOptionCharacteristicSchema = new mongoose.Schema({
  flowchartCommandChoiceOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandChoiceOption",
  },
  amountOfPoints: {
    type: Number,
  },
  characterCharacteristicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterCharacteristic",
  },
});

type FlowchartCommandOptionCharacteristic = InferSchemaType<
  typeof flowchartCommandOptionCharacteristicSchema
>;

export default model<FlowchartCommandOptionCharacteristic>(
  "FlowchartCommandOptionCharacteristic",
  flowchartCommandOptionCharacteristicSchema
);
