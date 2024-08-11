import { useMemo, useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationEpisodeTypes } from "../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedEpisode from "../Display/Episode/DisplayTranslatedNonTranslatedEpisode";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import SeasonPrompt from "../../InputPrompts/SeasonPrompt";
import useGetTranslationEpisodesQueries from "../../../../../hooks/Fetching/Translation/Episode/useGetTranslationEpisodesQueries";

type FiltersEverythingCharacterForEpisodeTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedEpisodeTypes = {
  translated: TranslationEpisodeTypes[];
  nonTranslated: TranslationEpisodeTypes[] | null;
};

export default function FiltersEverythingStoryForEpisode({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForEpisodeTypes) {
  const [storyId, setStoryId] = useState("");
  const [seasonId, setSeasonId] = useState("");

  const translatedEpisode = useGetTranslationEpisodesQueries({
    seasonId,
    language: translateFromLanguage,
  });

  const nonTranslatedEpisode = useGetTranslationEpisodesQueries({
    seasonId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (translatedEpisode.length > 0 && nonTranslatedEpisode.length > 0) {
      const arrayOfEpisode =
        [] as CombinedTranslatedAndNonTranslatedEpisodeTypes[];
      const groupedEpisode: Record<
        string,
        CombinedTranslatedAndNonTranslatedEpisodeTypes
      > = {};

      translatedEpisode.forEach((tc) => {
        tc.data?.map((tcd) => {
          const episodeId = tcd.episodeId;
          if (!groupedEpisode[episodeId]) {
            groupedEpisode[episodeId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedEpisode[episodeId].translated.push(tcd);
        });
      });

      nonTranslatedEpisode.forEach((ntc) => {
        ntc.data?.map((ntcd) => {
          const episodeId = ntcd.episodeId;
          if (!groupedEpisode[episodeId]) {
            groupedEpisode[episodeId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedEpisode[episodeId].nonTranslated) {
            groupedEpisode[episodeId].nonTranslated = [];
          }
          groupedEpisode[episodeId].nonTranslated.push(ntcd);
        });
      });

      Object.values(groupedEpisode).forEach((group) =>
        arrayOfEpisode.push(group)
      );

      return arrayOfEpisode.filter((group) => group.translated.length > 0);
    }
    return [];
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
            key={(ct.translated[i]?._id || i) + "-ctEpisode"}
            languageToTranslate={translateToLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
