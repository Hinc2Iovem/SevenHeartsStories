import { useMemo } from "react";
import useGetEpisodeRecentTranslations from "../../../../../../hooks/Fetching/Translation/Episode/useGetEpisodeRecentTranslations";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationEpisodeTypes } from "../../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedEpisode from "../../../AboutStory/Display/Episode/DisplayTranslatedNonTranslatedEpisode";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";

type FiltersEverythingCharacterForEpisodeTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedEpisodeTypes = {
  translated: TranslationEpisodeTypes | null;
  nonTranslated: TranslationEpisodeTypes | null;
};

export default function FiltersEverythingStoryForEpisodeRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  updatedAt,
}: FiltersEverythingCharacterForEpisodeTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    queryKey: "episode",
    updatedAt,
  });

  const { data: translatedEpisode } = useGetEpisodeRecentTranslations({
    updatedAt,
    language: translateFromLanguage,
  });

  const { data: nonTranslatedEpisode } = useGetEpisodeRecentTranslations({
    updatedAt,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedEpisodeTypes[] = [];
    const episodeMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedEpisodeTypes;
    } = {};

    translatedEpisode?.forEach((tc) => {
      const episodeId = tc.episodeId;
      if (!episodeMap[episodeId]) {
        episodeMap[episodeId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        episodeMap[episodeId].translated = tc;
      }
    });

    nonTranslatedEpisode?.forEach((ntc) => {
      const episodeId = ntc.episodeId;
      if (!episodeMap[episodeId]) {
        episodeMap[episodeId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        episodeMap[episodeId].nonTranslated = ntc;
      }
    });

    Object.values(episodeMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedEpisode, nonTranslatedEpisode]);

  return (
    <>
      {memoizedCombinedTranslations.length ? (
        <main
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations.map((ct, i) => (
            <DisplayTranslatedNonTranslatedEpisode
              key={(ct.translated?._id || i) + "-ctEpisode"}
              languageToTranslate={translateToLanguage}
              translateFromLanguage={translateFromLanguage}
              {...ct}
            />
          ))}
        </main>
      ) : null}
    </>
  );
}
