import { useEffect, useRef, useState } from "react";
import add from "../../assets/images/shared/add.png";
import arrowDown from "../../assets/images/shared/arrowDown.png";
import arrowUp from "../../assets/images/shared/arrowUp.png";
import useGetEpisodesBySeasonId from "../../hooks/Fetching/Episode/useGetEpisodesBySeasonId";
import useGetTranslationSeason from "../../hooks/Fetching/Translation/useGetTranslationSeason";
import useUpdateEpisodeOrder from "../../hooks/Patching/Episode/useUpdateEpisodeOrder";
import useCreateNewEpisode from "../../hooks/Posting/Episode/useCreateNewEpisode";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import { SeasonTypes } from "../../types/StoryData/Season/SeasonTypes";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import EpisodeItem from "./EpisodeItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";

type DisplaySeasonsTypes = {
  index: number;
} & SeasonTypes;

export default function DisplaySeasons({ _id, index }: DisplaySeasonsTypes) {
  const [shrinkEpisodes, setShrinkEpisodes] = useState(false);
  const { data } = useGetTranslationSeason({
    seasonId: _id,
    language: "russian",
  });
  const { data: episodeIds } = useGetEpisodesBySeasonId({ seasonId: _id });
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [episodes, setEpisodes] = useState(episodeIds || []);

  useEffect(() => {
    if (episodeIds) {
      setEpisodes(episodeIds);
    }
  }, [episodeIds]);
  const createNewEpisode = useCreateNewEpisode({
    description,
    seasonId: _id,
    title,
  });
  const updateEpisodeOrder = useUpdateEpisodeOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim().length || !description.trim().length) {
      console.log("title and description are required");
      return;
    }

    createNewEpisode.mutate();
    setShowModal(false);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result?.destination) return;
    console.log(result);

    const orderedEpisodes = [...(episodes ?? [])];
    const [reorderedItem] = orderedEpisodes.splice(result.source.index, 1);
    orderedEpisodes.splice(result.destination.index, 0, reorderedItem);
    updateEpisodeOrder.mutate({
      newOrder: result.destination.index,
      episodeId: result.draggableId,
    });
    setEpisodes(orderedEpisodes);
  };

  useOutOfModal({ setShowModal, showModal, modalRef });

  return (
    <>
      <div className="flex w-full justify-between items-center relative">
        <div className="bg-white p-[1rem] px-[2rem] rounded-md shadow-md relative">
          <h2 className="text-[2.5rem] text-gray-700">
            {data?.text ?? `Сезон ${index}`}
          </h2>
          <button
            onClick={() => setShrinkEpisodes((prev) => !prev)}
            className={`${
              shrinkEpisodes ? "hidden" : ""
            } absolute top-[4rem] right-[-3rem]`}
          >
            <img src={arrowUp} alt="See more" className="w-[3rem]" />
          </button>
          <button
            onClick={() => setShrinkEpisodes((prev) => !prev)}
            className={`${
              shrinkEpisodes ? "" : "hidden"
            } absolute top-[4rem] right-[-3rem]`}
          >
            <img src={arrowDown} alt="See less" className="w-[3rem]" />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="episodes">
          {(provided: DroppableProvided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`flex flex-col gap-[1rem] ${
                shrinkEpisodes ? "h-[5rem] overflow-hidden" : ""
              }`}
            >
              {episodes?.length ? (
                episodes?.map((ei, i) => {
                  return (
                    <Draggable key={ei._id} draggableId={ei._id} index={i}>
                      {(provided) => (
                        <EpisodeItem provided={provided} {...ei} />
                      )}
                    </Draggable>
                  );
                })
              ) : (
                <li className="text-[1.5rem] text-gray-700 bg-white w-full rounded-md shadow-sm shadow-gray-300 p-[1rem] hover:scale-[1.01]">
                  В этом сезоне покамись нету эпизодов
                </li>
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div className={`${showModal ? "" : "hidden"} w-[25rem]`} ref={modalRef}>
        <form
          onSubmit={handleSubmit}
          className={`w-full bg-white rounded-md shadow-sm flex flex-col gap-[1rem] p-[1rem]`}
        >
          <input
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[2rem] text-gray-700 border-double border-l-neutral-light-gray border-[3px] rounded-md px-[1rem] py-[.5rem] rounde-md outline-none"
            placeholder="Название Эпизода"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-[1.5rem] text-gray-700 border-double border-l-neutral-light-gray border-[3px] rounded-md px-[1rem] py-[.5rem] rounde-md outline-none max-h-[30rem]"
            placeholder="Описание Эпизода"
          />
          <button className="w-fit self-end text-[1.5rem] shadow-md rounded-md px-[1rem] py-[.5rem] hover:scale-[1.01] active:scale-[0.98]">
            Создать
          </button>
        </form>
      </div>

      <ButtonHoverPromptModal
        onClick={(e) => {
          e.stopPropagation();
          setTitle("");
          setDescription("");
          setShowModal(true);
        }}
        asideClasses="text-[1.5rem] top-[3.9rem] bottom-[-3.9rem]"
        contentName="Создать Эпизод"
        positionByAbscissa="left"
        className="w-fit bg-white rounded-md shadow-sm shadow-gray-500 p-[.2rem]"
        variant={"rectangle"}
      >
        <img src={add} alt="NewEpisode" className="w-[3rem]" />
      </ButtonHoverPromptModal>
    </>
  );
}
