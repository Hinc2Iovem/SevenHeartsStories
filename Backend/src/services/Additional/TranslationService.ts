import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";

type TranslationChangeLanguageTypes = {
  commandId: string;
  currentLanguage: string | undefined;
  commandName: string | undefined;
};

export const addCommandTranslationService = async ({
  currentLanguage,
  commandId,
  commandName,
}: TranslationChangeLanguageTypes) => {
  validateMongoId({ value: commandId, valueName: "Command" });

  if (!currentLanguage?.trim().length || !commandName?.trim().length) {
    throw createHttpError(400, "Current Language and commandName are required");
  }

  if (commandName.toLocaleLowerCase() === "") return null;
};
