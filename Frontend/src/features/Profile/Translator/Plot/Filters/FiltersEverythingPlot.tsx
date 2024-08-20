import { useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCommandTypes } from "../../../../../types/Additional/TranslationTypes";
import EpisodePrompt from "../../InputPrompts/EpisodePrompt";
import SeasonPrompt from "../../InputPrompts/SeasonPrompt";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import TopologyBlockPrompt from "../../InputPrompts/TopologyBlockPrompt";
import FiltersEverythingPlotGetItem from "./FiltersEverythingPlotGetItem";
import FiltersEverythingPlotCommandWardrobe from "./FiltersEverythingPlotCommandWardrobe";
import FiltersEverythingPlotChoice from "./FiltersEverythingPlotChoice";

type FiltersEverythingPlotTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

// type CombinedMultipleCommandsTranslatedAndNonTranslatedPlotTypes = {
//   oneLiners: {
//     translated: TranslationCommandTypes[];
//     nonTranslated: TranslationCommandTypes[] | null;
//   };
//   choice: {
//     translated: TranslationCommandTypes[];
//     nonTranslated: TranslationCommandTypes[] | null;
//   };
//   getItem: {
//     translated: { getItemGrouped: TranslationCommandTypes[] }[];
//     nonTranslated:
//       | { getItemGrouped: TranslationCommandTypes[] }[]
//       | { getItemGrouped: null }[];
//   };
// };

export type CombinedTranslatedAndNonTranslatedPlotTypes = {
  translated: TranslationCommandTypes;
  nonTranslated: TranslationCommandTypes | null;
};

export default function FiltersEverythingPlot({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingPlotTypes) {
  const [storyId, setStoryId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [episodeId, setEpisodeId] = useState("");
  const [topologyBlockId, setTopologyBlockId] = useState("");

  // const translatedPlot = useGetTranslationCommandsQueries({
  //   topologyBlockId,
  //   language: translateFromLanguage,
  // });

  // const nonTranslatedPlot = useGetTranslationCommandsQueries({
  //   topologyBlockId,
  //   language: translateToLanguage,
  // });

  // const memoizedCombinedMultipleCommandsTranslations = useMemo(() => {
  //   if (translatedPlot.length > 0 && nonTranslatedPlot.length > 0) {
  //     const combinedTranslations: CombinedMultipleCommandsTranslatedAndNonTranslatedPlotTypes =
  //       {
  //         oneLiners: {
  //           translated: [],
  //           nonTranslated: null,
  //         },
  //         choice: {
  //           translated: [],
  //           nonTranslated: null,
  //         },
  //         getItem: {
  //           translated: [],
  //           nonTranslated: [],
  //         },
  //       };
  //     const getItemTranslatedGroups: Record<string, TranslationCommandTypes[]> =
  //       {};

  //     translatedPlot.forEach((tc) => {
  //       tc.data?.forEach((tcd) => {
  //         if (
  //           tcd.textFieldName === "achievementName" ||
  //           tcd.textFieldName === "sayText" ||
  //           tcd.textFieldName === "commandWardrobeTitle"
  //         ) {
  //           combinedTranslations.oneLiners.translated.push(
  //             tcd as TranslationCommandTypes
  //           );
  //         } else if (tcd.textFieldName === "choiceQuestion") {
  //           combinedTranslations.choice.translated.push(
  //             tcd as TranslationCommandTypes
  //           );
  //         } else if (
  //           tcd.textFieldName === "buttonText" ||
  //           tcd.textFieldName === "itemDescription" ||
  //           tcd.textFieldName === "itemName"
  //         ) {
  //           if (!getItemTranslatedGroups[tcd.commandId]) {
  //             getItemTranslatedGroups[tcd.commandId] = [];
  //           }
  //           getItemTranslatedGroups[tcd.commandId].push(tcd);
  //         }
  //       });
  //     });

  //     combinedTranslations.getItem.translated = Object.keys(
  //       getItemTranslatedGroups
  //     ).map((commandId) => ({
  //       getItemGrouped: getItemTranslatedGroups[commandId],
  //     }));

  //     const getItemNonTranslatedGroups: Record<
  //       string,
  //       TranslationCommandTypes[]
  //     > = {};

  //     nonTranslatedPlot.forEach((ntc) => {
  //       ntc.data?.forEach((ntcd) => {
  //         if (
  //           ntcd.textFieldName === "achievementName" ||
  //           ntcd.textFieldName === "sayText" ||
  //           ntcd.textFieldName === "commandWardrobeTitle"
  //         ) {
  //           if (!combinedTranslations.oneLiners.nonTranslated) {
  //             combinedTranslations.oneLiners.nonTranslated = [];
  //           }
  //           combinedTranslations.oneLiners.nonTranslated.push(
  //             ntcd as TranslationCommandTypes
  //           );
  //         } else if (ntcd.textFieldName === "choiceQuestion") {
  //           if (!combinedTranslations.choice.nonTranslated) {
  //             combinedTranslations.choice.nonTranslated = [];
  //           }
  //           combinedTranslations.choice.nonTranslated.push(
  //             ntcd as TranslationCommandTypes
  //           );
  //         } else if (
  //           ntcd.textFieldName === "buttonText" ||
  //           ntcd.textFieldName === "itemDescription" ||
  //           ntcd.textFieldName === "itemName"
  //         ) {
  //           if (!getItemNonTranslatedGroups[ntcd.commandId]) {
  //             getItemNonTranslatedGroups[ntcd.commandId] = [];
  //           }
  //           getItemNonTranslatedGroups[ntcd.commandId].push(ntcd);
  //         }
  //       });
  //     });

  //     combinedTranslations.getItem.nonTranslated = Object.keys(
  //       getItemNonTranslatedGroups
  //     ).map((commandId) => ({
  //       getItemGrouped: getItemNonTranslatedGroups[commandId],
  //     }));

  //     return combinedTranslations;
  //   }
  //   return {
  //     oneLiners: {
  //       translated: [],
  //       nonTranslated: null,
  //     },
  //     choice: {
  //       translated: [],
  //       nonTranslated: null,
  //     },
  //     getItem: {
  //       translated: [],
  //       nonTranslated: null,
  //     },
  //   };
  // }, [translatedPlot, nonTranslatedPlot]);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
        <SeasonPrompt setSeasonId={setSeasonId} storyId={storyId} />
        <EpisodePrompt seasonId={seasonId} setEpisodeId={setEpisodeId} />
        <TopologyBlockPrompt
          episodeId={episodeId}
          setTopologyBlockId={setTopologyBlockId}
        />
      </div>
      <main className="w-full flex flex-col gap-[1rem]">
        {/* {memoizedCombinedMultipleCommandsTranslations.oneLiners.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.oneLiners.translated.map(
              (t, i) => (
                <DisplayTranslatedNonTranslatedPlotOneLiners
                  key={t._id}
                  translated={t}
                  nonTranslated={
                    memoizedCombinedMultipleCommandsTranslations.oneLiners
                      .nonTranslated &&
                    memoizedCombinedMultipleCommandsTranslations.oneLiners
                      .nonTranslated[i]
                      ? memoizedCombinedMultipleCommandsTranslations.oneLiners
                          .nonTranslated[i]
                      : null
                  }
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.choice.translated.length >
        0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.choice.translated.map(
              (t, i) => (
                <DisplayTranslatedNonTranslatedChoice
                  key={t._id}
                  translated={t}
                  nonTranslated={
                    memoizedCombinedMultipleCommandsTranslations.choice
                      .nonTranslated &&
                    memoizedCombinedMultipleCommandsTranslations.choice
                      .nonTranslated[i]
                      ? memoizedCombinedMultipleCommandsTranslations.choice
                          .nonTranslated[i]
                      : null
                  }
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null} */}
        <FiltersEverythingPlotCommandWardrobe
          prevTranslateFromLanguage={prevTranslateFromLanguage}
          prevTranslateToLanguage={prevTranslateToLanguage}
          topologyBlockId={topologyBlockId}
          translateFromLanguage={translateFromLanguage}
          translateToLanguage={translateToLanguage}
        />
        <FiltersEverythingPlotGetItem
          prevTranslateFromLanguage={prevTranslateFromLanguage}
          prevTranslateToLanguage={prevTranslateToLanguage}
          topologyBlockId={topologyBlockId}
          translateFromLanguage={translateFromLanguage}
          translateToLanguage={translateToLanguage}
        />
        <FiltersEverythingPlotChoice
          prevTranslateFromLanguage={prevTranslateFromLanguage}
          prevTranslateToLanguage={prevTranslateToLanguage}
          topologyBlockId={topologyBlockId}
          translateFromLanguage={translateFromLanguage}
          translateToLanguage={translateToLanguage}
        />
      </main>
    </>
  );
}
