import { useMemo } from "react";
import useGetGetItemRecentTranslations from "../../../../../../hooks/Fetching/Translation/PlotfieldCommands/GetItem/useGetGetItemRecentTranslations";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";
import { TranslationGetItemTypes } from "../../../../../../types/Additional/TranslationTypes";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import DisplayTranslatedNonTranslatedPlotGetItem from "../../../Plot/Display/Plot/DisplayTranslatedNonTranslatedPlotGetItem";

type FiltersEverythingPlotGetItemTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedGetItemTypes = {
  translated: TranslationGetItemTypes | null;
  nonTranslated: TranslationGetItemTypes | null;
};

export default function FiltersEverythingPlotGetItemRecent({
  translateFromLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  updatedAt,
}: FiltersEverythingPlotGetItemTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    queryKey: "getItem",
    translateToLanguage,
    updatedAt,
  });
  const { data: translatedGetItems } = useGetGetItemRecentTranslations({
    language: translateFromLanguage,
    updatedAt,
  });
  const { data: nonTranslatedGetItems } = useGetGetItemRecentTranslations({
    language: translateToLanguage,
    updatedAt,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedGetItemTypes[] = [];
    const getItemMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedGetItemTypes;
    } = {};

    translatedGetItems?.forEach((tc) => {
      const getItemId = tc.commandId;
      if (!getItemMap[getItemId]) {
        getItemMap[getItemId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        getItemMap[getItemId].translated = tc;
      }
    });

    nonTranslatedGetItems?.forEach((ntc) => {
      const getItemId = ntc.commandId;
      if (!getItemMap[getItemId]) {
        getItemMap[getItemId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        getItemMap[getItemId].nonTranslated = ntc;
      }
    });

    Object.values(getItemMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedGetItems, nonTranslatedGetItems]);
  return (
    <>
      {(memoizedCombinedTranslations?.length || 0) > 0 ? (
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations?.map((t, i) => (
            <DisplayTranslatedNonTranslatedPlotGetItem
              key={t.translated?._id || i + "-getItem"}
              languageToTranslate={translateToLanguage}
              translateFromLanguage={translateFromLanguage}
              {...t}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
