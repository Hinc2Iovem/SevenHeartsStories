import createHttpError from "http-errors";
import Effect from "../../../../models/StoryEditor/PlotField/Effect/Effect";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetEffectByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getEffectByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetEffectByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingEffect = await Effect.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingEffect) {
    return null;
  }

  return existingEffect;
};

type CreateEffectTypes = {
  plotFieldCommandId: string;
};

export const createEffectService = async ({
  plotFieldCommandId,
}: CreateEffectTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Effect.create({
    plotFieldCommandId,
  });
};

type CreateEffectDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createEffectDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateEffectDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Effect.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateEffectTypes = {
  effectName: string | undefined;
  effectId: string;
};

export const updateEffectService = async ({
  effectName,
  effectId,
}: UpdateEffectTypes) => {
  validateMongoId({ value: effectId, valueName: "Effect" });

  const existingEffect = await Effect.findById(effectId).exec();
  if (!existingEffect) {
    throw createHttpError(400, "Effect with such id wasn't found");
  }

  if (!effectName?.trim().length) {
    throw createHttpError(400, "Effect is required");
  }

  existingEffect.effectName = effectName;

  return await existingEffect.save();
};

type DeleteEffectTypes = {
  effectId: string;
};

export const deleteEffectService = async ({ effectId }: DeleteEffectTypes) => {
  validateMongoId({ value: effectId, valueName: "Effect" });

  await Effect.findByIdAndDelete(effectId);

  return `Effect with id ${effectId} was removed`;
};
