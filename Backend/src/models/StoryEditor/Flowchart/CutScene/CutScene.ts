import mongoose, { InferSchemaType, model } from "mongoose";

export const cutSceneSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  cutSceneName: {
    type: String,
    required: true,
  },
});

type CutScene = InferSchemaType<typeof cutSceneSchema>;

export default model<CutScene>("CutScene", cutSceneSchema);
