import { RequestHandler } from "express";
import {
  createChoiceOptionService,
  deleteChoiceOptionService,
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
  option: string | undefined;
  type: ChoiceOptionType | undefined;
  priceAmethysts: number | undefined;
  characterName: string | undefined;
  amountOfPoints: number | undefined;
  requiredKey: string | undefined;
  requiredCharacteristic: string | undefined;
  characteristicName: string | undefined;
};

export const createChoiceOptionController: RequestHandler<
  CreateChoiceOptionParams,
  unknown,
  CreateChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await createChoiceOptionService({
      amountOfPoints: req.body.amountOfPoints,
      characterName: req.body.characterName,
      priceAmethysts: req.body.priceAmethysts,
      type: req.body.type,
      option: req.body.option,
      requiredKey: req.body.requiredKey,
      characteristicName: req.body.characteristicName,
      requiredCharacteristic: req.body.requiredCharacteristic,
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

type DeleteChoiceOptionParams = {
  choiceOptionId: string;
};

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
