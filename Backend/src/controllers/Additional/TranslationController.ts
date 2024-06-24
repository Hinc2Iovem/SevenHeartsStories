import { RequestHandler } from "express";
import { addCommandTranslationService } from "../../services/Additional/TranslationService";

type TranslationParams = {
  commandId: string;
};
type TranslationBody = {
  currentLanguage: string | undefined;
  commandName: string | undefined;
};

// @route PUT http://localhost:3500/translations/commands/:commandId
// @access Private
export const addCommandTranslationController: RequestHandler<
  TranslationParams,
  unknown,
  TranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const translation = await addCommandTranslationService({
      commandId: req.params.commandId,
      currentLanguage: req.body.currentLanguage,
      commandName: req.body.commandName,
    });
    if (translation) {
      return res.status(201).json(translation);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
