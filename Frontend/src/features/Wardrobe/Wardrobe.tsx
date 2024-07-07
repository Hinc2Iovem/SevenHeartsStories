import WardrobeHeader from "./WardrobeHeader";
import WardrobeItem from "./WardrobeItem";

export default function Wardrobe() {
  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto">
      <WardrobeHeader />
      <main className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] justify-items-center justify-center w-full mt-[2rem]">
        {...Array.from({ length: 10 }).map((_, i) => (
          <WardrobeItem key={i + 1} />
        ))}
      </main>
    </section>
  );
}
