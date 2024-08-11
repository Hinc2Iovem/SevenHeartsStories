import { useMutation } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type UpdateCharacterTranslationTypes = {
  characterId: string;
  language: CurrentlyAvailableLanguagesTypes;
};

type UpdateCharacterTranslationOnMutationTypes = {
  unknownName?: string;
  characterName?: string;
  description?: string;
};

export default function useUpdateCharacterTranslation({
  characterId,

  language,
}: UpdateCharacterTranslationTypes) {
  return useMutation({
    mutationFn: async ({
      characterName,
      description,
      unknownName,
    }: UpdateCharacterTranslationOnMutationTypes) =>
      await axiosCustomized.patch(`/translations/characters/${characterId}`, {
        currentLanguage: language,
        name: characterName,
        description,
        unknownName,
      }),
  });
}
