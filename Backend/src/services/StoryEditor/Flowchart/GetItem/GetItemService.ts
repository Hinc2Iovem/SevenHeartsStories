import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import GetItem from "../../../../models/StoryEditor/Flowchart/GetItem/GetItem";

type CreateGetItemTypes = {
  flowchartCommandId: string;
};

export const createGetItemService = async ({
  flowchartCommandId,
}: CreateGetItemTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await GetItem.create({
    flowchartCommandId,
  });
};

type UpdateGetItemTypes = {
  getItemId: string;
  buttonText: string | undefined;
  itemDescription: string | undefined;
  itemName: string | undefined;
};

export const updateGetItemService = async ({
  getItemId,
  buttonText,
  itemDescription,
  itemName,
}: UpdateGetItemTypes) => {
  validateMongoId({ value: getItemId, valueName: "GetItem" });

  const existingGetItem = await GetItem.findById(getItemId).exec();

  if (!existingGetItem) {
    throw createHttpError(400, "GetItem with such id wasn't found");
  }
  if (buttonText?.trim().length) {
    existingGetItem.buttonText = buttonText;
  }
  if (itemDescription?.trim().length) {
    existingGetItem.itemDescription = itemDescription;
  }
  if (itemName?.trim().length) {
    existingGetItem.itemName = itemName;
  }

  return await existingGetItem.save();
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
