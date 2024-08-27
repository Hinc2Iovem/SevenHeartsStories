import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useOutOfModal from "../../../../../../hooks/UI/useOutOfModal";
import {
  ChoiceVariations,
  ChoiceVariationsTypes,
} from "../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useUpdateChoice from "../hooks/Choice/useUpdateChoice";
import useGetAllTopologyBlocksByEpisodeId from "../hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
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
  const choiceVariationRef = useRef<HTMLDivElement>(null);
  const choiceVariationMultipleRef = useRef<HTMLDivElement>(null);
  const { data: allTopologyBlocks } = useGetAllTopologyBlocksByEpisodeId({
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

  const updateChoice = useUpdateChoice({ choiceId });

  useEffect(() => {
    if (timeLimit) {
      updateChoice.mutate({
        choiceType: choiceVariationTypes || "timelimit",
        timeLimit,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  useOutOfModal({
    modalRef: choiceVariationRef,
    setShowModal: setShowChoiceVariationTypesModal,
    showModal: showChoiceVariationTypesModal,
  });
  useOutOfModal({
    modalRef: choiceVariationMultipleRef,
    setShowModal: setShowChoiceMultipleModal,
    showModal: showChoiceMultipleModal,
  });
  return (
    <>
      <div className="relative flex-grow">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowChoiceMultipleModal(false);
            setShowChoiceVariationTypesModal((prev) => !prev);
          }}
          className="w-full text-start outline-gray-400 whitespace-nowrap text-[1.3rem] bg-white rounded-md text-gray-700 shadow-md px-[1rem] py-[.5rem]"
        >
          {choiceVariationTypes ? choiceVariationTypes : "Тип Выбора"}
        </button>

        <aside
          ref={choiceVariationRef}
          className={`${
            showChoiceVariationTypesModal ? "" : "hidden"
          } translate-y-[.5rem] absolute flex flex-col gap-[1rem] bg-primary-light-blue rounded-md shadow-md z-[10] min-w-fit w-full p-[.5rem]`}
        >
          {ChoiceVariations.map((cv) => (
            <button
              key={cv}
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
          onClick={(e) => {
            e.stopPropagation();
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
          ref={choiceVariationMultipleRef}
          className={`${
            showChoiceMultipleModal ? "" : "hidden"
          } translate-y-[.5rem] absolute z-10 flex flex-col gap-[1rem] bg-primary-light-blue rounded-md shadow-md w-full min-w-fit p-[.5rem]`}
        >
          {(exitBlockId && (allTopologyBlocks?.length || 0) > 1) ||
          (!exitBlockId && allTopologyBlocks?.length) ? (
            allTopologyBlocks?.map((atb) => (
              <button
                key={atb._id}
                className={`${
                  atb._id === exitBlockId ? "hidden" : ""
                } text-start outline-gray-400 whitespace-nowrap text-[1.3rem] rounded-md shadow-md bg-white text-gray-700 px-[1rem] py-[.5rem]`}
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
            ))
          ) : (
            <button
              className={`text-start outline-gray-400 text-[1.3rem] rounded-md shadow-md bg-white text-gray-700 px-[1rem] py-[.5rem]`}
              onClick={() => {
                setShowChoiceVariationTypesModal(false);
                setShowChoiceMultipleModal(false);
              }}
            >
              Пусто
            </button>
          )}
        </aside>
      </form>
    </>
  );
}
