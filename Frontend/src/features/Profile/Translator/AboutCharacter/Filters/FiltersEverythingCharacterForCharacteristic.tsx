import { useMemo, useState } from "react";
import useGetAllCharacteristicsByStoryId from "../../../../../hooks/Fetching/Translation/Characteristic/useGetAllCharacteristicsByStoryId";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterCharacteristicTypes } from "../../../../../types/Additional/TranslationTypes";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import DisplayTranslatedNonTranslatedCharacteristic from "../Display/Characteristic/DisplayTranslatedNonTranslatedCharacteristic";
import useInvalidateTranslatorCharacteristicQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorCharacteristicQueries";

type FiltersEverythingCharacterForCharacteristicTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacteristicTypes = {
  translated: TranslationCharacterCharacteristicTypes | null;
  nonTranslated: TranslationCharacterCharacteristicTypes | null;
};

export default function FiltersEverythingCharacterForCharacteristic({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForCharacteristicTypes) {
  const [storyId, setStoryId] = useState("");

  useInvalidateTranslatorCharacteristicQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    storyId,
  });

  const { data: translatedCharacteristics } = useGetAllCharacteristicsByStoryId(
    {
      storyId,
      language: translateFromLanguage,
    }
  );
  const { data: nonTranslatedCharacteristics } =
    useGetAllCharacteristicsByStoryId({
      storyId,
      language: translateToLanguage,
    });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedCharacteristicTypes[] =
      [];
    const characteristicMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedCharacteristicTypes;
    } = {};

    translatedCharacteristics?.forEach((tc) => {
      const characteristicId = tc.characteristicId;
      if (!characteristicMap[characteristicId]) {
        characteristicMap[characteristicId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        characteristicMap[characteristicId].translated = tc;
      }
    });

    nonTranslatedCharacteristics?.forEach((ntc) => {
      const characteristicId = ntc.characteristicId;
      if (!characteristicMap[characteristicId]) {
        characteristicMap[characteristicId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        characteristicMap[characteristicId].nonTranslated = ntc;
      }
    });

    Object.values(characteristicMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedCharacteristics, nonTranslatedCharacteristics]);

  console.log("trans: ", translatedCharacteristics);
  console.log("nonTrans: ", nonTranslatedCharacteristics);

  console.log(memoizedCombinedTranslations);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
      </div>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations?.map((ct, i) => (
          <DisplayTranslatedNonTranslatedCharacteristic
            key={(ct?.translated?._id || i) + "-ctCharacteristic"}
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
