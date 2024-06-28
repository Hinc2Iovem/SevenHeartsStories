import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import GetItem from "../../../../models/StoryEditor/PlotField/GetItem/GetItem";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";

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

type CreateGetItemTypes = {
  plotFieldCommandId: string;
};

export const createGetItemService = async ({
  plotFieldCommandId,
}: CreateGetItemTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await GetItem.create({
    plotFieldCommandId,
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
