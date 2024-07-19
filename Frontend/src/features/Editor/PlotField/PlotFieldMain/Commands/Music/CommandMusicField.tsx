import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllMusicByStoryId from "../hooks/Music/useGetAllMusicByStoryId";
import useGetCommandMusic from "../hooks/Music/useGetCommandMusic";
import useGetMusicById from "../hooks/Music/useGetMusicById";
import useUpdateMusicText from "../hooks/Music/useUpdateMusicText";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import "../Prompts/promptStyles.css";

type CommandMusicFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandMusicField({
  plotFieldCommandId,
  command,
}: CommandMusicFieldTypes) {
  const { storyId } = useParams();
  const [showMusicDropDown, setShowMusicDropDown] = useState(false);
  const [createNewMusicForm, setCreateNewMusicForm] = useState(false);
  const [newMusicName, setNewMusicName] = useState("");
  const [nameValue] = useState<string>(command ?? "Music");
  const [musicName, setMusicName] = useState<string>("");
  const { data: allMusic } = useGetAllMusicByStoryId({
    storyId: storyId ?? "",
  });
  const allMusicMemoized = useMemo(() => {
    const allMusicNames = allMusic?.map((a) => a.musicName) ?? [];
    return allMusicNames;
  }, [allMusic]);

  const { data: commandMusic } = useGetCommandMusic({
    plotFieldCommandId,
  });
  const [commandMusicId, setCommandMusicId] = useState("");
  const { data: music } = useGetMusicById({
    musicId: commandMusic?.musicId ?? "",
  });

  useEffect(() => {
    if (commandMusic) {
      setCommandMusicId(commandMusic._id);
    }
  }, [commandMusic]);

  useEffect(() => {
    if (music) {
      setMusicName(music.musicName);
    }
  }, [music]);

  const updateMusicText = useUpdateMusicText({
    storyId: storyId ?? "",
    commandMusicId,
  });

  useEffect(() => {
    if (musicName.trim().length) {
      updateMusicText.mutate({ musicName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicName]);

  useEscapeOfModal({
    setValue: setShowMusicDropDown,
    value: showMusicDropDown,
  });

  const handleNewMusicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMusicName?.trim().length) {
      console.log("Заполните поле");
      return;
    }
    updateMusicText.mutate({ musicName: newMusicName });
    setMusicName(newMusicName);
    setCreateNewMusicForm(false);
  };
  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col items-center">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>
      <div
        className={`${
          createNewMusicForm ? "hidden" : ""
        } sm:w-[77%] flex-grow w-full md:flex-row flex-col flex-wrap flex justify-between items-center gap-[1rem] p-[.5rem] relative`}
      >
        <button
          onClick={() => setShowMusicDropDown((prev) => !prev)}
          className="text-[1.3rem] outline-gray-400 bg-white rounded-md px-[1rem] py-[.5rem] self-start sm:w-[77%] flex-grow w-full text-start"
        >
          {musicName}
        </button>
        <div className="flex gap-[1rem] flex-wrap self-start">
          <button
            onClick={() => {
              setNewMusicName("");
              setCreateNewMusicForm(true);
            }}
            className="text-[1.3rem] outline-gray-400 bg-green-400 text-white hover:opacity-85 rounded-md px-[1rem] py-[.5rem]"
          >
            Добавить Музыку
          </button>
        </div>
        <ul
          className={`${
            showMusicDropDown ? "" : "hidden"
          }  bottom-[-.5rem] right-[-.5rem] bg-neutral-alabaster rounded-md z-[10] flex-grow w-[20rem] flex flex-col gap-[.2rem] max-h-[15rem] overflow-y-auto overflow-x-hidden p-[.5rem] absolute | scrollBar`}
        >
          {allMusicMemoized.map((mm) => (
            <li key={mm}>
              <button
                onClick={() => {
                  setShowMusicDropDown(false);
                  setMusicName(mm);
                }}
                className={`${
                  musicName === mm
                    ? "bg-orange-200 text-white"
                    : "bg-white outline-gray-300 text-gray-600 "
                } text-start hover:bg-orange-200 hover:text-white transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] w-full text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md`}
              >
                {mm}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleNewMusicSubmit}
        className={`${
          createNewMusicForm ? "" : "hidden"
        } sm:w-[77%] flex-grow w-full flex flex-col gap-[1rem]`}
      >
        <button
          type="button"
          onClick={() => setCreateNewMusicForm(false)}
          className="w-fit self-end bg-white text-red-500 text-[1.3rem] rounded-md px-[1rem]"
        >
          X
        </button>
        <div className="flex gap-[1rem]">
          <input
            value={newMusicName}
            type="text"
            className="w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md"
            placeholder="Майкл Джордэн"
            onChange={(e) => setNewMusicName(e.target.value)}
          />
          <button className="text-[1.3rem] bg-green-400 text-white rounded-md px-[1rem] hover:scale-[1.01] hover:opacity-85 active:scale-[0.99]">
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}
