import { useMemo, useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../../../types/Additional/TranslationTypes";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import useGetTranslationSeasonsQueries from "../../../../../hooks/Fetching/Translation/Season/useGetTranslationSeasonsQueries";
import DisplayTranslatedNonTranslatedSeason from "../Display/Season/DisplayTranslatedNonTranslatedSeason";

type FiltersEverythingCharacterForSeasonTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedSeasonTypes = {
  translated: TranslationSeasonTypes[];
  nonTranslated: TranslationSeasonTypes[] | null;
};

export default function FiltersEverythingStoryForSeason({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForSeasonTypes) {
  const [storyId, setStoryId] = useState("");

  const translatedSeason = useGetTranslationSeasonsQueries({
    storyId,
    language: translateFromLanguage,
  });

  const nonTranslatedSeason = useGetTranslationSeasonsQueries({
    storyId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (translatedSeason.length > 0 && nonTranslatedSeason.length > 0) {
      const arrayOfSeason =
        [] as CombinedTranslatedAndNonTranslatedSeasonTypes[];
      const groupedSeason: Record<
        string,
        CombinedTranslatedAndNonTranslatedSeasonTypes
      > = {};

      translatedSeason.forEach((tc) => {
        if (tc.data) {
          const seasonId = tc.data.seasonId;
          if (!groupedSeason[seasonId]) {
            groupedSeason[seasonId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedSeason[seasonId].translated.push(tc.data);
        }
      });

      nonTranslatedSeason.forEach((ntc) => {
        if (ntc.data) {
          const seasonId = ntc.data.seasonId;
          if (!groupedSeason[seasonId]) {
            groupedSeason[seasonId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedSeason[seasonId].nonTranslated) {
            groupedSeason[seasonId].nonTranslated = [];
          }
          groupedSeason[seasonId].nonTranslated.push(ntc.data);
        }
      });

      Object.values(groupedSeason).forEach((group) =>
        arrayOfSeason.push(group)
      );

      return arrayOfSeason.filter((group) => group.translated.length > 0);
    }
    return [];
  }, [translatedSeason, nonTranslatedSeason]);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
      </div>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct, i) => (
          <DisplayTranslatedNonTranslatedSeason
            key={(ct.translated[i]?._id || i) + "-ctSeason"}
            languageToTranslate={translateToLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
