import { RequestHandler } from "express";
import { translationServiceChangeLanguage } from "../../services/Additional/TranslationService";

type TranslationBody = {
  currentLanguage: string;
};

// @route PATCH http://localhost:3500/translations
// @access Private
export const TranslationControllerChangeLanguage: RequestHandler<
  unknown,
  unknown,
  TranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const translation = await translationServiceChangeLanguage({
      currentLanguage: req.body.currentLanguage,
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
