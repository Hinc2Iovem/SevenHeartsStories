import createHttpError from "http-errors";
import Ambient from "../../../../models/StoryEditor/Flowchart/Ambient/Ambient";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateAmbientTypes = {
  flowchartCommandId: string;
};

export const createAmbientService = async ({
  flowchartCommandId,
}: CreateAmbientTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Ambient.create({
    flowchartCommandId,
  });
};

type UpdateAmbientTypes = {
  ambientName: string | undefined;
  ambientId: string;
};

export const updateAmbientService = async ({
  ambientId,
  ambientName,
}: UpdateAmbientTypes) => {
  validateMongoId({ value: ambientId, valueName: "Ambient" });

  const existingAmbient = await Ambient.findById(ambientId).exec();
  if (!existingAmbient) {
    throw createHttpError(400, "Ambient with such id wasn't found");
  }

  if (!ambientName?.trim().length) {
    throw createHttpError(400, "Ambient is required");
  }

  existingAmbient.ambientName = ambientName;

  return await existingAmbient.save();
};

type DeleteAmbientTypes = {
  ambientId: string;
};

export const deleteAmbientService = async ({
  ambientId,
}: DeleteAmbientTypes) => {
  validateMongoId({ value: ambientId, valueName: "Ambient" });

  await Ambient.findByIdAndDelete(ambientId);

  return `Ambient with id ${ambientId} was removed`;
};
