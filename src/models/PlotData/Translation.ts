import mongoose, { InferSchemaType, model } from "mongoose";

export const translationSchema = new mongoose.Schema({
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
  },
});

type Translation = InferSchemaType<typeof translationSchema>;

export default model<Translation>("Translation", translationSchema);
