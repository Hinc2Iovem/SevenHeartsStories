import { RequestHandler } from "express";
import {
  createChoiceOptionService,
  deleteChoiceOptionService,
  updateChoiceOptionService,
  getChoiceOptionByPlotFieldCommandChoiceIdService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceOptionService";

type GetChoiceOptionByPlotFieldCommandChoiceIdParams = {
  plotFieldCommandChoiceId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/options/:plotFieldCommandChoiceId
// @access Private
export const getChoiceOptionByPlotFieldCommandChoiceIdController: RequestHandler<
  GetChoiceOptionByPlotFieldCommandChoiceIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await getChoiceOptionByPlotFieldCommandChoiceIdService(
      {
        plotFieldCommandChoiceId: req.params.plotFieldCommandChoiceId,
      }
    );
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateChoiceOptionParams = {
  plotFieldCommandChoiceId: string;
  topologyBlockId: string;
  episodeId: string;
};

export type ChoiceOptionType =
  | "common"
  | "premium"
  | "characteristic"
  | "relationship";

type CreateChoiceOptionBody = {
  type: ChoiceOptionType | undefined;
};

// TODO KAKAYTA ZALUPA
// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/episodes/:episodeId/choices/options/topologyBlocks/:topologyBlockId
// @access Private
export const createChoiceOptionController: RequestHandler<
  CreateChoiceOptionParams,
  unknown,
  CreateChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await createChoiceOptionService({
      type: req.body.type,
      plotFieldCommandChoiceId: req.params.plotFieldCommandChoiceId,
      topologyBlockId: req.params.topologyBlockId,
      episodeId: req.params.episodeId,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateChoiceOptionParams = {
  choiceOptionId: string;
};

type UpdateChoiceOptionBody = {
  option: string | undefined;
  priceAmethysts: number | undefined;
  characterName: string | undefined;
  amountOfPoints: number | undefined;
  requiredKey: string | undefined;
  requiredCharacteristic: string | undefined;
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
  characterCharacteristicId: string | undefined;
  characterId: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const updateChoiceOptionController: RequestHandler<
  UpdateChoiceOptionParams,
  unknown,
  UpdateChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await updateChoiceOptionService({
      amountOfPoints: req.body.amountOfPoints,
      characterName: req.body.characterName,
      priceAmethysts: req.body.priceAmethysts,
      option: req.body.option,
      characteristicName: req.body.characteristicName,
      choiceOptionId: req.params.choiceOptionId,
      characterId: req.body.characterId,
      currentLanguage: req.body.currentLanguage,
      characterCharacteristicId: req.body.characterCharacteristicId,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteChoiceOptionParams = {
  choiceOptionId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const deleteChoiceOptionController: RequestHandler<
  DeleteChoiceOptionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await deleteChoiceOptionService({
      choiceOptionId: req.params.choiceOptionId,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
