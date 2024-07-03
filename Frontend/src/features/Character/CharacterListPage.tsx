import CharacterHeader from "./CharacterHeader";
import CharacterItem from "./CharacterItem";

export type CharacterTypes = "EmptyCharacter" | "MinorCharacter" | "MainHero";

export default function CharacterListPage() {
  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto relative">
      <CharacterHeader />
      <main className="mt-[2rem] grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] justify-items-center justify-center w-full">
        <CharacterItem />
      </main>
    </section>
  );
}
