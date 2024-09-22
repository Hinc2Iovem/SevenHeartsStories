import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TranslationChoice, {
  TranslationChoiceDocument,
} from "../../../../models/StoryData/Translation/TranslationChoice";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import Choice from "../../../../models/StoryEditor/PlotField/Choice/Choice";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

type ResultTypes = {
  next: {
    page: number;
    limit: number;
  };
  prev: {
    page: number;
    limit: number;
  };
  results: TranslationChoiceDocument[];
  amountOfChoices: number;
};

export const getChoiceTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
  limit,
  page,
}: GetByUpdatedAtAndLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (!page || !limit) {
    throw createHttpError(400, "Page and limit are required");
  }

  let startDate: Date | undefined;
  let endDate = new Date();

  switch (updatedAt) {
    case "30min":
      startDate = subMinutes(endDate, 30);
      break;
    case "1hr":
      startDate = subHours(endDate, 1);
      break;
    case "5hr":
      startDate = subHours(endDate, 5);
      break;
    case "1d":
      startDate = subDays(endDate, 1);
      break;
    case "3d":
      startDate = subDays(endDate, 3);
      break;
    case "7d":
      startDate = subDays(endDate, 7);
      break;
    default:
      throw createHttpError(400, "Invalid updatedAt value");
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const results = {} as ResultTypes;

  if (
    endIndex <
    (await TranslationChoice.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    }).exec())
  ) {
    results.next = {
      page: pageNumber + 1,
      limit: limitNumber,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: pageNumber - 1,
      limit: limitNumber,
    };
  }
  results.results =
    (await TranslationChoice.find({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfChoices = await TranslationChoice.countDocuments({
    language: currentLanguage,
    updatedAt: { $gte: startDate, $lt: endDate },
  });
  results.amountOfChoices = overAllAmountOfChoices;

  return results;
};

type ChoiceByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const getChoiceTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: ChoiceByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationChoice.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type ChoiceByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllChoicesTranslationByTopologyBlockIdService = async ({
  topologyBlockId,
  currentLanguage,
}: ChoiceByTopologyBlockIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationChoice.find({
    topologyBlockId,
    language: currentLanguage,
  }).lean();

  if (!existingItem.length) {
    return [];
  }

  return existingItem;
};

type CreateChoiceTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createChoiceTranslationService = async ({
  plotFieldCommandId,
  topologyBlockId,
}: CreateChoiceTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  await Choice.create({ plotFieldCommandId });
  return await TranslationChoice.create({
    commandId: plotFieldCommandId,
    language: "russian",
    topologyBlockId,
    translations: [],
  });
};

type UpdateChoiceTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  textFieldName: string;
  text: string | undefined;
  currentLanguage?: string;
};

export const choiceUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
}: UpdateChoiceTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "Choice" });

  const existingPlotFieldCommand = await TranslationChoice.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).exec();

  if (existingPlotFieldCommand) {
    const currentTextFieldName = existingPlotFieldCommand.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingPlotFieldCommand.translations.push({
        text,
        textFieldName,
        amountOfWords: text?.length || 0,
      });
    }

    return await existingPlotFieldCommand.save();
  } else {
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    return await TranslationChoice.create({
      commandId: plotFieldCommandId,
      language: currentLanguage,
      topologyBlockId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
