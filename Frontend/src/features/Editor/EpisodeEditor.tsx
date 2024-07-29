import EditorHeader from "./EditorHeader/EditorHeader";
import EditorMain from "./EditorMain";

export default function EpisodeEditor() {
  return (
    <section className="p-[1rem] mx-auto flex flex-col gap-[1rem]">
      <EditorHeader />
      <EditorMain />
    </section>
  );
}
