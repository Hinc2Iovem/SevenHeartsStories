import { RequestHandler } from "express";
import {
  createChoiceOptionService,
  deleteChoiceOptionService,
  updateChoiceOptionService,
} from "../../../../services/StoryEditor/Flowchart/Choice/ChoiceOptionService";

type CreateChoiceOptionParams = {
  flowchartCommandChoiceId: string;
  topologyBlockId: string;
};

export type ChoiceOptionType =
  | "common"
  | "premium"
  | "characteristic"
  | "relationship"
  | "requirement";

type CreateChoiceOptionBody = {
  type: ChoiceOptionType | undefined;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/choices/options/topologyBlocks/:topologyBlockId
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
      flowchartCommandChoiceId: req.params.flowchartCommandChoiceId,
      topologyBlockId: req.params.topologyBlockId,
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
};

// @route PATCH http://localhost:3500/flowchartCommands/choices/options/:choiceOptionId
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
      requiredKey: req.body.requiredKey,
      characteristicName: req.body.characteristicName,
      requiredCharacteristic: req.body.requiredCharacteristic,
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

// @route DELETE http://localhost:3500/flowchartCommands/choices/options/:choiceOptionId
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
