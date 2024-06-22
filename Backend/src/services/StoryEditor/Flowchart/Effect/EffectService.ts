import createHttpError from "http-errors";
import Effect from "../../../../models/StoryEditor/Flowchart/Effect/Effect";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateEffectTypes = {
  effectName: string | undefined;
  flowchartCommandId: string;
};

export const createEffectService = async ({
  effectName,
  flowchartCommandId,
}: CreateEffectTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!effectName?.trim().length) {
    throw createHttpError(400, "Effect is required");
  }

  return await Effect.create({
    effectName,
    flowchartCommandId,
  });
};

type DeleteEffectTypes = {
  effectId: string;
};

export const deleteEffectService = async ({ effectId }: DeleteEffectTypes) => {
  validateMongoId({ value: effectId, valueName: "Effect" });

  await Effect.findByIdAndDelete(effectId);

  return `Effect with id ${effectId} was removed`;
};
