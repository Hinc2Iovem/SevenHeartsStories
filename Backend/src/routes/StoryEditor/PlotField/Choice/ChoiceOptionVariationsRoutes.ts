import express from "express";
import {
  getChoiceOptionCharacteristicByPlotFieldCommandIdController,
  getChoiceOptionPremiumByPlotFieldCommandIdController,
  getChoiceOptionRelationshipByPlotFieldCommandIdController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionVariationsController";

// Default route === /plotFieldCommands
export const choiceOptionVariationsRoute = express.Router();

choiceOptionVariationsRoute
  .route("/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionPremium")
  .get(getChoiceOptionPremiumByPlotFieldCommandIdController);

choiceOptionVariationsRoute
  .route(
    "/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionCharacteristic"
  )
  .get(getChoiceOptionCharacteristicByPlotFieldCommandIdController);

choiceOptionVariationsRoute
  .route(
    "/choice/options/:plotFieldCommandChoiceOptionId/choiceOptionRelationship"
  )
  .get(getChoiceOptionRelationshipByPlotFieldCommandIdController);
