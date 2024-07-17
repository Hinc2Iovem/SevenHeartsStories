import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TranslationCommandTypes } from "../../../../../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetTranslationSayEnabledTypes = {
  characterId: string;
  commandSayId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useGetTranslationSayEnabled({
  characterId,
  commandSayId,
  language = "russian",
}: GetTranslationSayEnabledTypes) {
  return useQuery({
    queryKey: ["translation", "command", "say", characterId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/say/${commandSayId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
    enabled: !!commandSayId,
  });
}
