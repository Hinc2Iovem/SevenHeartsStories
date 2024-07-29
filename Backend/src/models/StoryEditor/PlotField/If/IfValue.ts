import mongoose, { InferSchemaType, model } from "mongoose";

export const ifValueSchema = new mongoose.Schema({
  plotFieldCommandIfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IfModel",
  },

  name: {
    type: String,
  },
  value: {
    type: Number,
  },
  sign: {
    type: String,
  },
});

type IfValue = InferSchemaType<typeof ifValueSchema>;

export default model<IfValue>("IfValue", ifValueSchema);
