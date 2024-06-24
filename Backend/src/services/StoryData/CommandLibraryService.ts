import createHttpError from "http-errors";
import CommandLibrary from "../../models/StoryData/CommandLibrary";
import { validateMongoId } from "../../utils/validateMongoId";

type CommandLibraryCreateTypes = {
  commandLibraryName: string | undefined;
  commandLibraryDescription: string | undefined;
};

export const commandLibraryCreateService = async ({
  commandLibraryDescription,
  commandLibraryName,
}: CommandLibraryCreateTypes) => {
  if (
    !commandLibraryDescription?.trim().length ||
    !commandLibraryName?.trim().length
  ) {
    throw createHttpError(
      400,
      "Command description and command name are required."
    );
  }

  const newCommandLibrary = await await CommandLibrary.create({
    commandLibraryDescription,
    commandLibraryName,
  });

  return newCommandLibrary;
};

type CommandLibraryUpdateTypes = {
  commandLibraryId: string;
  commandLibraryName: string | undefined;
  commandLibraryDescription: string | undefined;
};

export const commandLibraryUpdateService = async ({
  commandLibraryDescription,
  commandLibraryId,
  commandLibraryName,
}: CommandLibraryUpdateTypes) => {
  validateMongoId({ value: commandLibraryId, valueName: "CommandLibrary" });

  const existingCommandLibrary = await CommandLibrary.findById(
    commandLibraryId
  ).exec();
  if (!existingCommandLibrary) {
    throw createHttpError(400, "CommandLibrary with such Id doesn't exist");
  }

  if (commandLibraryDescription?.trim().length) {
    existingCommandLibrary.commandLibraryDescription =
      commandLibraryDescription;
  }
  if (commandLibraryName?.trim().length) {
    existingCommandLibrary.commandLibraryName = commandLibraryName;
  }

  return await existingCommandLibrary.save();
};

type CommandLibraryDeleteTypes = {
  commandLibraryId: string;
};

export const commandLibraryDeleteService = async ({
  commandLibraryId,
}: CommandLibraryDeleteTypes) => {
  validateMongoId({ value: commandLibraryId, valueName: "CommandLibrary" });

  const existingCommandLibrary = await CommandLibrary.findById(
    commandLibraryId
  ).exec();
  if (!existingCommandLibrary) {
    throw createHttpError(400, "CommandLibrary with such Id doesn't exist");
  }

  await existingCommandLibrary.deleteOne();

  return `Command Library with id ${commandLibraryId} was removed`;
};
