import { useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCommandTypes } from "../../../../../types/Additional/TranslationTypes";
import PeriodPrompt from "../../InputPrompts/PeriodPrompt";
import DisplayTranslatedNonTranslatedRecentAppearancePart from "../Display/DisplayTranslatedNonTranslatedRecentAppearancePart";
import DisplayTranslatedNonTranslatedRecentCharacter from "../Display/DisplayTranslatedNonTranslatedRecentCharacter";
import DisplayTranslatedNonTranslatedRecentCharacteristic from "../Display/DisplayTranslatedNonTranslatedRecentCharacteristic";
import DisplayTranslatedNonTranslatedRecentChoice from "../Display/DisplayTranslatedNonTranslatedRecentChoice";
import DisplayTranslatedNonTranslatedRecentEpisode from "../Display/DisplayTranslatedNonTranslatedRecentEpisode";
import DisplayTranslatedNonTranslatedRecentGetItem from "../Display/DisplayTranslatedNonTranslatedRecentGetItem";
import DisplayTranslatedNonTranslatedRecentOneLiners from "../Display/DisplayTranslatedNonTranslatedRecentOneLiners";
import DisplayTranslatedNonTranslatedRecentSeason from "../Display/DisplayTranslatedNonTranslatedRecentSeason";
import DisplayTranslatedNonTranslatedRecentStory from "../Display/DisplayTranslatedNonTranslatedRecentStory";
import useMemoizeRefinedTranslations from "./useMemoizeRefinedTranslations";
import useInvalidateTranslatorQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorQueries";

type FiltersEverythingCharacterForRecentTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type UpdatedAtPossibleVariationTypes =
  | "30min"
  | "1hr"
  | "5hr"
  | "1d"
  | "3d"
  | "7d";

export type CombinedTranslatedAndNonTranslatedRecentTypes = {
  translated: TranslationCommandTypes;
  nonTranslated: TranslationCommandTypes | null;
};

export default function FiltersEverythingRecent({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForRecentTypes) {
  useInvalidateTranslatorQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    queryKey: "updatedAt",
    translateToLanguage,
  });
  const [period, setPeriod] = useState<UpdatedAtPossibleVariationTypes>(
    "" as UpdatedAtPossibleVariationTypes
  );

  const memoizedCombinedMultipleCommandsTranslations =
    useMemoizeRefinedTranslations({
      period,
      translateFromLanguage,
    });

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <PeriodPrompt setPeriod={setPeriod} period={period} />
      </div>
      <main className="w-full flex flex-col gap-[1rem]">
        {memoizedCombinedMultipleCommandsTranslations.oneLiners.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.oneLiners.translated.map(
              (t) => (
                <DisplayTranslatedNonTranslatedRecentOneLiners
                  key={t._id}
                  translated={t}
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
              (t) => (
                <DisplayTranslatedNonTranslatedRecentChoice
                  key={t._id}
                  translated={t}
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.getItem.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.getItem.translated.map(
              (t, i) => (
                <DisplayTranslatedNonTranslatedRecentGetItem
                  key={t?.getItemGrouped[i]?._id}
                  translated={t.getItemGrouped}
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.characteristic.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.characteristic.translated.map(
              (t) => (
                <DisplayTranslatedNonTranslatedRecentCharacteristic
                  key={t._id + "-ctCharacteristic"}
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                  translated={t}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.story.translated.length >
        0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.story.translated.map(
              (ct, i) => (
                <DisplayTranslatedNonTranslatedRecentStory
                  key={(ct.storyGrouped[i]?._id || i) + "-ctStory"}
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                  translated={ct.storyGrouped}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.episode.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.episode.translated.map(
              (ct, i) => (
                <DisplayTranslatedNonTranslatedRecentEpisode
                  key={(ct.episodeGrouped[i]?._id || i) + "-ctEpisode"}
                  languageToTranslate={translateToLanguage}
                  translated={ct.episodeGrouped}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.season.translated.length >
        0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.season.translated.map(
              (ct, i) => (
                <DisplayTranslatedNonTranslatedRecentSeason
                  key={(ct._id || i) + "-ctSeason"}
                  languageToTranslate={translateToLanguage}
                  translated={ct}
                  translateFromLanguage={translateFromLanguage}
                />
              )
            )}
          </div>
        ) : null}

        {memoizedCombinedMultipleCommandsTranslations.appearancePart.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.appearancePart.translated.map(
              (ct, i) => (
                <DisplayTranslatedNonTranslatedRecentAppearancePart
                  key={(ct._id || i) + "-ctAppearancePart"}
                  languageToTranslate={translateToLanguage}
                  translateFromLanguage={translateFromLanguage}
                  translated={ct}
                />
              )
            )}
          </div>
        ) : null}
        {memoizedCombinedMultipleCommandsTranslations.character.translated
          .length > 0 ? (
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))] gap-[1rem] w-full`}
          >
            {memoizedCombinedMultipleCommandsTranslations.character.translated.map(
              (ct, i) => (
                <DisplayTranslatedNonTranslatedRecentCharacter
                  key={(ct?.characterGrouped[i]?._id || i) + "-ct"}
                  languageToTranslate={translateToLanguage}
                  translated={ct.characterGrouped}
                  translateFromLanguage={translateFromLanguage}
                  characterTypeFilter=""
                />
              )
            )}
          </div>
        ) : null}
      </main>
    </>
  );
}
