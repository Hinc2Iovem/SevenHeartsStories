import { useEffect, useRef, useState } from "react";
import assignBlack from "../../../assets/images/Profile/assignBlack.svg";
import useGetAllScriptwriters from "../../../hooks/Fetching/Staff/useGetAllScriptwriters";
import useGetStoryAssignedWorkersEnabledModalOpen from "../../../hooks/Fetching/Story/useGetStoryAssignedWorkersEnabledModalOpen";
import useOutOfModal from "../../../hooks/UI/useOutOfModal";
import "../../Editor/Flowchart/FlowchartStyles.css";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import useAssignWorker from "../../../hooks/Patching/Story/useAssignWorker";

type AssignScriptwriterModalTypes = {
  setCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
  setOpenedStoryId: React.Dispatch<React.SetStateAction<string>>;
  characterIds: string[];
  openedStoryId: string;
  storyTitle: string;
  storyId: string;
};

export default function AssignScriptwriterModal({
  storyTitle,
  storyId,
  openedStoryId,
  setOpenedStoryId,
  setCharacterIds,
  characterIds,
}: AssignScriptwriterModalTypes) {
  const [showScriptwriters, setShowScriptwriters] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: assignedWorkes } = useGetStoryAssignedWorkersEnabledModalOpen({
    storyId,
    showModal: showScriptwriters,
  });

  useEffect(() => {
    if (showScriptwriters && assignedWorkes) {
      const allAssignedWorkersIds: string[] = [];
      assignedWorkes.map((aw) => {
        allAssignedWorkersIds.push(aw.staffId);
      });
      setCharacterIds(allAssignedWorkersIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScriptwriters, assignedWorkes]);

  useOutOfModal({
    modalRef,
    setShowModal: setShowScriptwriters,
    showModal: showScriptwriters,
  });

  const { data: allScriptwriters } = useGetAllScriptwriters({
    showModal: showScriptwriters,
  });

  useEffect(() => {
    if (storyId === openedStoryId) {
      setShowScriptwriters(true);
    } else {
      setShowScriptwriters(false);
    }
  }, [storyId, openedStoryId]);

  const assignWorker = useAssignWorker({ storyId });

  const handleSubmit = () => {
    if (characterIds) {
      characterIds.map((c) => assignWorker.mutate({ staffId: c }));
    }
  };

  return (
    <>
      <div className="absolute bottom-[4.5rem] right-[.5rem] bg-white rounded-md shadow-md">
        <ButtonHoverPromptModal
          className="bg-white w-[3rem] shadow-md"
          positionByAbscissa="right"
          contentName="Назначить Сценариста"
          variant={"rectangle"}
          asideClasses="text-[1.5rem]"
          onClick={(e) => {
            e.stopPropagation();
            if (openedStoryId === storyId) {
              setOpenedStoryId("");
            } else {
              setCharacterIds([""]);
              setOpenedStoryId(storyId);
            }
          }}
        >
          <img
            src={assignBlack}
            alt="Назначить Сценариста"
            className="w-full"
          />
        </ButtonHoverPromptModal>
      </div>
      <aside
        ref={modalRef}
        className={`${
          showScriptwriters ? "" : "hidden"
        } z-[10] fixed bottom-[1rem] flex flex-col gap-[1rem] right-[1rem] bg-white rounded-md shadow-md p-[1rem] h-[30rem] w-[20rem]`}
      >
        <h2 className="text-[1.6rem] text-black text-center">
          {storyTitle || ""}
        </h2>
        <ul className="h-[20rem] overflow-auto px-[1rem] py-[.5rem] flex flex-col gap-[1rem] | containerScroll">
          {allScriptwriters ? (
            allScriptwriters?.map((s) => (
              <button
                key={s._id}
                onClick={() => {
                  if (characterIds.includes(s._id)) {
                    setCharacterIds((prev) => prev.filter((c) => c !== s._id));
                  } else {
                    setCharacterIds((prev) => {
                      return [...prev, s._id];
                    });
                  }
                }}
                className={`${
                  characterIds.includes(s._id)
                    ? "bg-primary-light-blue text-white"
                    : "text-black bg-white"
                } flex px-[.5rem] gap-[.5rem] py-[.5rem] justify-between w-full items-center rounded-md shadow-md hover:text-white hover:bg-primary-light-blue transition-all`}
              >
                {s.imgUrl ? (
                  <img
                    src={s.imgUrl}
                    alt={s.username}
                    className="w-[3.5rem] rounded-md"
                  />
                ) : null}
                <p className="text-[1.5rem] w-full">
                  {s.username.length > 10
                    ? s.username.substring(0, 10) + "..."
                    : s.username}
                </p>
              </button>
            ))
          ) : (
            <button className="flex px-[.5rem] gap-[.5rem] py-[.5rem] justify-between w-full items-center rounded-md shadow-md hover:text-white text-black hover:bg-primary-light-blue bg-white transition-all">
              Покамись Пусто
            </button>
          )}
        </ul>
        <button
          onClick={() => {
            setShowScriptwriters(false);
            handleSubmit();
          }}
          className="w-full px-[1rem] py-[.5rem] rounded-md shadow-md hover:bg-green-300  bg-white text-[1.5rem] text-gray-700 hover:text-white transition-all"
        >
          Назначить
        </button>
      </aside>
    </>
  );
}
