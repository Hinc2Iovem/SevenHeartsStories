import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Suit from "../../../../models/StoryEditor/Flowchart/Suit/Suit";

type CreateSuitTypes = {
  flowchartCommandId: string;
};

export const createSuitService = async ({
  flowchartCommandId,
}: CreateSuitTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Suit.create({
    flowchartCommandId,
  });
};

type UpdateSuitTypes = {
  suitName: string | undefined;
  suitId: string;
};

export const updateSuitService = async ({
  suitName,
  suitId,
}: UpdateSuitTypes) => {
  validateMongoId({ value: suitId, valueName: "Suit" });

  const existingSuit = await Suit.findById(suitId).exec();
  if (!existingSuit) {
    throw createHttpError(400, "Suit with such id wasn't found");
  }

  if (!suitName?.trim().length) {
    throw createHttpError(400, "Suit is required");
  }

  existingSuit.suitName = suitName;

  return await existingSuit.save();
};

type DeleteSuitTypes = {
  suitId: string;
};

export const deleteSuitService = async ({ suitId }: DeleteSuitTypes) => {
  validateMongoId({ value: suitId, valueName: "Suit" });

  await Suit.findByIdAndDelete(suitId);

  return `Suit with id ${suitId} was removed`;
};
