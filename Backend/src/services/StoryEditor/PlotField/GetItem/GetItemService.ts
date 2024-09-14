import createHttpError from "http-errors";
import TranslationGetItem from "../../../../models/StoryData/Translation/TranslationGetItem";
import GetItem from "../../../../models/StoryEditor/PlotField/GetItem/GetItem";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetItemByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getItemByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetItemByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingItem = await GetItem.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type CreateGetItemDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createGetItemDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateGetItemDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await TranslationGetItem.create({
    commandId: newPlotfieldCommand._id,
    language: "russian",
    topologyBlockId,
    translations: [],
  });
};

type DeleteGetItemTypes = {
  getItemId: string;
};

export const deleteGetItemService = async ({
  getItemId,
}: DeleteGetItemTypes) => {
  validateMongoId({ value: getItemId, valueName: "GetItem" });

  await GetItem.findByIdAndDelete(getItemId);

  return `GetItem with id ${getItemId} was removed`;
};
