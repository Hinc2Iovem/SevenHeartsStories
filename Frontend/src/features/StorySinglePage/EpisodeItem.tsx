import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetTranslationEpisode from "../../hooks/Fetching/Translation/useGetTranslationEpisode";
import useEscapeOfModal from "../../hooks/UI/useEscapeOfModal";
import { EpisodeTypes } from "../../types/StoryData/Episode/EpisodeTypes";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useQueryClient } from "@tanstack/react-query";
import { getAllTopologyBlocksByEpisodeId } from "../Editor/PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlocksByEpisodeId";
import { getAllTopologyBlocksConnectionsByEpisodeId } from "../Editor/PlotField/PlotFieldMain/Commands/hooks/TopologyBlock/useGetAllTopologyBlockConnectionsByEpisodeId";
import { getAllPlotfieldCommands } from "../Editor/PlotField/PlotFieldMain/Commands/hooks/useGetAllPlotFieldCommands";

type EpisodeItemTypes = {
  provided: DraggableProvided;
} & EpisodeTypes;

export default function EpisodeItem({
  _id,
  episodeOrder,
  episodeStatus,
  provided,
}: EpisodeItemTypes) {
  const [localTopologyBlockId] = useState(
    localStorage.getItem(`${_id}-topologyBlockId`)
  );
  const { storyId } = useParams();
  const [isEpisodeInfoOpen, setIsEpisodeInfoOpen] = useState(false);
  const { data: episode } = useGetTranslationEpisode({
    episodeId: _id,
    language: "russian",
  });

  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");

  useEffect(() => {
    if (episode) {
      episode.translations.map((d) => {
        if (d.textFieldName === "episodeDescription") {
          setEpisodeDescription(d.text);
        } else if (d.textFieldName === "episodeName") {
          setEpisodeTitle(d.text);
        }
      });
    }
  }, [episode]);

  useEscapeOfModal({
    setValue: setIsEpisodeInfoOpen,
    value: isEpisodeInfoOpen,
  });

  const queryClient = useQueryClient();
  const prefetchTopologyBlocks = () => {
    queryClient.prefetchQuery({
      queryKey: ["episode", _id, "topologyBlock"],
      queryFn: () => getAllTopologyBlocksByEpisodeId({ episodeId: _id }),
    });
    queryClient.prefetchQuery({
      queryKey: ["connection", "episode", _id],
      queryFn: () =>
        getAllTopologyBlocksConnectionsByEpisodeId({ episodeId: _id }),
    });
    if (localTopologyBlockId) {
      queryClient.prefetchQuery({
        queryKey: ["plotfield", "topologyBlock", localTopologyBlockId],
        queryFn: () =>
          getAllPlotfieldCommands({ topologyBlockId: localTopologyBlockId }),
      });
    }
  };

  return (
    <li
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="w-full bg-white flex flex-col"
    >
      <div
        onClick={() => {
          prefetchTopologyBlocks();
          setIsEpisodeInfoOpen((prev) => !prev);
        }}
        className={` ${
          isEpisodeInfoOpen
            ? "shadow-none border-[.1rem] border-b-0 rounded-b-none"
            : " hover:scale-[1.01]"
        } outline-gray-400 text-start bg-white w-full rounded-md shadow-sm shadow-gray-300 p-[1rem]`}
      >
        <h3 className="text-[1.5rem] text-gray-700">
          {episodeTitle.trim().length ? episodeTitle : `Эпизод ${episodeOrder}`}
        </h3>
      </div>
      <div
        className={`${
          isEpisodeInfoOpen ? "border-[.1rem]  rounded-t-none" : "hidden"
        } flex flex-col p-[1rem] min-h-[10rem] w-full bg-white rounded-md shadow-gray-300`}
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
          to={`/stories/${storyId}/editor/episodes/${_id}`}
        >
          На страницу Эпизода
        </Link>
      </div>
    </li>
  );
}
