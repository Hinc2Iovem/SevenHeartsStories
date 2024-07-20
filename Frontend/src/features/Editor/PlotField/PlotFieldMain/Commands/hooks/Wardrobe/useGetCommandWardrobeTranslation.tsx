import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TranslationCommandTypes } from "../../../../../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetCommandWardrobeTypes = {
  commandWardrobeId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useGetCommandWardrobeTranslation({
  commandWardrobeId,
  language = "russian",
}: GetCommandWardrobeTypes) {
  return useQuery({
    queryKey: ["translation", "command", "wardrobe", commandWardrobeId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/wardrobes/${commandWardrobeId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
  });
}
