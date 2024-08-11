import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";

type UpdateCharacterTranslationTypes = {
  appearancePartId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateCharacterTranslationOnMutationTypes = {
  appearancePartName: string;
  appearancePartType: TranslationTextFieldNameAppearancePartsTypes;
};

export default function useUpdateAppearancePartTranslation({
  appearancePartId,
  language,
}: UpdateCharacterTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      appearancePartName,
      appearancePartType,
    }: UpdateCharacterTranslationOnMutationTypes) =>
      await axiosCustomized.patch(
        `/translations/appearanceParts/${appearancePartId}`,
        {
          currentLanguage: language,
          appearancePartName,
          appearancePartType,
        }
      ),
  });
}
