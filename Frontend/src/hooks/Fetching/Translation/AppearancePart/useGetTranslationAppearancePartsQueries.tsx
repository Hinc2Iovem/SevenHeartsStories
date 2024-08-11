import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationAppearancePartTypes } from "../../../../types/Additional/TranslationTypes";
import useGetAllAppearancePartsByCharacterId from "../../AppearancePart/useGetAllAppearancePartsByCharacterId";

export default function useGetTranslationAppearancePartsQueries({
  characterId,
  language = "russian",
}: {
  characterId: string;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  const { data: appearanceParts } = useGetAllAppearancePartsByCharacterId({
    characterId: characterId ?? "",
  });

  return useQueries({
    queries: (appearanceParts ?? []).map((c) => {
      return {
        queryKey: ["translation", language, "appearancePart", c._id],
        queryFn: async () =>
          await axiosCustomized
            .get<TranslationAppearancePartTypes>(
              `/translations/appearanceParts/${c._id}?currentLanguage=${language}`
            )
            .then((r) => r.data),
      };
    }),
  });
}
