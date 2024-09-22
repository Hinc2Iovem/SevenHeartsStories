import createHttpError from "http-errors";
import TranslationCommandWardrobe, {
  TranslationCommandWardrobeDocument,
} from "../../../../models/StoryData/Translation/TranslationCommandWardrobe";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import CommandWardrobe from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../../utils/validateMongoId";
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
  results: TranslationCommandWardrobeDocument[];
  amountOfWardrobes: number;
};

export const getCommandWardrobeTranslationUpdatedAtAndLanguageService = async ({
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
    (await TranslationCommandWardrobe.countDocuments({
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
  results.results = await TranslationCommandWardrobe.find({
    language: currentLanguage,
    updatedAt: { $gte: startDate, $lt: endDate },
  })
    .limit(limitNumber)
    .skip(startIndex)
    .exec();
  const overAllAmountOfCommandWardrobes =
    await TranslationCommandWardrobe.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    });
  results.amountOfWardrobes = overAllAmountOfCommandWardrobes;

  return results;
};

type CommandWardrobeByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const commandWardrobeTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: CommandWardrobeByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationCommandWardrobe.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type CommandWardrobeByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllCommandWardrobesTranslationByTopologyBlockIdService =
  async ({
    topologyBlockId,
    currentLanguage,
  }: CommandWardrobeByTopologyBlockIdTypes) => {
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, `CurrentLanguage is required`);
    }

    checkCurrentLanguage({ currentLanguage });

    const existingCommandWardrobes = await TranslationCommandWardrobe.find({
      topologyBlockId,
      language: currentLanguage,
    }).lean();

    if (!existingCommandWardrobes.length) {
      return [];
    }

    return existingCommandWardrobes;
  };

type CreateCommandWardrobeTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createCommandWardrobeTranslationService = async ({
  plotFieldCommandId,
  topologyBlockId,
}: CreateCommandWardrobeTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  await TranslationCommandWardrobe.create({
    commandId: plotFieldCommandId,
    topologyBlockId,
    language: "russian",
    translations: [],
  });
  return await CommandWardrobe.create({ plotFieldCommandId });
};

type CreateCommandWardrobeDuplicateTypes = {
  commandOrder?: number;
  topologyBlockId: string;
};

export const createCommandWardrobeDuplicateTranslationService = async ({
  commandOrder,
  topologyBlockId,
}: CreateCommandWardrobeDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  await TranslationCommandWardrobe.create({
    commandId: newPlotfieldCommand._id,
    topologyBlockId,
    language: "russian",
    translations: [],
  });
  return await CommandWardrobe.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateCommandWardrobeTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  textFieldName: string;
  text: string | undefined;
  currentLanguage?: string;
};

export const commandWardrobeUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
}: UpdateCommandWardrobeTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "CommandWardrobe" });

  const existingPlotFieldCommand = await TranslationCommandWardrobe.findOne({
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
    return await TranslationCommandWardrobe.create({
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
