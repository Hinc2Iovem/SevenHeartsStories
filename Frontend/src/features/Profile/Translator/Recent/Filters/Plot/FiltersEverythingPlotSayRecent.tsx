import { useMemo } from "react";
import { UpdatedAtPossibleVariationTypes } from "../FiltersEverythingRecent";
import useInvalidateTranslatorQueriesRecent from "../../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesRecent";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationSayTypes } from "../../../../../../types/Additional/TranslationTypes";
import useGetSayRecentTranslations from "../../../../../../hooks/Fetching/Translation/PlotfieldCommands/Say/useGetSayRecentTranslations";
import DisplayTranslatedNonTranslatedPlotSay from "../../../Plot/Display/Plot/DisplayTranslatedNonTranslatedPlotSay";

type FiltersEverythingPlotSayTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  updatedAt: UpdatedAtPossibleVariationTypes;
};

export type CombinedTranslatedAndNonTranslatedSayTypes = {
  translated: TranslationSayTypes | null;
  nonTranslated: TranslationSayTypes | null;
};

export default function FiltersEverythingPlotSayRecent({
  translateFromLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  updatedAt,
}: FiltersEverythingPlotSayTypes) {
  useInvalidateTranslatorQueriesRecent({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    queryKey: "say",
    translateToLanguage,
    updatedAt,
  });

  const { data: translatedSays } = useGetSayRecentTranslations({
    language: translateFromLanguage,
    updatedAt,
  });
  const { data: nonTranslatedSays } = useGetSayRecentTranslations({
    language: translateToLanguage,
    updatedAt,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedSayTypes[] = [];
    const sayMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedSayTypes;
    } = {};

    translatedSays?.forEach((tc) => {
      const sayId = tc.commandId;
      if (!sayMap[sayId]) {
        sayMap[sayId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        sayMap[sayId].translated = tc;
      }
    });

    nonTranslatedSays?.forEach((ntc) => {
      const sayId = ntc.commandId;
      if (!sayMap[sayId]) {
        sayMap[sayId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        sayMap[sayId].nonTranslated = ntc;
      }
    });

    Object.values(sayMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedSays, nonTranslatedSays]);

  return (
    <>
      {(memoizedCombinedTranslations?.length || 0) > 0 ? (
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
        >
          {memoizedCombinedTranslations?.map((t, i) => (
            <DisplayTranslatedNonTranslatedPlotSay
              key={t.translated?._id || i + "-say"}
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
