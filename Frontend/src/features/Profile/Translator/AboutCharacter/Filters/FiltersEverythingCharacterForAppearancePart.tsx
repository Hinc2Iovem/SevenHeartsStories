import { useMemo, useState } from "react";
import useGetTranslationAppearanceParts from "../../../../../hooks/Fetching/Translation/AppearancePart/useGetTranslationAppearanceParts";
import useInvalidateTranslatorAppearancePartsQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorAppearancePartsQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import { TranslationAppearancePartTypes } from "../../../../../types/Additional/TranslationTypes";
import CharacterPrompt from "../../InputPrompts/CharacterPrompt";
import AppearanceTypeDropDown from "../Display/AppearancePart/AppearanceTypeDropDown";
import DisplayTranslatedNonTranslatedAppearancePart from "../Display/AppearancePart/DisplayTranslatedNonTranslatedAppearancePart";

type FiltersEverythingCharacterForAppearancePartTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedAppearancePartTypes = {
  translated: TranslationAppearancePartTypes | null;
  nonTranslated: TranslationAppearancePartTypes | null;
};

export default function FiltersEverythingCharacterForAppearancePart({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForAppearancePartTypes) {
  const [characterId, setCharacterId] = useState("");
  const [appearanceType, setAppearanceType] = useState(
    "" as TranslationTextFieldNameAppearancePartsTypes
  );

  useInvalidateTranslatorAppearancePartsQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    translateToLanguage,
    characterId,
    type: appearanceType,
  });

  const { data: translatedAppearancePart } = useGetTranslationAppearanceParts({
    characterId,
    language: translateFromLanguage,
  });

  const { data: nonTranslatedAppearancePart } =
    useGetTranslationAppearanceParts({
      characterId,
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

  console.log(memoizedCombinedTranslations);
  console.log("characterId: ", characterId);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <CharacterPrompt
          setCharacterId={setCharacterId}
          characterId={characterId}
        />
        <AppearanceTypeDropDown setAppearanceType={setAppearanceType} />
      </div>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct, i) => (
          <DisplayTranslatedNonTranslatedAppearancePart
            key={(ct.translated?._id || i) + "-ctAppearancePart"}
            filteredAppearanceType={appearanceType}
            languageToTranslate={translateToLanguage}
            translateFromLanguage={translateFromLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
