import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Suit from "../../../../models/StoryEditor/Flowchart/Suit/Suit";

type CreateSuitTypes = {
  suitName: string | undefined;
  flowchartCommandId: string;
};

export const createSuitService = async ({
  suitName,
  flowchartCommandId,
}: CreateSuitTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!suitName?.trim().length) {
    throw createHttpError(400, "Suit is required");
  }

  return await Suit.create({
    suitName,
    flowchartCommandId,
  });
};

type DeleteSuitTypes = {
  suitId: string;
};

export const deleteSuitService = async ({ suitId }: DeleteSuitTypes) => {
  validateMongoId({ value: suitId, valueName: "Suit" });

  await Suit.findByIdAndDelete(suitId);

  return `Suit with id ${suitId} was removed`;
};
