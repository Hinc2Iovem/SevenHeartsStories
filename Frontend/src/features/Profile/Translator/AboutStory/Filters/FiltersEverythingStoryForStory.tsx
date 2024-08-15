import { useMemo } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationStoryTypes } from "../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedStory from "../Display/Story/DisplayTranslatedNonTranslatedStory";
import useGetTranslationStoriesQueries from "../../../../../hooks/Fetching/Translation/Story/useGetTranslationStoriesQueries";

type FiltersEverythingCharacterForStoryTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedStoryTypes = {
  translated: TranslationStoryTypes[];
  nonTranslated: TranslationStoryTypes[] | null;
};

export default function FiltersEverythingStoryForStory({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForStoryTypes) {
  const translatedStory = useGetTranslationStoriesQueries({
    language: translateFromLanguage,
    showQueries: !!translateFromLanguage && !!translateToLanguage,
  });

  const nonTranslatedStory = useGetTranslationStoriesQueries({
    language: translateToLanguage,
    showQueries: !!translateFromLanguage && !!translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (translatedStory.length > 0 && nonTranslatedStory.length > 0) {
      const arrayOfStory = [] as CombinedTranslatedAndNonTranslatedStoryTypes[];
      const groupedStory: Record<
        string,
        CombinedTranslatedAndNonTranslatedStoryTypes
      > = {};

      translatedStory.forEach((tc) => {
        tc.data?.map((tcd) => {
          const storyId = tcd.storyId;
          if (!groupedStory[storyId]) {
            groupedStory[storyId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedStory[storyId].translated.push(tcd);
        });
      });

      nonTranslatedStory.forEach((ntc) => {
        ntc.data?.map((ntcd) => {
          const storyId = ntcd.storyId;
          if (!groupedStory[storyId]) {
            groupedStory[storyId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedStory[storyId].nonTranslated) {
            groupedStory[storyId].nonTranslated = [];
          }
          groupedStory[storyId].nonTranslated.push(ntcd);
        });
      });

      Object.values(groupedStory).forEach((group) => arrayOfStory.push(group));

      return arrayOfStory.filter((group) => group.translated.length > 0);
    }
    return [];
  }, [translatedStory, nonTranslatedStory]);

  return (
    <>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct, i) => (
          <DisplayTranslatedNonTranslatedStory
            key={(ct.translated[i]?._id || i) + "-ctStory"}
            languageToTranslate={translateToLanguage}
            translateFromLanguage={translateFromLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
