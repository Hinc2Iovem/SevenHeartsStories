import { useQuery } from "@tanstack/react-query";
import { TranslationEpisodeTypes } from "../../../types/Additional/TranslationTypes";
import { axiosCustomized } from "../../../api/axios";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";

type GetTranslationEpisodeTypes = {
  episodeId: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export default function useGetTranslationEpisode({
  episodeId,
  language = "russian",
}: GetTranslationEpisodeTypes) {
  return useQuery({
    queryKey: ["translation", "episode", episodeId],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationEpisodeTypes[]>(
          `/translations/episodes/${episodeId}?currentLanguage=${language}`
        )
        .then((r) => r.data),
  });
}
