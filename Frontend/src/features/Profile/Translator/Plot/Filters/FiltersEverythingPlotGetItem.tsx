import useGetAllGetItemTranslationsByTopologyBlockId from "../../../../../hooks/Fetching/Translation/PlotfieldCommands/GetItem/useGetAllGetItemTranslationsByTopologyBlockId";
import useInvalidateTranslatorQueriesCommands from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueriesCommands";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import DisplayTranslatedNonTranslatedPlotGetItem from "../Display/Plot/DisplayTranslatedNonTranslatedPlotGetItem";

type FiltersEverythingPlotGetItemTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
  topologyBlockId: string;
};

export default function FiltersEverythingPlotGetItem({
  translateFromLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
  translateToLanguage,
  topologyBlockId,
}: FiltersEverythingPlotGetItemTypes) {
  useInvalidateTranslatorQueriesCommands({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    queryKey: "getItem",
    translateToLanguage,
  });
  const { data: translatedGetItems } =
    useGetAllGetItemTranslationsByTopologyBlockId({
      language: translateFromLanguage,
      topologyBlockId,
    });

  return (
    <>
      {(translatedGetItems?.length || 0) > 0 ? (
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
        >
          {translatedGetItems?.map((t, i) => (
            <DisplayTranslatedNonTranslatedPlotGetItem
              key={t._id || i + "-getItem"}
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
