import { useMemo, useState } from "react";
import useGetTranslationCharacteristicsQueries from "../../../../../hooks/Fetching/Translation/Characteristic/useGetTranslationCharacteristicsQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterCharacteristicTypes } from "../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedCharacteristic from "../Display/Characteristic/DisplayTranslatedNonTranslatedCharacteristic";
import StoryPrompt from "../../InputPrompts/StoryPrompt";

type FiltersEverythingCharacterForCharacteristicTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacteristicTypes = {
  translated: TranslationCharacterCharacteristicTypes[];
  nonTranslated: TranslationCharacterCharacteristicTypes[] | null;
};

export default function FiltersEverythingCharacterForCharacteristic({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForCharacteristicTypes) {
  const [storyId, setStoryId] = useState("");

  const translatedCharacteristic = useGetTranslationCharacteristicsQueries({
    storyId,
    language: translateFromLanguage,
  });

  const nonTranslatedCharacteristic = useGetTranslationCharacteristicsQueries({
    storyId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (
      translatedCharacteristic.length > 0 &&
      nonTranslatedCharacteristic.length > 0
    ) {
      const arrayOfCharacteristic =
        [] as CombinedTranslatedAndNonTranslatedCharacteristicTypes[];
      const groupedCharacteristic: Record<
        string,
        CombinedTranslatedAndNonTranslatedCharacteristicTypes
      > = {};

      translatedCharacteristic.forEach((tc) => {
        tc.data?.forEach((tcd) => {
          const characterCharacteristicId = tcd.characterCharacteristicId;
          if (!groupedCharacteristic[characterCharacteristicId]) {
            groupedCharacteristic[characterCharacteristicId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedCharacteristic[characterCharacteristicId].translated.push(tcd);
        });
      });

      nonTranslatedCharacteristic.forEach((ntc) => {
        ntc.data?.forEach((ntcd) => {
          const characterCharacteristicId = ntcd.characterCharacteristicId;
          if (!groupedCharacteristic[characterCharacteristicId]) {
            groupedCharacteristic[characterCharacteristicId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedCharacteristic[characterCharacteristicId].nonTranslated) {
            groupedCharacteristic[characterCharacteristicId].nonTranslated = [];
          }
          groupedCharacteristic[characterCharacteristicId].nonTranslated.push(
            ntcd
          );
        });
      });

      Object.values(groupedCharacteristic).forEach((group) =>
        arrayOfCharacteristic.push(group)
      );

      return arrayOfCharacteristic.filter(
        (group) => group.translated.length > 0
      );
    }
    return [];
  }, [translatedCharacteristic, nonTranslatedCharacteristic]);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
      </div>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct) => {
          return ct.translated.map((ctt, i) => (
            <DisplayTranslatedNonTranslatedCharacteristic
              key={(ctt._id || i) + "-ctCharacteristic"}
              languageToTranslate={translateToLanguage}
              translated={ctt}
              nonTranslated={(ct?.nonTranslated || [])[i]}
              translateFromLanguage={translateFromLanguage}
            />
          ));
        })}
      </main>
    </>
  );
}
