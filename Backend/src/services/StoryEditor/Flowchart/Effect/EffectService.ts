import createHttpError from "http-errors";
import Effect from "../../../../models/StoryEditor/Flowchart/Effect/Effect";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateEffectTypes = {
  flowchartCommandId: string;
};

export const createEffectService = async ({
  flowchartCommandId,
}: CreateEffectTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Effect.create({
    flowchartCommandId,
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
