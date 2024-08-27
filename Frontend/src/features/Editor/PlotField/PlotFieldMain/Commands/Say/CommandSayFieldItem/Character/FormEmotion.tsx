import { useEffect, useMemo, useRef, useState } from "react";
import useOutOfModal from "../../../../../../../../hooks/UI/useOutOfModal";
import { EmotionsTypes } from "../../../../../../../../types/StoryData/Character/CharacterTypes";
import { CommandSayVariationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useUpdateNameOrEmotion from "../../../hooks/Say/useUpdateNameOrEmotion";
import CommandSayCreateEmotionFieldModal from "./ModalCreateEmotion/CommandSayCreateEmotionFieldModal";
import "../../../../../../Flowchart/FlowchartStyles.css";

type FormEmotionTypes = {
  plotFieldCommandSayId: string;
  plotFieldCommandId: string;
  setShowCreateEmotionModal: React.Dispatch<React.SetStateAction<boolean>>;
  characterId: string;
  showCreateEmotionModal: boolean;
  setEmotionValue: React.Dispatch<React.SetStateAction<EmotionsTypes | null>>;
  emotionValue: EmotionsTypes | null;
  commandSayType: CommandSayVariationTypes;
  emotions: EmotionsTypes[];
};

export default function FormEmotion({
  plotFieldCommandId,
  plotFieldCommandSayId,
  characterId,
  setShowCreateEmotionModal,
  showCreateEmotionModal,
  emotionValue,
  setEmotionValue,
  emotions,
}: FormEmotionTypes) {
  const [newEmotionId, setNewEmotionId] = useState("");
  const emotionsRef = useRef<HTMLDivElement>(null);
  const [showAllEmotions, setShowAllEmotions] = useState(false);

  const allEmotions = useMemo(() => {
    const res = [...emotions];
    if (emotionValue?.emotionName) {
      const ems = res.filter((r) =>
        r.emotionName
          .toLowerCase()
          .includes(emotionValue?.emotionName.toLowerCase() || "")
      );
      return ems.map((e) => e.emotionName.toLowerCase());
    } else {
      return res.map((r) => r.emotionName.toLowerCase());
    }
  }, [emotions, emotionValue?.emotionName]);

  const updateNameOrEmotion = useUpdateNameOrEmotion({
    characterEmotionId: newEmotionId,
    plotFieldCommandId,
    plotFieldCommandSayId,
  });

  useEffect(() => {
    if (newEmotionId?.trim().length) {
      updateNameOrEmotion.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEmotionId]);

  const handleEmotionFormSubmit = (e: React.FormEvent, em?: string) => {
    e.preventDefault();
    if (!emotionValue?.emotionName?.trim().length && !em?.trim().length) {
      console.log("Заполните поле");
      return;
    }
    if (
      allEmotions.includes(emotionValue?.emotionName.toLowerCase() || "") ||
      (em && allEmotions.includes(em.toLowerCase()))
    ) {
      const currentEmotion = emotions.find(
        (e) =>
          e.emotionName.toLowerCase() ===
            emotionValue?.emotionName.toLowerCase() ||
          (em && e.emotionName.toLowerCase() === em.toLowerCase())
      );

      setNewEmotionId(currentEmotion?._id || "");
      setEmotionValue({
        emotionName: currentEmotion?.emotionName || "",
        _id: currentEmotion?._id || "",
        imgUrl: currentEmotion?.imgUrl || "",
      });
    } else {
      setShowCreateEmotionModal(true);
      return;
    }
  };

  useOutOfModal({
    modalRef: emotionsRef,
    setShowModal: setShowAllEmotions,
    showModal: showAllEmotions,
  });

  return (
    <>
      <form
        onSubmit={handleEmotionFormSubmit}
        className="sm:w-[20%] flex-grow w-full"
      >
        <div className="w-full relative">
          <input
            type="text"
            value={emotionValue?.emotionName || ""}
            placeholder="Эмоция"
            onClick={(e) => {
              e.stopPropagation();
              setShowAllEmotions((prev) => !prev);
            }}
            className="text-[1.3rem] w-full outline-gray-300 px-[1rem] py-[.5rem] rounded-md shadow-md"
            onChange={(e) => {
              setEmotionValue({
                emotionName: e.target.value,
                _id: "",
                imgUrl: "",
              });
              setShowAllEmotions(true);
            }}
          />

          <aside
            ref={emotionsRef}
            className={`absolute ${
              showAllEmotions ? "" : "hidden"
            } bg-white rounded-md shadow-md translate-y-[.5rem] w-full max-h-[15rem] overflow-y-auto | containerScroll `}
          >
            <ul className="flex flex-col gap-[1rem]">
              {allEmotions.length ? (
                allEmotions.map((em, i) => {
                  return (
                    <li key={em + "-" + i} className="flex justify-between">
                      <button
                        onClick={(event) => {
                          setEmotionValue({
                            emotionName: em,
                            _id: "",
                            imgUrl: "",
                          });
                          handleEmotionFormSubmit(event, em);
                          setShowAllEmotions(false);
                        }}
                        className="text-start outline-gray-300 w-full text-[1.4rem] hover:text-white hover:bg-green-300 text-black bg-white rounded-md px-[1rem] py-[.5rem]"
                      >
                        {em}
                      </button>
                      {emotionValue?.imgUrl ? (
                        <img
                          src={emotionValue?.imgUrl || ""}
                          alt={"EmotionImg"}
                          className="w-[3rem] rounded-md object-cover"
                        />
                      ) : null}
                    </li>
                  );
                })
              ) : !emotionValue?.emotionName?.trim().length ? (
                <li>
                  <button className="text-start outline-gray-300 w-full text-[1.4rem] hover:text-white hover:bg-green-300 text-black bg-white rounded-md px-[1rem] py-[.5rem]">
                    Пусто
                  </button>
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
      </form>
      <CommandSayCreateEmotionFieldModal
        characterId={characterId}
        emotionName={emotionValue}
        setShowModal={setShowCreateEmotionModal}
        showModal={showCreateEmotionModal}
        plotFieldCommandId={plotFieldCommandId}
        plotFieldCommandSayId={plotFieldCommandSayId}
      />
    </>
  );
}
