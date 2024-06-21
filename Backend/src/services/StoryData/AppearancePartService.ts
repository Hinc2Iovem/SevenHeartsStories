import createHttpError from "http-errors";
import AppearancePart from "../../models/StoryData/AppearancePart";
import { validateMongoId } from "../../utils/validateMongoId";

type AppearancePartCreateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
};

export const appearancePartCreateService = async ({
  appearancePartName,
  appearancePartType,
}: AppearancePartCreateTypes) => {
  if (
    !appearancePartName?.trim().length ||
    !appearancePartType?.trim().length
  ) {
    throw createHttpError(
      400,
      "AppearanceName and AppearanceType are required"
    );
  }

  return await AppearancePart.create({
    name: appearancePartName,
    type: appearancePartType,
  });
};

type AppearancePartUpdateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  appearancePartId: string;
};

export const appearancePartUpdateNameTypeService = async ({
  appearancePartName,
  appearancePartType,
  appearancePartId,
}: AppearancePartUpdateTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  if (appearancePartName?.trim().length) {
    existingAppearancePart.name = appearancePartName;
  }
  if (appearancePartType?.trim().length) {
    existingAppearancePart.type = appearancePartType;
  }

  return await existingAppearancePart.save();
};

type AppearancePartDeleteTypes = {
  appearancePartId: string;
};

export const appearancePartDeleteService = async ({
  appearancePartId,
}: AppearancePartDeleteTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  return await existingAppearancePart.deleteOne();
};
