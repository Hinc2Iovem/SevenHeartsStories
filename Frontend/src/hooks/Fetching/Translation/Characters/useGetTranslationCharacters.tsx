import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";

export default function useGetTranslationCharacters({
  characterId,
}: {
  characterId: string;
}) {
  return useQuery({
    queryKey: ["translation", "character", characterId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCharacterTypes[]>(
          `/translations/characters/${characterId}?currentLanguage=russian`
        )
        .then((r) => r.data),
  });
}
