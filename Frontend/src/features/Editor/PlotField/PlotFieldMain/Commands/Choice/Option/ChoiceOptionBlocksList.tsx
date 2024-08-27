import useGetAllChoiceOptionsByChoiceId from "../../hooks/Choice/ChoiceOption/useGetChoiceAllChoiceOptionsByChoiceId";
import ChoiceOptionBlock from "./ChoiceOptionBlock";

type ChoiceOptionBlockTypes = {
  currentTopologyBlockId: string;
  plotFieldCommandId: string;
};

export default function ChoiceOptionBlocksList({
  currentTopologyBlockId,
  plotFieldCommandId,
}: ChoiceOptionBlockTypes) {
  const { data: allChoiceOptionBlocks } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: plotFieldCommandId,
    language: "russian",
  });

  return (
    <section
      className={`${
        allChoiceOptionBlocks?.length ? "" : "hidden"
      }  w-full grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] bg-neutral-magnolia rounded-md shadow-md p-[.5rem] items-center`}
    >
      {allChoiceOptionBlocks?.map((co) => (
        <ChoiceOptionBlock
          plotFieldCommandId={plotFieldCommandId}
          currentTopologyBlockId={currentTopologyBlockId}
          key={co._id}
          {...co}
        />
      ))}
    </section>
  );
}
