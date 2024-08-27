import mongoose, { InferSchemaType, model } from "mongoose";

export const translationChoiceOptionSchema = new mongoose.Schema(
  {
    commandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommand",
    },
    choiceOptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommandChoiceOption",
    },
    type: {
      type: String,
      default: "common",
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

type TranslationChoiceOption = InferSchemaType<
  typeof translationChoiceOptionSchema
>;

export default model<TranslationChoiceOption>(
  "TranslationChoiceOption",
  translationChoiceOptionSchema
);
