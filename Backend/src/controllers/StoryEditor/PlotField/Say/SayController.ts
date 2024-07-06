import { RequestHandler } from "express";
import {
  createSayService,
  deleteSayService,
  getSayByPlotFieldCommandIdService,
  updateSayCommandSideService,
  updateSayService,
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
  characterId: string;
  characterEmotionId: string;
};

export type SayType = "author" | "character";

type CreateSayBody = {
  text: string | undefined;
  type: SayType | undefined;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/say/characters/:characterId/characterEmotions/:characterEmotionId
// @access Private
export const createSayController: RequestHandler<
  CreateSayParams,
  unknown,
  CreateSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await createSayService({
      characterId: req.params.characterId,
      characterEmotionId: req.params.characterEmotionId,
      plotFieldCommandId: req.params.plotFieldCommandId,
      type: req.body.type,
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

type UpdateSayParams = {
  sayId: string;
  characterId: string;
  characterEmotionId: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/say/:sayId/characters/:characterId/characterEmotions/:characterEmotionId
// @access Private
export const updateSayController: RequestHandler<
  UpdateSayParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const say = await updateSayService({
      sayId: req.params.sayId,
      characterId: req.params.characterId,
      characterEmotionId: req.params.characterEmotionId,
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
