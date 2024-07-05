import createHttpError from "http-errors";
import IfModel from "../../../../models/StoryEditor/PlotField/If/IfModel";
import IfValue from "../../../../models/StoryEditor/PlotField/If/IfValue";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { SignTypes } from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";

type GetByIfIdTypes = {
  ifId: string;
};

export const getIfValueByIfIdService = async ({ ifId }: GetByIfIdTypes) => {
  validateMongoId({
    value: ifId,
    valueName: "PlotFieldCommand",
  });

  const existingIfValue = await IfValue.find({
    plotFieldCommandIfId: ifId,
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
  ifValueId: string;
};

export const updateIfValueService = async ({
  ifValueId,
  name,
  sign,
  value,
}: UpdateIfValueTypes) => {
  validateMongoId({ value: ifValueId, valueName: "IfValue" });

  const existingIfValue = await IfValue.findById(ifValueId).exec();
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
  ifValueId: string;
};

export const deleteIfValueService = async ({
  ifValueId,
}: DeleteIfValueTypes) => {
  validateMongoId({ value: ifValueId, valueName: "IfValue" });

  await IfValue.findByIdAndDelete(ifValueId);

  return `IfValue with id ${ifValueId} was removed`;
};
