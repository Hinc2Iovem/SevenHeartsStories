import createHttpError from "http-errors";
import { validateMongoId } from "../utils/validateMongoId";
import Flowchart from "../models/StoryEditor/Flowchart/Flowchart";

type UpdateLanguageTypes = {
  currentLanguage: string | undefined;
  flowchartId: string;
};

export const flowchartControllerUpdateCurrentLanguageService = async ({
  currentLanguage,
  flowchartId,
}: UpdateLanguageTypes) => {
  validateMongoId({ value: flowchartId, valueName: "Flowchart" });
  if (!currentLanguage?.length || !currentLanguage.trim().length) {
    throw createHttpError(400, "You haven't selected language");
  }

  const existingFlowchart = await Flowchart.findById(flowchartId).exec();
  if (!existingFlowchart) {
    throw createHttpError(400, "Such flowchart doesn't exist");
  }

  existingFlowchart.currentLanguage = currentLanguage;

  return await existingFlowchart.save();
};
