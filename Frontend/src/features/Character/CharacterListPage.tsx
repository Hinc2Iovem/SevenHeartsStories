import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCharactersByStoryIdAndType from "../../hooks/Fetching/Character/useGetAllCharactersByStoryIdAndType";
import useDebounce from "../../hooks/utilities/useDebounce";
import CharacterHeader from "./CharacterHeader/CharacterHeader";
import CharacterItem from "./CharacterItem";
import useGetCharacterTranslationByTextFieldName from "../../hooks/Fetching/Character/useGetCharacterTranslationByTextFieldName";
import CharacterItemDebounce from "./CharacterItemDebounce";

export type CharacterTypes =
  | "EmptyCharacter"
  | "MinorCharacter"
  | "MainCharacter";

export type SearchCharacterVariationTypes =
  | "all"
  | "maincharacter"
  | "minorcharacter"
  | "emptycharacter";

export default function CharacterListPage() {
  const { storyId } = useParams();
  const [searchCharacterType, setSearchCharacterType] =
    useState<SearchCharacterVariationTypes>("all");
  const [searchValue, setSearchValue] = useState("");
  const { data: characters } = useGetAllCharactersByStoryIdAndType({
    searchCharacterType,
    storyId: storyId ?? "",
  });

  const debouncedValue = useDebounce({ value: searchValue, delay: 500 });
  const { data: charactersDebounced } =
    useGetCharacterTranslationByTextFieldName({ debouncedValue });

  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto relative">
      <CharacterHeader
        debouncedValue={debouncedValue}
        searchValue={searchValue}
        searchCharacterType={searchCharacterType}
        setSearchValue={setSearchValue}
        setSearchCharacterType={setSearchCharacterType}
      />

      {!debouncedValue.trim().length ? (
        <main className="mt-[2rem] grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
          {characters &&
            characters?.map((c) => <CharacterItem key={c._id} {...c} />)}
        </main>
      ) : (
        <main className="mt-[2rem] grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
          {charactersDebounced &&
            charactersDebounced?.map((cd) => (
              <CharacterItemDebounce key={cd._id} {...cd} />
            ))}
        </main>
      )}
    </section>
  );
}
