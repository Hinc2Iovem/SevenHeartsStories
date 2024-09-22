import mongoose, { InferSchemaType, model } from "mongoose";

export const translationChoiceSchema = new mongoose.Schema(
  {
    commandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommand",
    },
    topologyBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopologyBlock",
    },
    language: {
      type: String,
      required: true,
    },
    translations: {
      type: [
        {
          textFieldName: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            // required: true,
          },
          amountOfWords: {
            type: Number,
            default: 0,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

translationChoiceSchema.index({ updatedAt: -1 });

export interface TranslationChoiceDocument extends Document {
  commandId?: mongoose.Schema.Types.ObjectId;
  topologyBlockId?: mongoose.Schema.Types.ObjectId;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
export default model<TranslationChoiceDocument>(
  "TranslationChoice",
  translationChoiceSchema
);
