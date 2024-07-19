import mongoose, { InferSchemaType, model } from "mongoose";

export const cutSceneSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  cutSceneName: {
    type: String,
  },
});

type CutScene = InferSchemaType<typeof cutSceneSchema>;

export default model<CutScene>("CutScene", cutSceneSchema);
