import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateCharacterTranslationTypes = {
  characterCharacteristicId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateCharacterTranslationOnMutationTypes = {
  characteristicName: string;
};

export default function useUpdateCharacteristicTranslation({
  characterCharacteristicId,
  language,
}: UpdateCharacterTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      characteristicName,
    }: UpdateCharacterTranslationOnMutationTypes) =>
      await axiosCustomized.patch(
        `/translations/characterCharacteristics/${characterCharacteristicId}`,
        {
          currentLanguage: language,
          characteristicName,
        }
      ),
  });
}
