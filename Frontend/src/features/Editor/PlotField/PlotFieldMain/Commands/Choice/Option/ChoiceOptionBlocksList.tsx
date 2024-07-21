import useGetAllChoiceOptionsByChoiceId from "../../hooks/Choice/ChoiceOption/useGetChoiceOption";
import ChoiceOptionBlock from "./ChoiceOptionBlock";

type ChoiceOptionBlockTypes = {
  choiceId: string;
};

export default function ChoiceOptionBlocksList({
  choiceId,
}: ChoiceOptionBlockTypes) {
  const { data: allChoiceOptionBlocks } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: choiceId,
  });
  return (
    <section className="w-full grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-[1rem] bg-neutral-magnolia rounded-md shadow-md p-[.5rem] items-center">
      {allChoiceOptionBlocks?.map((co) => (
        <ChoiceOptionBlock key={co._id} {...co} />
      ))}
    </section>
  );
}
