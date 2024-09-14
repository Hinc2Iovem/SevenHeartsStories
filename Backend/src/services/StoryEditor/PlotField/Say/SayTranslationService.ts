import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TranslationSay from "../../../../models/StoryData/Translation/TranslationSay";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import { SayType } from "../../../../controllers/StoryEditor/PlotField/Say/SayController";
import Say from "../../../../models/StoryEditor/PlotField/Say/Say";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

export const getSayTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
}: GetByUpdatedAtAndLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

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

  const existingTranslations = await TranslationSay.find({
    updatedAt: { $gte: startDate, $lt: endDate },
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslations.length) {
    return [];
  }
  return existingTranslations;
};

type SayByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const sayTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: SayByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationSay.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type SayByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllSayTranslationByTopologyBlockIdService = async ({
  topologyBlockId,
  currentLanguage,
}: SayByTopologyBlockIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationSay.find({
    topologyBlockId,
    language: currentLanguage,
  }).lean();

  if (!existingItem.length) {
    return [];
  }

  return existingItem;
};

type CreateSayBlankTypes = {
  type: SayType | undefined;
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createSayBlankTranslationService = async ({
  type,
  plotFieldCommandId,
  topologyBlockId,
}: CreateSayBlankTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!AllPossibleTypeVariations.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Such type isn't supported, possible types: ${AllPossibleTypeVariations.map(
        (tv) => tv
      )}`
    );
  }

  if (type?.toLowerCase() === "author") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "author" });
  } else if (type?.toLowerCase() === "character") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      plotFieldCommandId,
      type: "character",
    });
  } else if (type?.toLowerCase() === "notify") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "notify" });
  } else if (type?.toLowerCase() === "hint") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "hint" });
  }
};

type CreateSayTypes = {
  characterId: string;
  type: SayType | undefined;
  plotFieldCommandId: string;
  topologyBlockId: string;
};

const AllPossibleTypeVariations = ["author", "character", "hint", "notify"];

export const createSayTranslationService = async ({
  characterId,
  type,
  plotFieldCommandId,
  topologyBlockId,
}: CreateSayTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!AllPossibleTypeVariations.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Such type isn't supported, possible types: ${AllPossibleTypeVariations.map(
        (tv) => tv
      )}`
    );
  }

  if (type?.toLowerCase() === "author") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "author" });
  } else if (type?.toLowerCase() === "character") {
    validateMongoId({ value: characterId, valueName: "Character" });

    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      characterId,
      plotFieldCommandId,
      type: "character",
    });
  } else if (type?.toLowerCase() === "notify") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "notify" });
  } else if (type?.toLowerCase() === "hint") {
    await TranslationSay.create({
      commandId: plotFieldCommandId,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({ plotFieldCommandId, type: "hint" });
  }
};

type CreateSayDuplicateTypes = {
  topologyBlockId: string;
  characterId?: string;
  type?: SayType;
  characterEmotionId?: string;
  commandOrder?: number;
  commandSide?: string;
};

export const createSayTranslationDuplicateService = async ({
  characterId,
  type,
  topologyBlockId,
  characterEmotionId,
  commandOrder,
  commandSide,
}: CreateSayDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!AllPossibleTypeVariations.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Such type isn't supported, possible types: ${AllPossibleTypeVariations.map(
        (tv) => tv
      )}`
    );
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  if (type?.toLowerCase() === "author") {
    await TranslationSay.create({
      commandId: newPlotfieldCommand._id,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      plotFieldCommandId: newPlotfieldCommand._id,
      type: "author",
      commandSide,
    });
  } else if (type?.toLowerCase() === "character") {
    validateMongoId({ value: characterId, valueName: "Character" });

    await TranslationSay.create({
      commandId: newPlotfieldCommand._id,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      characterId,
      plotFieldCommandId: newPlotfieldCommand._id,
      characterEmotionId,
      type: "character",
      commandSide,
    });
  } else if (type?.toLowerCase() === "notify") {
    await TranslationSay.create({
      commandId: newPlotfieldCommand._id,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      plotFieldCommandId: newPlotfieldCommand._id,
      type: "notify",
      commandSide,
    });
  } else if (type?.toLowerCase() === "hint") {
    await TranslationSay.create({
      commandId: newPlotfieldCommand._id,
      topologyBlockId,
      language: "russian",
      translations: [],
    });
    return await Say.create({
      plotFieldCommandId: newPlotfieldCommand._id,
      type: "hint",
      commandSide,
    });
  }
};

type UpdateSayTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

export const sayUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
}: UpdateSayTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "Say" });

  const existingPlotFieldCommand = await TranslationSay.findOne({
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
      });
    }

    return await existingPlotFieldCommand.save();
  } else {
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    return await TranslationSay.create({
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
