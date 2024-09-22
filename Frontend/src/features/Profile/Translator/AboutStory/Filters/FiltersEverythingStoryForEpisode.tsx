import { useMemo, useState } from "react";
import useGetPaginatedTranslationEpisodes from "../../../../../hooks/Fetching/Translation/Episode/useGetPaginatedTranslationEpisodes";
import useInvalidateTranslatorEpisodeQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorEpisodeQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationEpisodeTypes } from "../../../../../types/Additional/TranslationTypes";
import SeasonPrompt from "../../InputPrompts/SeasonPrompt";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import DisplayTranslatedNonTranslatedEpisode from "../Display/Episode/DisplayTranslatedNonTranslatedEpisode";

type FiltersEverythingCharacterForEpisodeTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedEpisodeTypes = {
  translated: TranslationEpisodeTypes | null;
  nonTranslated: TranslationEpisodeTypes | null;
};

export default function FiltersEverythingStoryForEpisode({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForEpisodeTypes) {
  const [page, setPage] = useState(1);
  const [storyId, setStoryId] = useState("");
  const [seasonId, setSeasonId] = useState("");

  useInvalidateTranslatorEpisodeQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    seasonId,
    page,
    limit: 3,
  });

  const { data: translatedEpisode } = useGetPaginatedTranslationEpisodes({
    seasonId,
    language: translateFromLanguage,
    page,
    limit: 3,
  });

  const { data: nonTranslatedEpisode } = useGetPaginatedTranslationEpisodes({
    seasonId,
    language: translateToLanguage,
    page,
    limit: 3,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedEpisodeTypes[] = [];
    const episodeMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedEpisodeTypes;
    } = {};

    translatedEpisode?.results.forEach((tc) => {
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

    nonTranslatedEpisode?.results.forEach((ntc) => {
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
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
        <SeasonPrompt setSeasonId={setSeasonId} storyId={storyId} />
      </div>
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
    </>
  );
}
