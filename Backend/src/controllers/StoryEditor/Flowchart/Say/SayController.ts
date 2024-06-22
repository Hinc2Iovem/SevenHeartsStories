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
};

export const updateSayTextController: RequestHandler<
  UpdateSayParams,
  unknown,
  UpdateSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await updateSayTextService({
      text: req.body.text,
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
