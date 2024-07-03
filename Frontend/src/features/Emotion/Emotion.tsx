import EmotionHeader from "./EmotionHeader";
import EmotionItem from "./EmotionItem";

export default function Emotion() {
  return (
    <section className="max-w-[146rem] mx-auto p-[1rem]">
      <EmotionHeader />
      <main className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] justify-items-center justify-center w-full mt-[2rem]">
        {...Array.from({ length: 10 }).map((_, i) => (
          <EmotionItem key={i + 1} />
        ))}
      </main>
    </section>
  );
}
