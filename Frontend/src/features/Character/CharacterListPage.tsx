import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllCharactersByStoryId from "../../hooks/Fetching/Character/useGetAllCharactersByStoryId";
import CharacterHeader from "./CharacterHeader/CharacterHeader";
import CharacterItem from "./CharacterItem";

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
  const { data: characters } = useGetAllCharactersByStoryId({
    storyId: storyId ?? "",
  });

  const memoizedCharacters = useMemo(() => {
    if (searchCharacterType === "all") {
      return characters;
    } else if (searchCharacterType === "emptycharacter") {
      return characters?.filter((c) => c.type === "emptycharacter");
    } else if (searchCharacterType === "minorcharacter") {
      return characters?.filter((c) => c.type === "minorcharacter");
    } else if (searchCharacterType === "maincharacter") {
      return characters?.filter((c) => c.type === "maincharacter");
    }
  }, [characters, searchCharacterType]);

  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto relative">
      <CharacterHeader
        searchValue={searchValue}
        searchCharacterType={searchCharacterType}
        setSearchValue={setSearchValue}
        setSearchCharacterType={setSearchCharacterType}
      />

      <main className="mt-[2rem] grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
        {memoizedCharacters?.map((mc) => (
          <CharacterItem key={mc._id} {...mc} />
        ))}
      </main>
    </section>
  );
}
