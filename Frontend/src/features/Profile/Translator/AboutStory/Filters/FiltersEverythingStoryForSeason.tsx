import { useMemo, useState } from "react";
import useGetSeasonsByStoryId from "../../../../../hooks/Fetching/Season/useGetSeasonsByStoryId";
import useInvalidateTranslatorSeasonQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorSeasonQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../../../types/Additional/TranslationTypes";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import DisplayTranslatedNonTranslatedSeason from "../Display/Season/DisplayTranslatedNonTranslatedSeason";

type FiltersEverythingCharacterForSeasonTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedSeasonTypes = {
  translated: TranslationSeasonTypes | null;
  nonTranslated: TranslationSeasonTypes | null;
};

export default function FiltersEverythingStoryForSeason({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForSeasonTypes) {
  const [storyId, setStoryId] = useState("");

  useInvalidateTranslatorSeasonQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    storyId,
  });

  const { data: translatedSeason } = useGetSeasonsByStoryId({
    storyId,
    language: translateFromLanguage,
  });

  const { data: nonTranslatedSeason } = useGetSeasonsByStoryId({
    storyId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedSeasonTypes[] = [];
    const seasonMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedSeasonTypes;
    } = {};

    translatedSeason?.forEach((tc) => {
      const seasonId = tc.seasonId;
      if (!seasonMap[seasonId]) {
        seasonMap[seasonId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        seasonMap[seasonId].translated = tc;
      }
    });

    nonTranslatedSeason?.forEach((ntc) => {
      const seasonId = ntc.seasonId;
      if (!seasonMap[seasonId]) {
        seasonMap[seasonId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        seasonMap[seasonId].nonTranslated = ntc;
      }
    });

    Object.values(seasonMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
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
            key={(ct.translated?._id || i) + "-ctSeason"}
            languageToTranslate={translateToLanguage}
            translateFromLanguage={translateFromLanguage}
            storyId={storyId}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
