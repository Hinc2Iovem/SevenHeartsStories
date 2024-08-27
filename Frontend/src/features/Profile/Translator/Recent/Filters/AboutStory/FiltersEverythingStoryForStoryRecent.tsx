import { useMemo } from "react";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationStoryTypes } from "../../../../../../types/Additional/TranslationTypes";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import useGetStoryRecentTranslations from "../../../../../../hooks/Fetching/Translation/Story/useGetStoryRecentTranslations";
import DisplayTranslatedNonTranslatedStory from "../../../AboutStory/Display/Story/DisplayTranslatedNonTranslatedStory";

type FiltersEverythingCharacterForStoryTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedStoryTypes = {
  translated: TranslationStoryTypes | null;
  nonTranslated: TranslationStoryTypes | null;
};

export default function FiltersEverythingStoryForStoryRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  updatedAt,
}: FiltersEverythingCharacterForStoryTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    queryKey: "story",
    updatedAt,
  });

  const { data: translatedStory } = useGetStoryRecentTranslations({
    language: translateFromLanguage,
    updatedAt,
  });

  const { data: nonTranslatedStory } = useGetStoryRecentTranslations({
    language: translateToLanguage,
    updatedAt,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedStoryTypes[] = [];
    const storyMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedStoryTypes;
    } = {};

    translatedStory?.forEach((tc) => {
      const storyId = tc.storyId;
      if (!storyMap[storyId]) {
        storyMap[storyId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        storyMap[storyId].translated = tc;
      }
    });

    nonTranslatedStory?.forEach((ntc) => {
      const storyId = ntc.storyId;
      if (!storyMap[storyId]) {
        storyMap[storyId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        storyMap[storyId].nonTranslated = ntc;
      }
    });

    Object.values(storyMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedStory, nonTranslatedStory]);

  return (
    <>
      {memoizedCombinedTranslations.length ? (
        <main
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations.map((ct, i) => (
            <DisplayTranslatedNonTranslatedStory
              key={(ct.translated?._id || i) + "-ctStory"}
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
