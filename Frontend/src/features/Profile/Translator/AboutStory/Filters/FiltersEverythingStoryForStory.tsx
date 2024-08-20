import { useMemo } from "react";
import useGetTranslationStories from "../../../../../hooks/Fetching/Translation/Story/useGetTranslationStories";
import useInvalidateTranslatorStoryQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorStoryQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationStoryTypes } from "../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedStory from "../Display/Story/DisplayTranslatedNonTranslatedStory";

type FiltersEverythingCharacterForStoryTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedStoryTypes = {
  translated: TranslationStoryTypes | null;
  nonTranslated: TranslationStoryTypes | null;
};

export default function FiltersEverythingStoryForStory({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForStoryTypes) {
  useInvalidateTranslatorStoryQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
  });

  const { data: translatedStory } = useGetTranslationStories({
    language: translateFromLanguage,
  });

  const { data: nonTranslatedStory } = useGetTranslationStories({
    language: translateToLanguage,
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
    </>
  );
}
