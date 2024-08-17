import { useMemo, useState } from "react";
import useGetTranslationCharacters from "../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharacters";
import useInvalidateTranslatorCharacterQueries from "../../../../../hooks/helpers/Profile/Translator/useInvalidateTranslatorCharacterQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterTypes } from "../../../../../types/Additional/TranslationTypes";
import CharacterPrompt from "../../InputPrompts/CharacterPrompt";
import StoryPrompt from "../../InputPrompts/StoryPrompt";
import CharacterTypesDropDown from "../Display/Character/CharacterTypesDropDown";
import DisplayTranslatedNonTranslatedCharacter from "../Display/Character/DisplayTranslatedNonTranslatedCharacter";

type FiltersEverythingCharacterForCharacterTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateFromLanguage: CurrentlyAvailableLanguagesTypes;
  prevTranslateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacterTypes = {
  translated: TranslationCharacterTypes | null;
  nonTranslated: TranslationCharacterTypes | null;
};

export default function FiltersEverythingCharacterForCharacter({
  translateFromLanguage,
  translateToLanguage,
  prevTranslateFromLanguage,
  prevTranslateToLanguage,
}: FiltersEverythingCharacterForCharacterTypes) {
  const [storyId, setStoryId] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [characterType, setCharacterType] = useState("");

  useInvalidateTranslatorCharacterQueries({
    prevTranslateFromLanguage,
    prevTranslateToLanguage,
    storyId,
    translateToLanguage,
  });

  const { data: translatedCharacters } = useGetTranslationCharacters({
    storyId,
    language: translateFromLanguage,
  });

  const { data: nonTranslatedCharacters } = useGetTranslationCharacters({
    storyId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    const combinedArray: CombinedTranslatedAndNonTranslatedCharacterTypes[] =
      [];
    const characterMap: {
      [key: string]: CombinedTranslatedAndNonTranslatedCharacterTypes;
    } = {};

    translatedCharacters?.forEach((tc) => {
      const characterId = tc.characterId;
      if (!characterMap[characterId]) {
        characterMap[characterId] = {
          translated: tc,
          nonTranslated: null,
        };
      } else {
        characterMap[characterId].translated = tc;
      }
    });

    nonTranslatedCharacters?.forEach((ntc) => {
      const characterId = ntc.characterId;
      if (!characterMap[characterId]) {
        characterMap[characterId] = {
          translated: null,
          nonTranslated: ntc,
        };
      } else {
        characterMap[characterId].nonTranslated = ntc;
      }
    });

    Object.values(characterMap).forEach((entry) => {
      combinedArray.push(entry);
    });

    return combinedArray;
  }, [translatedCharacters, nonTranslatedCharacters]);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
        <CharacterPrompt setCharacterId={setCharacterId} storyId={storyId} />
        <CharacterTypesDropDown
          setCharacterType={setCharacterType}
          characterType={characterType}
        />
      </div>
      <main
        className={`grid ${
          characterType === "Обычный Персонаж" ||
          characterType === "Главный Персонаж"
            ? "grid-cols-[repeat(auto-fill,minmax(25rem,1fr))]"
            : "grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(50rem,1fr))]"
        } gap-[1rem] w-full`}
      >
        {memoizedCombinedTranslations.map((ct, i) => {
          return (
            <DisplayTranslatedNonTranslatedCharacter
              key={(ct?.translated?._id || i) + "-ct"}
              characterTypeFilter={characterType}
              characterIdFilter={characterId}
              translateFromLanguage={translateFromLanguage}
              languageToTranslate={translateToLanguage}
              {...ct}
            />
          );
        })}
      </main>
    </>
  );
}
