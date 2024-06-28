import OptionCharacteristic from "../../../../models/StoryEditor/PlotField/Choice/OptionCharacteristic";
import OptionPremium from "../../../../models/StoryEditor/PlotField/Choice/OptionPremium";
import OptionRelationship from "../../../../models/StoryEditor/PlotField/Choice/OptionRelationship";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetChoiceOptionPremiumByPlotFieldCommandChoiceOptionIdTypes = {
  plotFieldCommandChoiceOptionId: string;
};

export const getChoiceOptionPremiumByPlotFieldCommandIdService = async ({
  plotFieldCommandChoiceOptionId,
}: GetChoiceOptionPremiumByPlotFieldCommandChoiceOptionIdTypes) => {
  validateMongoId({
    value: plotFieldCommandChoiceOptionId,
    valueName: "PlotFieldCommandChoiceOption",
  });

  const existingChoiceOptionPremium = await OptionPremium.findOne({
    plotFieldCommandChoiceOptionId,
  }).lean();

  if (!existingChoiceOptionPremium) {
    return null;
  }

  return existingChoiceOptionPremium;
};

type GetChoiceOptionCharacteristicByPlotFieldCommandChoiceOptionIdTypes = {
  plotFieldCommandChoiceOptionId: string;
};

export const getChoiceOptionCharacteristicByPlotFieldCommandIdService = async ({
  plotFieldCommandChoiceOptionId,
}: GetChoiceOptionCharacteristicByPlotFieldCommandChoiceOptionIdTypes) => {
  validateMongoId({
    value: plotFieldCommandChoiceOptionId,
    valueName: "PlotFieldCommandChoiceOption",
  });

  const existingChoiceOptionCharacteristic = await OptionCharacteristic.findOne(
    {
      plotFieldCommandChoiceOptionId,
    }
  ).lean();

  if (!existingChoiceOptionCharacteristic) {
    return null;
  }

  return existingChoiceOptionCharacteristic;
};

type GetChoiceOptionRelationshipByPlotFieldCommandChoiceOptionIdTypes = {
  plotFieldCommandChoiceOptionId: string;
};

export const getChoiceOptionRelationshipByPlotFieldCommandIdService = async ({
  plotFieldCommandChoiceOptionId,
}: GetChoiceOptionRelationshipByPlotFieldCommandChoiceOptionIdTypes) => {
  validateMongoId({
    value: plotFieldCommandChoiceOptionId,
    valueName: "PlotFieldCommandChoiceOption",
  });

  const existingChoiceOptionRelationship = await OptionRelationship.findOne({
    plotFieldCommandChoiceOptionId,
  }).lean();

  if (!existingChoiceOptionRelationship) {
    return null;
  }

  return existingChoiceOptionRelationship;
};
