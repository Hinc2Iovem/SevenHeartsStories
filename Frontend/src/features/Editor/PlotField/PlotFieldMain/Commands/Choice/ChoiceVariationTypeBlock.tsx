import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import {
  ChoiceVariations,
  ChoiceVariationsTypes,
} from "../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useUpdateChoiceText from "../hooks/Choice/useUpdateChoiceText";
import useGetAllTopologyBlocksByIdId from "../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import useGetTopologyBlockById from "../hooks/TopologyBlock/useGetTopologyBlockById";

type ChoiceVariationTypeBlockTypes = {
  exitBlockId: string;
  choiceId: string;
  timeLimit: number;
  setExitBlockId: React.Dispatch<React.SetStateAction<string>>;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  setChoiceVariationTypes: React.Dispatch<
    React.SetStateAction<ChoiceVariationsTypes>
  >;
  choiceVariationTypes: ChoiceVariationsTypes;
};

export default function ChoiceVariationTypeBlock({
  exitBlockId,
  choiceId,
  setExitBlockId,
  timeLimit,
  setTimeLimit,
  choiceVariationTypes,
  setChoiceVariationTypes,
}: ChoiceVariationTypeBlockTypes) {
  const { episodeId } = useParams();

  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByIdId({
    episodeId: episodeId ?? "",
  });
  const { data: currentTopologyBlock } = useGetTopologyBlockById({
    topologyBlockId: exitBlockId,
  });
  const [currentTopologyBlockName, setCurrentTopologyBlockName] = useState("");

  useEffect(() => {
    if (currentTopologyBlock) {
      setCurrentTopologyBlockName(currentTopologyBlock.name || "");
    }
  }, [currentTopologyBlock]);

  const [showChoiceVariationTypesModal, setShowChoiceVariationTypesModal] =
    useState(false);
  const [showChoiceMultipleModal, setShowChoiceMultipleModal] = useState(false);

  useEscapeOfModal({
    setValue: setShowChoiceVariationTypesModal,
    value: showChoiceVariationTypesModal,
  });
  useEscapeOfModal({
    setValue: setShowChoiceMultipleModal,
    value: showChoiceMultipleModal,
  });

  const updateChoice = useUpdateChoiceText({ choiceId });

  useEffect(() => {
    if (timeLimit) {
      updateChoice.mutate({
        choiceType: choiceVariationTypes || "timelimit",
        timeLimit,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  return (
    <>
      <div className="relative flex-grow">
        <button
          onClick={() => {
            setShowChoiceMultipleModal(false);
            setShowChoiceVariationTypesModal((prev) => !prev);
          }}
          className="w-full text-start outline-gray-400 whitespace-nowrap text-[1.3rem] bg-white rounded-md text-gray-700 shadow-md px-[1rem] py-[.5rem]"
        >
          {choiceVariationTypes ? choiceVariationTypes : "Тип Выбора"}
        </button>

        <aside
          className={`${
            showChoiceVariationTypesModal ? "" : "hidden"
          } absolute flex flex-col gap-[1rem] bg-primary-light-blue rounded-md shadow-md z-[10] min-w-fit w-full p-[.5rem]`}
        >
          {ChoiceVariations.map((cv) => (
            <button
              className={`${
                cv === choiceVariationTypes ? "hidden" : ""
              } w-full text-start outline-gray-400 text-[1.3rem] rounded-md shadow-md bg-white text-gray-700 px-[1rem] py-[.5rem]`}
              onClick={() => {
                setChoiceVariationTypes(cv);
                setShowChoiceVariationTypesModal(false);
                if (cv === "common") {
                  updateChoice.mutate({ choiceType: "common" });
                }
              }}
            >
              {cv}
            </button>
          ))}
        </aside>
      </div>

      <form
        className={`${
          choiceVariationTypes === "common" ||
          !choiceVariationTypes?.trim().length
            ? "hidden"
            : ""
        } flex-grow shadow-md bg-white rounded-md relative`}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className={`${
            choiceVariationTypes === "timelimit" ? "" : "hidden"
          } w-full text-[1.3rem] px-[1rem] py-[.5rem] rounded-md outline-gray-400`}
          value={timeLimit || ""}
          onChange={(e) => setTimeLimit(+e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            setShowChoiceVariationTypesModal(false);
            setShowChoiceMultipleModal((prev) => !prev);
          }}
          className={`${
            choiceVariationTypes === "multiple" ? "" : "hidden"
          } text-start w-full text-[1.3rem] px-[1rem] py-[.5rem] rounded-md outline-gray-400`}
        >
          {currentTopologyBlockName?.trim().length
            ? currentTopologyBlockName
            : "Повторная Ветка"}
        </button>
        <aside
          className={`${
            showChoiceMultipleModal ? "" : "hidden"
          } absolute z-10 flex flex-col gap-[1rem] bg-primary-light-blue rounded-md shadow-md translate-y-[] w-full p-[.5rem]`}
        >
          {allTopologyBlocks?.map((atb) => (
            <button
              className={`${
                atb._id === exitBlockId ? "hidden" : ""
              } text-start outline-gray-400 text-[1.3rem] rounded-md shadow-md bg-white text-gray-700 px-[1rem] py-[.5rem]`}
              onClick={() => {
                setExitBlockId(atb._id);
                setShowChoiceVariationTypesModal(false);
                setShowChoiceMultipleModal(false);
                updateChoice.mutate({
                  choiceType: choiceVariationTypes || "multiple",
                  exitBlockId: atb._id,
                });
              }}
            >
              {atb.name}
            </button>
          ))}
        </aside>
      </form>
    </>
  );
}
