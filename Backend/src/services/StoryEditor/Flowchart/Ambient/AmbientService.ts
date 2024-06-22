import createHttpError from "http-errors";
import Ambient from "../../../../models/StoryEditor/Flowchart/Ambient/Ambient";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateAmbientTypes = {
  ambientName: string | undefined;
  flowchartCommandId: string;
};

export const createAmbientService = async ({
  ambientName,
  flowchartCommandId,
}: CreateAmbientTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!ambientName?.trim().length) {
    throw createHttpError(400, "Ambient is required");
  }

  return await Ambient.create({
    ambientName,
    flowchartCommandId,
  });
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
