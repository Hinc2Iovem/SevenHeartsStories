import GetItem from "../../../../models/StoryEditor/PlotField/GetItem/GetItem";
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
