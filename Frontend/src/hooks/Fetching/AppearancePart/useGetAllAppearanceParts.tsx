import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../api/axios";
import { AppearancePartTypes } from "../../../types/StoryData/AppearancePart/AppearancePartTypes";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";

export default function useGetAllAppearancePartsByCharacterIdAndType({
  characterId,
  appearanceType,
}: {
  characterId: string;
  appearanceType: TranslationTextFieldNameAppearancePartsTypes;
}) {
  return useQuery({
    queryKey: ["appearancePart", appearanceType, "character", characterId],
    queryFn: async () =>
      await axiosCustomized
        .get<AppearancePartTypes[]>(
          `/appearanceParts/characters/${characterId}?type=${appearanceType}`
        )
        .then((r) => r.data),
  });
}
