import EditorHeader from "./EditorHeader/EditorHeader";
import EditorMain from "./EditorMain";
import "./Flowchart/FlowchartStyles.css";

export default function EpisodeEditor() {
  return (
    <section className="p-[1rem] mx-auto max-w-[146rem] flex flex-col gap-[1rem] | containerScroll">
      <EditorHeader />
      <EditorMain />
    </section>
  );
}
