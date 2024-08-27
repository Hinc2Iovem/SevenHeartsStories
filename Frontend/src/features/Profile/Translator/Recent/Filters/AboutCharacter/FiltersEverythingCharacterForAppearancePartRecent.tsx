import { useMemo } from "react";
import useGetAppearancePartRecentTranslations from "../../../../../../hooks/Fetching/Translation/AppearancePart/useGetAppearancePartRecentTranslations";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationAppearancePartTypes } from "../../../../../../types/Additional/TranslationTypes";
import DisplayTranslatedNonTranslatedAppearancePart from "../../../AboutCharacter/Display/AppearancePart/DisplayTranslatedNonTranslatedAppearancePart";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";

type FiltersEverythingCharacterForAppearancePartTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedAppearancePartTypes = {
  translated: TranslationAppearancePartTypes | null;
  nonTranslated: TranslationAppearancePartTypes | null;
};

export default function FiltersEverythingCharacterForAppearancePartRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  updatedAt,
}: FiltersEverythingCharacterForAppearancePartTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    updatedAt,
    queryKey: "appearancePart",
  });

  const { data: translatedAppearancePart } =
    useGetAppearancePartRecentTranslations({
      updatedAt,
      language: translateFromLanguage,
    });

  const { data: nonTranslatedAppearancePart } =
    useGetAppearancePartRecentTranslations({
      updatedAt,
      language: translateToLanguage,
    });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedAppearancePartTypes[] =
      [];
    const appearancePartMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedAppearancePartTypes;
    } = {};

    translatedAppearancePart?.forEach((tc) => {
      const appearancePartId = tc.appearancePartId;
      if (!appearancePartMap[appearancePartId]) {
        appearancePartMap[appearancePartId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        appearancePartMap[appearancePartId].translated = tc;
      }
    });

    nonTranslatedAppearancePart?.forEach((ntc) => {
      const appearancePartId = ntc.appearancePartId;
      if (!appearancePartMap[appearancePartId]) {
        appearancePartMap[appearancePartId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        appearancePartMap[appearancePartId].nonTranslated = ntc;
      }
    });

    Object.values(appearancePartMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedAppearancePart, nonTranslatedAppearancePart]);

  return (
    <>
      {memoizedCombinedTranslations.length ? (
        <main
          className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations.map((ct, i) => (
            <DisplayTranslatedNonTranslatedAppearancePart
              key={(ct.translated?._id || i) + "-ctAppearancePart"}
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
