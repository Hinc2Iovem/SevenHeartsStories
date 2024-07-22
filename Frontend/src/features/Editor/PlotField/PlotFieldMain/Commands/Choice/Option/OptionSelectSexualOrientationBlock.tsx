import { useState } from "react";
import useEscapeOfModal from "../../../../../../../hooks/UI/useEscapeOfModal";
import useUpdateChoiceOptionSexualOrientation from "../../hooks/Choice/ChoiceOption/useUpdateChoiceOptionSexualOrientation";
import { AllSexualOrientations } from "../../../../../../../types/StoryEditor/PlotField/Choice/SEXUAL_ORIENTATION_TYPES";
import "./OptionRaibowBtnStyles.css";

type OptionSelectSexualOrientationBlockTypes = {
  sexualOrientation: string;
  choiceOptionId: string;
};

export default function OptionSelectSexualOrientationBlock({
  sexualOrientation,
  choiceOptionId,
}: OptionSelectSexualOrientationBlockTypes) {
  const [showAllSexualOrientationBlocks, setShowAllSexualOrientationBlocks] =
    useState(false);
  const [
    currentSexualOrientationBlockName,
    setCurrentSexualOrientationBlockName,
  ] = useState(sexualOrientation);

  const updateOptionSexualOrientationBlock =
    useUpdateChoiceOptionSexualOrientation({
      choiceOptionId,
    });

  useEscapeOfModal({
    setValue: setShowAllSexualOrientationBlocks,
    value: showAllSexualOrientationBlocks,
  });

  return (
    <div className="relative w-fit">
      <button
        onClick={() => setShowAllSexualOrientationBlocks((prev) => !prev)}
        className="text-[1.3rem] text-white outline-gray-300 shadow-md rounded-md px-[1rem] py-[.5rem] | rainbowBtn"
        type="button"
      >
        {currentSexualOrientationBlockName ?? "Текущая Ветка"}
      </button>
      <aside
        className={`${
          showAllSexualOrientationBlocks ? "" : "hidden"
        } left-0 z-[10] flex flex-col gap-[1rem] p-[.5rem] absolute min-w-fit w-full rounded-md shadow-md bg-white right-[0rem] translate-y-[.5rem]`}
      >
        {AllSexualOrientations?.map((so) => (
          <button
            key={so}
            type="button"
            onClick={() => {
              setShowAllSexualOrientationBlocks(false);
              setCurrentSexualOrientationBlockName(so);
              updateOptionSexualOrientationBlock.mutate({
                sexualOrientationType: so,
              });
            }}
            className={`${
              currentSexualOrientationBlockName === so ? "hidden" : ""
            } px-[1rem] py-[.5rem] whitespace-nowrap text-[1.3rem] outline-gray-300 text-gray-700 hover:bg-primary-light-blue hover:text-white shadow-md transition-all rounded-md | rainbowBtn`}
          >
            {so}
          </button>
        ))}
      </aside>
    </div>
  );
}
