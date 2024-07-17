import createHttpError from "http-errors";
import IfModel from "../../../../models/StoryEditor/PlotField/If/IfModel";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import IfValue from "../../../../models/StoryEditor/PlotField/If/IfValue";

type GetIfByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getIfByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetIfByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingIf = await IfModel.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingIf) {
    return null;
  }

  return existingIf;
};

type CreateIfTypes = {
  plotFieldCommandId: string;
};

export const createIfService = async ({
  plotFieldCommandId,
}: CreateIfTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const condition = await IfModel.create({
    plotFieldCommandId,
  });

  await IfValue.create({ plotFieldCommandIfId: condition._id });
  return condition;
};

// type AddAnotherValueBlockTypes = {
//   commandIfId: string;
// };

// export const addAnotherBlockIfService = async ({
//   commandIfId,
// }: AddAnotherValueBlockTypes) => {
//   validateMongoId({ value: commandIfId, valueName: "CommandIf" });

//   const existingCommandIfId = await IfModel.findById(commandIfId).lean();
//   if (!existingCommandIfId) {
//     throw createHttpError(400, "CommandIfId with such id wasn't found");
//   }

//   return await IfValue.create({ plotFieldCommandIfId: commandIfId });
// };

type DeleteIfTypes = {
  ifId: string;
};

export const deleteIfService = async ({ ifId }: DeleteIfTypes) => {
  validateMongoId({ value: ifId, valueName: "If" });

  await IfModel.findByIdAndDelete(ifId);

  const ifValues = await IfValue.find({
    plotFieldCommandIfId: ifId,
  }).exec();
  for (const c of ifValues) {
    await c.deleteOne();
  }

  return `If command with id ${ifId} was removed`;
};
