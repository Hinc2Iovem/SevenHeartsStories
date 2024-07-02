import StorySinglePageHeader from "./StorySinglePageHeader";
import StorySinglePageMain from "./StorySinglePageMain";

export default function StorySinglePage() {
  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto">
      <StorySinglePageHeader />
      <StorySinglePageMain />
    </section>
  );
}
