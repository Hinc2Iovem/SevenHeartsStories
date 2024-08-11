import { useQueries } from "@tanstack/react-query";
import { axiosCustomized } from "../../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationEpisodeTypes } from "../../../../types/Additional/TranslationTypes";
import useGetEpisodesBySeasonId from "../../Episode/useGetEpisodesBySeasonId";

export default function useGetTranslationEpisodesQueries({
  seasonId,
  language = "russian",
}: {
  seasonId: string;
  language?: CurrentlyAvailableLanguagesTypes;
}) {
  const { data: episodes } = useGetEpisodesBySeasonId({
    seasonId: seasonId ?? "",
  });
  return useQueries({
    queries: (episodes ?? []).map((c) => {
      return {
        queryKey: ["translation", language, "episode", c._id],
        queryFn: async () =>
          await axiosCustomized
            .get<TranslationEpisodeTypes[]>(
              `/translations/episodes/${c._id}?currentLanguage=${language}`
            )
            .then((r) => r.data),
      };
    }),
  });
}
