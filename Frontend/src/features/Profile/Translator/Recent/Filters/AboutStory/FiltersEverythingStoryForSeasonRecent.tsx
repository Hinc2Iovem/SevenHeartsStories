import { useMemo } from "react";
import useGetSeasonRecentTranslations from "../../../../../../hooks/Fetching/Translation/Season/useGetSeasonRecentTranslations";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSeasonTypes } from "../../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedSeason from "../../../AboutStory/Display/Season/DisplayTranslatedNonTranslatedSeason";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";

type FiltersEverythingCharacterForSeasonTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedSeasonTypes = {
  translated: TranslationSeasonTypes | null;
  nonTranslated: TranslationSeasonTypes | null;
};

export default function FiltersEverythingStoryForSeasonRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  updatedAt,
}: FiltersEverythingCharacterForSeasonTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    queryKey: "season",
    updatedAt,
  });

  const { data: translatedSeason } = useGetSeasonRecentTranslations({
    updatedAt,
    language: translateFromLanguage,
  });

  const { data: nonTranslatedSeason } = useGetSeasonRecentTranslations({
    updatedAt,
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
      {memoizedCombinedTranslations.length ? (
        <main
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations.map((ct, i) => (
            <DisplayTranslatedNonTranslatedSeason
              key={(ct.translated?._id || i) + "-ctSeason"}
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
