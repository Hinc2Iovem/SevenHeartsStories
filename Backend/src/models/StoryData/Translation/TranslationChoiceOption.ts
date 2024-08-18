import mongoose, { InferSchemaType, model } from "mongoose";

export const translationChoiceSchema = new mongoose.Schema(
  {
    plotFieldCommandChoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommandChoice",
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

type TranslationChoice = InferSchemaType<typeof translationChoiceSchema>;

export default model<TranslationChoice>(
  "TranslationChoice",
  translationChoiceSchema
);
