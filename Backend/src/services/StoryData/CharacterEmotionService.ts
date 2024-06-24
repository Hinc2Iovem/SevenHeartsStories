import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import Character from "../../models/StoryData/Character";
import Translation from "../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateCharacterEmotionTypes = {
  emotionName: string | undefined;
  characterId: string;
};

export const characterEmotionCreateService = async ({
  characterId,
  emotionName,
}: CreateCharacterEmotionTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).lean();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!emotionName) {
    throw createHttpError(400, "Emotion is required");
  }

  const newEmotion = await CharacterEmotion.create({
    characterId,
    emotionName,
  });

  const existingTranslation = await Translation.findOne({
    language: newEmotion.currentLanguage,
    textFieldName: TranslationTextFieldName.CharacterEmotion,
    characterEmotionId: newEmotion._id,
  });

  if (existingTranslation) {
    existingTranslation.text = emotionName;
    await existingTranslation.save();
  } else {
    await Translation.create({
      language: newEmotion.currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterEmotion,
      text: emotionName,
      characterEmotionId: newEmotion._id,
    });
  }

  return newEmotion;
};
