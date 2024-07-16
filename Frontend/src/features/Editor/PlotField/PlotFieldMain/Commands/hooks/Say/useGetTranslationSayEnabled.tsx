import { useQuery } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../../../../api/axios";
import { TranslationCommandTypes } from "../../../../../../../types/Additional/TranslationTypes";

type GetTranslationSayEnabledTypes = {
  characterId: string;
  commandSayId: string;
};

export default function useGetTranslationSayEnabled({
  characterId,
  commandSayId,
}: GetTranslationSayEnabledTypes) {
  return useQuery({
    queryKey: ["translation", "command", "say", characterId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/say/${commandSayId}?currentLanguage=russian`
        )
        .then((r) => r.data),
    enabled: !!commandSayId,
  });
}
