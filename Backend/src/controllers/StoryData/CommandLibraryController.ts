import { RequestHandler } from "express";
import {
  commandLibraryCreateService,
  commandLibraryDeleteService,
  commandLibraryUpdateService,
} from "../../services/StoryData/CommandLibraryService";

type CommandLibraryCreateBody = {
  commandLibraryName: string | undefined;
  commandLibraryDescription: string | undefined;
};

// @route POST http://localhost:3500/commandLibraries
// @access Private
export const commandLibraryControllerCreate: RequestHandler<
  unknown,
  unknown,
  CommandLibraryCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandLibrary = await commandLibraryCreateService({
      commandLibraryName: req.body.commandLibraryName,
      commandLibraryDescription: req.body.commandLibraryDescription,
    });
    if (commandLibrary) {
      return res.status(201).json(commandLibrary);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CommandLibraryUpdateParams = {
  commandLibraryId: string;
};

type CommandLibraryUpdateBody = {
  commandLibraryName: string | undefined;
  commandLibraryDescription: string | undefined;
};

// @route PATCH http://localhost:3500/commandLibraries/:commandLibraryId
// @access Private
export const commandLibraryControllerUpdate: RequestHandler<
  CommandLibraryUpdateParams,
  unknown,
  CommandLibraryUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandLibrary = await commandLibraryUpdateService({
      commandLibraryId: req.params.commandLibraryId,
      commandLibraryName: req.body.commandLibraryName,
      commandLibraryDescription: req.body.commandLibraryDescription,
    });
    if (commandLibrary) {
      return res.status(201).json(commandLibrary);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CommandLibraryDeleteParams = {
  commandLibraryId: string;
};

// @route DELETE http://localhost:3500/commandLibraries/:commandLibraryId
// @access Private
export const commandLibraryControllerDelete: RequestHandler<
  CommandLibraryDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandLibrary = await commandLibraryDeleteService({
      commandLibraryId: req.params.commandLibraryId,
    });
    if (commandLibrary) {
      return res.status(201).json(commandLibrary);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
