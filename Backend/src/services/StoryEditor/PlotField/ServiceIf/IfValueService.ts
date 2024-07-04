import createHttpError from "http-errors";
import IfModel from "../../../../models/StoryEditor/PlotField/If/IfModel";
import IfValue from "../../../../models/StoryEditor/PlotField/If/IfValue";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { SignTypes } from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";

type GetByPlotFieldCommandIfIdTypes = {
  plotFieldCommandIfId: string;
};

export const getIfValueByPlotFieldCommandIfIdService = async ({
  plotFieldCommandIfId,
}: GetByPlotFieldCommandIfIdTypes) => {
  validateMongoId({
    value: plotFieldCommandIfId,
    valueName: "PlotFieldCommand",
  });

  const existingIfValue = await IfValue.find({
    plotFieldCommandIfId,
  }).lean();

  if (!existingIfValue.length) {
    return [];
  }

  return existingIfValue;
};

type CreateIfValueTypes = {
  ifId: string;
};

export const createIfValueService = async ({ ifId }: CreateIfValueTypes) => {
  validateMongoId({ value: ifId, valueName: "If" });

  const existingIf = await IfModel.findById(ifId).lean();
  if (!existingIf) {
    throw createHttpError(400, "If with such id wasn't found");
  }

  return await IfValue.create({
    plotFieldCommandIfId: ifId,
  });
};

const regexSign = /^(>|<|<=|>=|=)$/;

type UpdateIfValueTypes = {
  name: string | undefined;
  sign: SignTypes | undefined;
  value: number | undefined;
  IfValueId: string;
};

export const updateIfValueService = async ({
  IfValueId,
  name,
  sign,
  value,
}: UpdateIfValueTypes) => {
  validateMongoId({ value: IfValueId, valueName: "IfValue" });

  const existingIfValue = await IfValue.findById(IfValueId).exec();
  if (!existingIfValue) {
    throw createHttpError(400, "IfValue with such id wasn't found");
  }

  if (!sign || !value || !name?.trim().length) {
    throw createHttpError(400, "Sign, value and name are required");
  }

  if (!regexSign.test(sign)) {
    throw createHttpError(400, "Sign can only be equal to: >,<,<=,>=,=");
  }

  existingIfValue.name = name;
  existingIfValue.sign = sign;
  existingIfValue.value = value;

  return await existingIfValue.save();
};

type DeleteIfValueTypes = {
  IfValueId: string;
};

export const deleteIfValueService = async ({
  IfValueId,
}: DeleteIfValueTypes) => {
  validateMongoId({ value: IfValueId, valueName: "IfValue" });

  await IfValue.findByIdAndDelete(IfValueId);

  return `IfValue with id ${IfValueId} was removed`;
};
