import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Suit from "../../../../models/StoryEditor/PlotField/Suit/Suit";

type CreateSuitTypes = {
  plotFieldCommandId: string;
};

export const createSuitService = async ({
  plotFieldCommandId,
}: CreateSuitTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Suit.create({
    plotFieldCommandId,
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
