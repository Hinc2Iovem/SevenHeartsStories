import createHttpError from "http-errors";
import Choice from "../../../../models/StoryEditor/Flowchart/Choice/Choice";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import { ChoiceType } from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceController";
import ChoiceOption from "../../../../models/StoryEditor/Flowchart/Choice/ChoiceOption";

type CreateChoiceTypes = {
  choiceQuestion: string | undefined;
  flowchartCommandId: string;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
};

export const createChoiceService = async ({
  choiceQuestion,
  flowchartCommandId,
  choiceType,
  timeLimit,
}: CreateChoiceTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!choiceQuestion?.trim().length) {
    throw createHttpError(400, "Choice Question is required");
  }

  if (choiceType === "timelimit") {
    return await Choice.create({
      choiceQuestion,
      choiceType,
      flowchartCommandId,
      timeLimit,
    });
  } else if (choiceType === "common" || choiceType === "multiple") {
    return await Choice.create({
      choiceQuestion,
      choiceType,
      flowchartCommandId,
    });
  }
};

type DeleteChoiceTypes = {
  choiceId: string;
};

export const deleteChoiceService = async ({ choiceId }: DeleteChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  await Choice.findByIdAndDelete(choiceId);

  return `Choice with id ${choiceId} was removed`;
};
