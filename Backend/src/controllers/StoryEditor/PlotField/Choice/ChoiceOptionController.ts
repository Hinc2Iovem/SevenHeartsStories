import { RequestHandler } from "express";
import {
  choiceOptionUpdateOptionOrderService,
  choiceOptionUpdateSexualOrientationsService,
  createChoiceOptionService,
  deleteChoiceOptionService,
  getAllChoiceOptionsByChoiceIdService,
  getChoiceOptionByIdService,
  updateChoiceOptionService,
  updateChoiceOptionTopologyBlockService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceOptionService";

type GetChoiceOptionByIdParams = {
  choiceOptionId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const getChoiceOptionByIdController: RequestHandler<
  GetChoiceOptionByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await getChoiceOptionByIdService({
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
type GetAllChoiceOptionsByChoiceIdParams = {
  plotFieldCommandChoiceId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/:plotFieldCommandChoiceId/options
// @access Private
export const getAllChoiceOptionsByChoiceIdController: RequestHandler<
  GetAllChoiceOptionsByChoiceIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await getAllChoiceOptionsByChoiceIdService({
      plotFieldCommandChoiceId: req.params.plotFieldCommandChoiceId,
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

type CreateChoiceOptionParams = {
  plotFieldCommandChoiceId: string;
  plotFieldCommandId: string;
};

export type ChoiceOptionType =
  | "common"
  | "premium"
  | "characteristic"
  | "relationship";

type CreateChoiceOptionBody = {
  type: ChoiceOptionType | undefined;
  episodeId?: string;
  topologyBlockId?: string;
};

// TODO KAKAYTA ZALUPA
// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/choices/:plotFieldCommandChoiceId/options
// @access Private
export const createChoiceOptionController: RequestHandler<
  CreateChoiceOptionParams,
  unknown,
  CreateChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await createChoiceOptionService({
      plotFieldCommandChoiceId: req.params.plotFieldCommandChoiceId,
      plotFieldCommandId: req.params.plotFieldCommandId,
      type: req.body.type,
      episodeId: req.body.episodeId,
      topologyBlockId: req.body.topologyBlockId,
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

type UpdateChoiceOptionTopologyBlockParams = {
  choiceOptionId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId
// @access Private
export const updateChoiceOptionTopologyBlockController: RequestHandler<
  UpdateChoiceOptionTopologyBlockParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await updateChoiceOptionTopologyBlockService({
      choiceOptionId: req.params.choiceOptionId,
      targetBlockId: req.params.targetBlockId,
      sourceBlockId: req.params.sourceBlockId,
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
  amountOfPoints: number | undefined;
  characterCharacteristicId: string | undefined;
  characterId: string | undefined;
  // requiredKey: string | undefined;
  // requiredCharacteristic: string | undefined;
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
      choiceOptionId: req.params.choiceOptionId,
      amountOfPoints: req.body.amountOfPoints,
      priceAmethysts: req.body.priceAmethysts,
      option: req.body.option,
      characterId: req.body.characterId,
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

type ChoiceOptionUpdateOptionOrderParams = {
  choiceId: string;
  choiceOptionId: string;
};

type ChoiceOptionUpdateOptionOrderBody = {
  optionOrder?: number;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId/options/:choiceOptionId/optionOrder
// @access Private
export const choiceOptionControllerUpdateOptionOrder: RequestHandler<
  ChoiceOptionUpdateOptionOrderParams,
  unknown,
  ChoiceOptionUpdateOptionOrderBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await choiceOptionUpdateOptionOrderService({
      choiceOptionId: req.params.choiceOptionId,
      choiceId: req.params.choiceId,
      optionOrder: req.body.optionOrder,
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
