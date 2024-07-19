import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandBackgroundSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  backgroundName: {
    type: String,
  },
  pointOfMovement: {
    type: String,
  },
  musicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Music",
  },
  imgUrl: {
    type: String,
  },
});

type PlotFieldCommandBackground = InferSchemaType<
  typeof plotFieldCommandBackgroundSchema
>;

export default model<PlotFieldCommandBackground>(
  "PlotFieldCommandBackground",
  plotFieldCommandBackgroundSchema
);
