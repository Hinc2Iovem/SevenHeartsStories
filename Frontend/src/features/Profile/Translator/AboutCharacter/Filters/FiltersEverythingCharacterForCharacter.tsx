import { useMemo, useState } from "react";
import useGetTranslationCharactersQueries from "../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharactersQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationCharacterTypes } from "../../../../../types/Additional/TranslationTypes";
import CharacterTypesDropDown from "../Display/Character/CharacterTypesDropDown";
import DisplayTranslatedNonTranslatedCharacter from "../Display/Character/DisplayTranslatedNonTranslatedCharacter";
import CharacterPrompt from "../../InputPrompts/CharacterPrompt";
import StoryPrompt from "../../InputPrompts/StoryPrompt";

type FiltersEverythingCharacterForCharacterTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacterTypes = {
  translated: TranslationCharacterTypes[];
  nonTranslated: TranslationCharacterTypes[] | null;
};

export default function FiltersEverythingCharacterForCharacter({
  translateFromLanguage,
  translateToLanguage,
}: FiltersEverythingCharacterForCharacterTypes) {
  const [storyId, setStoryId] = useState("");
  const [characterId, setCharacterId] = useState("");

  const [characterType, setCharacterType] = useState("");
  const translatedCharacters = useGetTranslationCharactersQueries({
    storyId,
    language: translateFromLanguage,
  });

  const nonTranslatedCharacters = useGetTranslationCharactersQueries({
    storyId,
    language: translateToLanguage,
  });

  const memoizedCombinedTranslations = useMemo(() => {
    if (translatedCharacters.length > 0 && nonTranslatedCharacters.length > 0) {
      const arrayOfCharacters =
        [] as CombinedTranslatedAndNonTranslatedCharacterTypes[];
      const groupedCharacters: Record<
        string,
        CombinedTranslatedAndNonTranslatedCharacterTypes
      > = {};

      translatedCharacters.forEach((tc) => {
        tc.data?.forEach((tcd) => {
          const characterId = tcd.characterId;
          if (!groupedCharacters[characterId]) {
            groupedCharacters[characterId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          groupedCharacters[characterId].translated.push(tcd);
        });
      });

      nonTranslatedCharacters.forEach((ntc) => {
        ntc.data?.forEach((ntcd) => {
          const characterId = ntcd.characterId;
          if (!groupedCharacters[characterId]) {
            groupedCharacters[characterId] = {
              translated: [],
              nonTranslated: null,
            };
          }
          if (!groupedCharacters[characterId].nonTranslated) {
            groupedCharacters[characterId].nonTranslated = [];
          }
          groupedCharacters[characterId].nonTranslated.push(ntcd);
        });
      });

      Object.values(groupedCharacters).forEach((group) =>
        arrayOfCharacters.push(group)
      );

      return arrayOfCharacters.filter((group) => group.translated.length > 0);
    }
    return [];
  }, [translatedCharacters, nonTranslatedCharacters]);

  return (
    <>
      <div className="flex w-full gap-[1rem] bg-neutral-alabaster px-[.5rem] py-[.5rem] rounded-md shadow-sm">
        <StoryPrompt setStoryId={setStoryId} />
        <CharacterPrompt setCharacterId={setCharacterId} />
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
        {memoizedCombinedTranslations.map((ct, i) => (
          <DisplayTranslatedNonTranslatedCharacter
            key={(ct?.translated[i]?._id || i) + "-ct"}
            characterTypeFilter={characterType}
            characterIdFilter={characterId}
            languageToTranslate={translateToLanguage}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
