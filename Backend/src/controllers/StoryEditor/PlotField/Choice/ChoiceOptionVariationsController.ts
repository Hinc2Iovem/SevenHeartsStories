import { RequestHandler } from "express";
import {
  getChoiceOptionCharacteristicByPlotFieldCommandIdService,
  getChoiceOptionPremiumByPlotFieldCommandIdService,
  getChoiceOptionRelationshipByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceOptionVariationsService";

type GetChoiceOptionPremiumByPlotFieldCommandIdParams = {
  plotFieldCommandChoiceOptionId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionPremium
// @access Private
export const getChoiceOptionPremiumByPlotFieldCommandIdController: RequestHandler<
  GetChoiceOptionPremiumByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOptionPremium =
      await getChoiceOptionPremiumByPlotFieldCommandIdService({
        plotFieldCommandChoiceOptionId:
          req.params.plotFieldCommandChoiceOptionId,
      });
    if (choiceOptionPremium) {
      return res.status(201).json(choiceOptionPremium);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetChoiceOptionCharacteristicByPlotFieldCommandIdParams = {
  plotFieldCommandChoiceOptionId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionCharacteristic
// @access Private
export const getChoiceOptionCharacteristicByPlotFieldCommandIdController: RequestHandler<
  GetChoiceOptionCharacteristicByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOptionCharacteristic =
      await getChoiceOptionCharacteristicByPlotFieldCommandIdService({
        plotFieldCommandChoiceOptionId:
          req.params.plotFieldCommandChoiceOptionId,
      });
    if (choiceOptionCharacteristic) {
      return res.status(201).json(choiceOptionCharacteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
type GetChoiceOptionRelationshipByPlotFieldCommandIdParams = {
  plotFieldCommandChoiceOptionId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionRelationship
// @access Private
export const getChoiceOptionRelationshipByPlotFieldCommandIdController: RequestHandler<
  GetChoiceOptionRelationshipByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOptionRelationship =
      await getChoiceOptionRelationshipByPlotFieldCommandIdService({
        plotFieldCommandChoiceOptionId:
          req.params.plotFieldCommandChoiceOptionId,
      });
    if (choiceOptionRelationship) {
      return res.status(201).json(choiceOptionRelationship);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
