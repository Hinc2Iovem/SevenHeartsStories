import { RequestHandler } from "express";
import {
  createChoiceOptionService,
  deleteChoiceOptionService,
  updateChoiceOptionService,
  getChoiceOptionByPlotFieldCommandChoiceIdService,
  choiceOptionUpdateSexualOrientationsService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceOptionService";

type GetChoiceOptionByPlotFieldCommandChoiceIdParams = {
  plotFieldCommandChoiceId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/:plotFieldCommandChoiceId/options
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
// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/choices/options/episodes/:episodeId/topologyBlocks/:topologyBlockId
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
  characterCharacteristicId: string;
  characterId: string;
};

type UpdateChoiceOptionBody = {
  option: string | undefined;
  priceAmethysts: number | undefined;
  characterName: string | undefined;
  amountOfPoints: number | undefined;
  requiredKey: string | undefined;
  requiredCharacteristic: string | undefined;
  characteristicName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId/characters/:characterId/characterCharacteristics/:characterCharacteristicId
// @access Private
export const updateChoiceOptionController: RequestHandler<
  UpdateChoiceOptionParams,
  unknown,
  UpdateChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await updateChoiceOptionService({
      choiceOptionId: req.params.choiceOptionId,
      amountOfPoints: req.body.amountOfPoints,
      characterName: req.body.characterName,
      priceAmethysts: req.body.priceAmethysts,
      option: req.body.option,
      characteristicName: req.body.characteristicName,
      characterId: req.params.characterId,
      characterCharacteristicId: req.params.characterCharacteristicId,
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

type ChoiceOptionUpdateSexualOrientationParams = {
  choiceOptionId: string;
};

type ChoiceOptionUpdateSexualOrientationBody = {
  sexualOrientationType: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId/sexualOrientation
// @access Private
export const choiceOptionControllerUpdateSexualOrientation: RequestHandler<
  ChoiceOptionUpdateSexualOrientationParams,
  unknown,
  ChoiceOptionUpdateSexualOrientationBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await choiceOptionUpdateSexualOrientationsService({
      sexualOrientationType: req.body.sexualOrientationType,
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
