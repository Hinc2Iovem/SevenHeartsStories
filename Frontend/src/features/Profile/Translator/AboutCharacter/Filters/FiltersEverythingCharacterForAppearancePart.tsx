import { useMemo, useState } from "react";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationAppearancePartTypes } from "../../../../../types/Additional/TranslationTypes";
import CharacterPrompt from "../../InputPrompts/CharacterPrompt";
import useGetTranslationAppearancePartsQueries from "../../../../../hooks/Fetching/Translation/AppearancePart/useGetTranslationAppearancePartsQueries";
import DisplayTranslatedNonTranslatedAppearancePart from "../Display/AppearancePart/DisplayTranslatedNonTranslatedAppearancePart";
import AppearanceTypeDropDown from "../Display/AppearancePart/AppearanceTypeDropDown";
import { TranslationTextFieldNameAppearancePartsTypes } from "../../../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";

type FiltersEverythingCharacterForAppearancePartTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedAppearancePartTypes = {
  translated: TranslationAppearancePartTypes[];
  nonTranslated: TranslationAppearancePartTypes[] | null;
};

export default function FiltersEverythingCharacterForAppearancePart({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForAppearancePartTypes) {
  const [characterId, setCharacterId] = useState("");
  const [appearanceType, setAppearanceType] = useState(
    "" as TranslationTextFieldNameAppearancePartsTypes
  );

  const translatedAppearancePart = useGetTranslationAppearancePartsQueries({
    characterId,
    language: translateFromLanguage,
  });

  const nonTranslatedAppearancePart = useGetTranslationAppearancePartsQueries({
    characterId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (
      translatedAppearancePart.length > 0 &&
      nonTranslatedAppearancePart.length > 0
    ) {
      const arrayOfAppearancePart =
        [] as CombinedTranslatedAndNonTranslatedAppearancePartTypes[];
      const groupedAppearancePart: Record<
        string,
        CombinedTranslatedAndNonTranslatedAppearancePartTypes
      > = {};

      translatedAppearancePart.forEach((tc) => {
        if (tc.data) {
          const appearancePartId = tc.data.appearancePartId;
          if (!groupedAppearancePart[appearancePartId]) {
            groupedAppearancePart[appearancePartId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedAppearancePart[appearancePartId].translated.push(tc.data);
        }
      });

      nonTranslatedAppearancePart.forEach((ntc) => {
        if (ntc.data) {
          const appearancePartId = ntc.data.appearancePartId;
          if (!groupedAppearancePart[appearancePartId]) {
            groupedAppearancePart[appearancePartId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedAppearancePart[appearancePartId].nonTranslated) {
            groupedAppearancePart[appearancePartId].nonTranslated = [];
          }
          groupedAppearancePart[appearancePartId].nonTranslated.push(ntc.data);
        }
      });

      Object.values(groupedAppearancePart).forEach((group) =>
        arrayOfAppearancePart.push(group)
      );

      return arrayOfAppearancePart.filter(
        (group) => group.translated.length > 0
      );
    }
    return [];
  }, [translatedAppearancePart, nonTranslatedAppearancePart]);

  console.log(memoizedCombinedTranslations);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <CharacterPrompt setCharacterId={setCharacterId} />
        <AppearanceTypeDropDown
          appearanceType={appearanceType}
          setAppearanceType={setAppearanceType}
        />
      </div>
      <main
        className={`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct, i) => (
          <DisplayTranslatedNonTranslatedAppearancePart
            key={(ct.translated[i]?._id || i) + "-ctAppearancePart"}
            filteredAppearanceType={appearanceType}
            languageToTranslate={translateToLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
