import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type CreateAppearancePartTypes = {
  characterId: string;
  appearanceType: TranslationTextFieldNameAppearancePartsTypes;
  appearancePartName: string;
  currentLanguage?: CurrentlyAvailableLanguagesTypes;
};

export default function useCreateAppearancePart({
  characterId,
  appearancePartName,
  appearanceType,
  currentLanguage = "russian",
}: CreateAppearancePartTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new", "appearancePart", appearancePartName],
    mutationFn: async () =>
      await axiosCustomized.post(`/appearanceParts/characters/${characterId}`, {
        appearancePartName,
        currentLanguage,
        appearancePartType: appearanceType,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appearancePart", appearanceType, "character", characterId],
        exact: true,
        type: "active",
      });
    },
  });
}
