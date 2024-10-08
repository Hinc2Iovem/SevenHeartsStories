import mongoose, { InferSchemaType, model } from "mongoose";

export const staffSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  roles: {
    type: [String],
    default: "scriptwriter",
  },
  imgUrl: {
    type: String,
  },
  amountOfFinishedEpisodes: {
    type: Number,
  },
});

type Staff = InferSchemaType<typeof staffSchema>;

export default model<Staff>("Staff", staffSchema);
