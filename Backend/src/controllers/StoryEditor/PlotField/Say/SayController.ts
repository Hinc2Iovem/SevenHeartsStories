import { RequestHandler } from "express";
import {
  createSayService,
  deleteSayService,
  updateSayCommandSideService,
  updateSayTextService,
  getSayByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Say/SayService";

type GetSayByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/say
// @access Private
export const getSayByPlotFieldCommandIdController: RequestHandler<
  GetSayByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const say = await getSayByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateSayParams = {
  plotFieldCommandId: string;
};

export type SayType = "author" | "character";

type CreateSayBody = {
  characterName: string | undefined;
  characterEmotion: string | undefined;
  text: string | undefined;
  type: SayType | undefined;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/say
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
      plotFieldCommandId: req.params.plotFieldCommandId,
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

// @route PATCH http://localhost:3500/plotFieldCommands/say/:sayId
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

type UpdateSayCommandSideParams = {
  sayId: string;
};

type UpdateSayCommandSideBody = {
  commandSide: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/say/:sayId/commandSide
// @access Private
export const updateSayCommandSideController: RequestHandler<
  UpdateSayCommandSideParams,
  unknown,
  UpdateSayCommandSideBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await updateSayCommandSideService({
      commandSide: req.body.commandSide,
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

// @route DELETE http://localhost:3500/plotFieldCommands/say/:sayId
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
