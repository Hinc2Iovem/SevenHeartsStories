import { RequestHandler } from "express";
import {
  createSayService,
  deleteSayService,
  updateSayTextService,
} from "../../../../services/StoryEditor/Flowchart/Say/SayService";

type CreateSayParams = {
  flowchartCommandId: string;
};

export type SayType = "author" | "character";

type CreateSayBody = {
  characterName: string | undefined;
  characterEmotion: string | undefined;
  text: string | undefined;
  type: SayType | undefined;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/say
// @access Private
export const createSayController: RequestHandler<
  CreateSayParams,
  unknown,
  CreateSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await createSayService({
      characterName: req.body.characterName,
      characterEmotion: req.body.characterEmotion,
      type: req.body.type,
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateSayParams = {
  sayId: string;
};

type UpdateSayBody = {
  text: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/say/:sayId
// @access Private
export const updateSayTextController: RequestHandler<
  UpdateSayParams,
  unknown,
  UpdateSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await updateSayTextService({
      text: req.body.text,
      currentLanguage: req.body.currentLanguage,
      sayId: req.params.sayId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteSayParams = {
  sayId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/say/:sayId
// @access Private
export const deleteSayController: RequestHandler<
  DeleteSayParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const say = await deleteSayService({
      sayId: req.params.sayId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
