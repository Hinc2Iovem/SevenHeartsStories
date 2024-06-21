import mongoose, {InferSchemaType, model} from "mongoose";

export const staffInfoSchema = new mongoose.Schema({
	staffId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Staff",
	},
	amountOfFinishedEpisodes: {
		type: Number,
	},
});

type StaffInfo = InferSchemaType<typeof staffInfoSchema>;

export default model<StaffInfo>("StaffInfo", staffInfoSchema);
