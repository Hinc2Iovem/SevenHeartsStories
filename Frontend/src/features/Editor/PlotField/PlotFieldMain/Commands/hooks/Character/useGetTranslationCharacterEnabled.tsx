import { useQuery } from "@tanstack/react-query";
import { TranslationCharacterTypes } from "../../../../../../../types/Additional/TranslationTypes";
import { axiosCustomized } from "../../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";

export default function useGetTranslationCharacterEnabled({
  characterId,
  commandSayType,
}: {
  characterId: string;
  commandSayType: CommandSayVariationTypes;
}) {
  return useQuery({
    queryKey: ["translation", "character", characterId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCharacterTypes[]>(
          `/translations/characters/${characterId}?currentLanguage=russian`
        )
        .then((r) => r.data),
    enabled: commandSayType === "character",
  });
}
