import { useMemo } from "react";
import useGetCharacteristicRecentTranslations from "../../../../../../hooks/Fetching/Translation/Characteristic/useGetCharacteristicRecentTranslations";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterCharacteristicTypes } from "../../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedCharacteristic from "../../../AboutCharacter/Display/Characteristic/DisplayTranslatedNonTranslatedCharacteristic";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";

type FiltersEverythingCharacterForCharacteristicTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacteristicTypes = {
  translated: TranslationCharacterCharacteristicTypes | null;
  nonTranslated: TranslationCharacterCharacteristicTypes | null;
};

export default function FiltersEverythingCharacterForCharacteristicRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  updatedAt,
}: FiltersEverythingCharacterForCharacteristicTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    queryKey: "characteristic",
    updatedAt,
  });

  const { data: translatedCharacteristics } =
    useGetCharacteristicRecentTranslations({
      updatedAt,
      language: translateFromLanguage,
    });
  const { data: nonTranslatedCharacteristics } =
    useGetCharacteristicRecentTranslations({
      updatedAt,
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

  return (
    <>
      {memoizedCombinedTranslations.length ? (
        <main
          className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations?.map((ct, i) => (
            <DisplayTranslatedNonTranslatedCharacteristic
              key={(ct?.translated?._id || i) + "-ctCharacteristic"}
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
