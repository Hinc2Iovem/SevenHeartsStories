import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetTranslationEpisode from "../../hooks/Fetching/Translation/useGetTranslationEpisode";
import useEscapeOfModal from "../../hooks/UI/useEscapeOfModal";
import { EpisodeTypes } from "../../types/StoryData/Episode/EpisodeTypes";
import { DraggableProvided } from "@hello-pangea/dnd";

type EpisodeItemTypes = {
  provided: DraggableProvided;
} & EpisodeTypes;

export default function EpisodeItem({
  _id,
  episodeOrder,
  episodeStatus,
  provided,
}: EpisodeItemTypes) {
  const [isEpisodeInfoOpen, setIsEpisodeInfoOpen] = useState(false);
  const { data } = useGetTranslationEpisode({ episodeId: _id });
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");

  useEscapeOfModal({
    setValue: setIsEpisodeInfoOpen,
    value: isEpisodeInfoOpen,
  });

  useEffect(() => {
    if (data) {
      data.map((d) => {
        if (d.textFieldName === "episodeDescription") {
          setEpisodeDescription(d.text);
        } else if (d.textFieldName === "episodeName") {
          setEpisodeTitle(d.text);
        }
      });
    }
  }, [data]);

  return (
    <li
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="w-full bg-white gap-[1rem] flex flex-col"
    >
      <div
        onClick={() => setIsEpisodeInfoOpen((prev) => !prev)}
        className={` ${
          isEpisodeInfoOpen ? "" : " hover:scale-[1.01]"
        } outline-gray-400 text-start bg-white w-full rounded-md shadow-sm shadow-gray-300 p-[1rem]`}
      >
        <h3 className="text-[1.5rem] text-gray-700">
          {episodeTitle.trim().length ? episodeTitle : `Эпизод ${episodeOrder}`}
        </h3>
      </div>
      <div
        className={`${
          isEpisodeInfoOpen ? "" : "hidden"
        } flex flex-col p-[1rem] min-h-[10rem] w-full bg-white rounded-md shadow-md shadow-gray-300`}
      >
        <p className="text-[1.5rem] self-end">
          Статус:{" "}
          <span
            className={`text-[1.4rem] ${
              episodeStatus === "doing" ? "text-orange-400" : "text-green-400"
            }`}
          >
            {episodeStatus === "doing" ? "В процессе" : "Завершена"}
          </span>
        </p>
        <p className="text-[1.3rem] text-gray-600 h-full w-full break-words">
          {episodeDescription}
        </p>
        <Link
          className="mt-auto w-fit self-end text-[1.5rem] text-gray-700 hover:text-primary-pastel-blue transition-all"
          to={`/editor/episodes/${_id}`}
        >
          На страницу Эпизода
        </Link>
      </div>
    </li>
  );
}
