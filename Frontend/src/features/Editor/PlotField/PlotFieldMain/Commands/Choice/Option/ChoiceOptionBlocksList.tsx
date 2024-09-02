import { useEffect, useState } from "react";
import useGetAllChoiceOptionsByChoiceId from "../../hooks/Choice/ChoiceOption/useGetChoiceAllChoiceOptionsByChoiceId";
import ChoiceOptionBlock from "./ChoiceOptionBlock";
import { useQueryClient } from "@tanstack/react-query";

type ChoiceOptionBlockTypes = {
  currentTopologyBlockId: string;
  plotFieldCommandId: string;
  amountOfOptions: number;
};

export default function ChoiceOptionBlocksList({
  currentTopologyBlockId,
  plotFieldCommandId,
  amountOfOptions,
}: ChoiceOptionBlockTypes) {
  const queryClient = useQueryClient();
  const [optionOrderToRevalidate, setOptionOrderToRevalidate] = useState<
    number | undefined
  >();
  const [optionOrderIdNotToRevalidate, setOptionOrderIdNotToRevalidate] =
    useState("");
  const [optionOrderIdToRevalidate, setOptionOrderIdToRevalidate] =
    useState("");

  const { data: allChoiceOptionBlocks } = useGetAllChoiceOptionsByChoiceId({
    plotFieldCommandChoiceId: plotFieldCommandId,
    language: "russian",
  });

  useEffect(() => {
    if (
      optionOrderIdNotToRevalidate?.trim().length &&
      typeof optionOrderToRevalidate === "number"
    ) {
      queryClient.invalidateQueries({
        queryKey: ["choiceOption", optionOrderIdToRevalidate],
        exact: true,
        type: "active",
      });
    }
  }, [
    optionOrderIdNotToRevalidate,
    optionOrderToRevalidate,
    optionOrderIdToRevalidate,
  ]);
  console.log("optionOrderIdToRevalidate: ", optionOrderIdToRevalidate);

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
          amountOfOptions={amountOfOptions}
          setOptionOrderToRevalidate={setOptionOrderToRevalidate}
          setOptionOrderIdNotToRevalidate={setOptionOrderIdNotToRevalidate}
          setOptionOrderIdToRevalidate={setOptionOrderIdToRevalidate}
          optionOrderIdNotToRevalidate={optionOrderIdNotToRevalidate}
          optionOrderToRevalidate={optionOrderToRevalidate}
          key={co._id}
          {...co}
        />
      ))}
    </section>
  );
}
