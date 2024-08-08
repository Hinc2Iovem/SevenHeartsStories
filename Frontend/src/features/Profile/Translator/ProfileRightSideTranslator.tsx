import { useMemo, useState } from "react";
import useGetTranslationCharactersQueries from "../../../hooks/Fetching/Translation/Characters/useGetTranslationCharactersQueries";
import { CurrentlyAvailableLanguagesTypes } from "../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { TranslationTextFieldNameCharacterTypes } from "../../../types/Additional/TRANSLATION_TEXT_FIELD_NAMES";
import "../../Editor/Flowchart/FlowchartStyles.css";
import CharacterPrompt from "./InputPrompts/CharacterPrompt";
import StoryPrompt from "./InputPrompts/StoryPrompt";
import ProfileRightSideTranslatorHeader from "./ProfileRightSideTranslatorHeader";
import DisplayTranslatedNonTranslatedCharacter from "./AboutCharacter/Character/DisplayTranslatedNonTranslatedCharacter";
import CharacterTypesDropDown from "./AboutCharacter/Character/CharacterTypesDropDown";

export type PossibleCategoryVariationTypes =
  | "everythingCharacter"
  | "everythingStory"
  | "everythingPlot";

export type AllPossibleSubCategoryTypes =
  | "Персонажи"
  | "Эмоции"
  | "Внешний Вид"
  | "Характеристики"
  | "Эпизоды"
  | "Сезоны"
  | "Истории";

export default function ProfileRightSideTranslator() {
  const [translateFromLanguage, setTranslateFromLanguage] =
    useState<CurrentlyAvailableLanguagesTypes>(
      "" as CurrentlyAvailableLanguagesTypes
    );
  const [translateToLanguage, setTranslateToLanguage] =
    useState<CurrentlyAvailableLanguagesTypes>(
      "" as CurrentlyAvailableLanguagesTypes
    );

  const [category, setCategory] = useState<PossibleCategoryVariationTypes>(
    "" as PossibleCategoryVariationTypes
  );
  const [subCategory, setSubCategory] = useState<AllPossibleSubCategoryTypes>(
    "" as AllPossibleSubCategoryTypes
  );

  return (
    <section className="w-full flex flex-col gap-[1.5rem]">
      <ProfileRightSideTranslatorHeader
        category={category}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        subCategory={subCategory}
        setTranslateFromLanguage={setTranslateFromLanguage}
        setTranslateToLanguage={setTranslateToLanguage}
        translateFromLanguage={translateFromLanguage}
        translateToLanguage={translateToLanguage}
      />
      <main className="w-full flex flex-col gap-[1rem]">
        <div className="flex flex-col w-full gap-[1rem]">
          {subCategory === "Персонажи" ? (
            <FiltersEverythingCharacterForCharacter
              translateFromLanguage={translateFromLanguage}
              translateToLanguage={translateToLanguage}
            />
          ) : null}
        </div>
      </main>
    </section>
  );
}

type FiltersEverythingCharacterForCharacterTypes = {
  translateFromLanguage: CurrentlyAvailableLanguagesTypes;
  translateToLanguage: CurrentlyAvailableLanguagesTypes;
};

export type CombinedTranslatedAndNonTranslatedCharacterTypes = {
  translated: {
    _id: string;
    characterId: string;
    language: CurrentlyAvailableLanguagesTypes;
    text: string;
    amountOfWords: number;
    textFieldName: TranslationTextFieldNameCharacterTypes;
  }[];
  nonTranslated:
    | {
        _id: string;
        characterId: string;
        language: CurrentlyAvailableLanguagesTypes;
        text: string;
        amountOfWords: number;
        textFieldName: TranslationTextFieldNameCharacterTypes;
      }[]
    | null;
};

function FiltersEverythingCharacterForCharacter({
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

      return arrayOfCharacters;
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
            key={i + "-ct"}
            characterTypeFilter={characterType}
            characterIdFilter={characterId}
            {...ct}
          />
        ))}
      </main>
    </>
  );
}
