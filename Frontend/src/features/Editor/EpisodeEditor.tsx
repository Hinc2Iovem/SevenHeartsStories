import EditorHeader from "./EditorHeader/EditorHeader";
import EditorMain from "./EditorMain";

export default function EpisodeEditor() {
  return (
    <section className="max-w-[146rem] p-[1rem] mx-auto flex flex-col gap-[1rem]">
      <EditorHeader />
      <EditorMain />
    </section>
  );
}
