import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useUpdateBackgroundMusicText from "../hooks/Background/useUpdateBackgroundMusicText";
import useGetAllMusicByStoryId from "../hooks/Music/useGetAllMusicByStoryId";
import useGetMusicById from "../hooks/Music/useGetMusicById";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";

type BackgroundMusicFormTypes = {
  backgroundId: string;
  musicId: string;
};

export default function BackgroundMusicForm({
  backgroundId,
  musicId,
}: BackgroundMusicFormTypes) {
  const { storyId } = useParams();
  const [showMusicDropDown, setShowMusicDropDown] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [createNewMusicForm, setCreateNewMusicForm] = useState(false);
  const [newMusicName, setNewMusicName] = useState("");
  const [currentMusicName, setCurrentMusicName] = useState<string>("");
  const { data: allMusic } = useGetAllMusicByStoryId({
    storyId: storyId ?? "",
  });
  const allMusicMemoized = useMemo(() => {
    const allMusicNames = allMusic?.map((a) => a.musicName) ?? [];
    return allMusicNames;
  }, [allMusic]);

  const { data: music } = useGetMusicById({
    musicId: musicId ?? "",
  });

  useEffect(() => {
    if (musicName?.trim().length) {
      setCurrentMusicName(musicName);
    } else if (newMusicName?.trim().length) {
      setCurrentMusicName(newMusicName);
    }
  }, [musicName, newMusicName]);

  useEffect(() => {
    if (music) {
      setMusicName(music.musicName);
    }
  }, [music]);

  const updateMusicText = useUpdateBackgroundMusicText({
    storyId: storyId ?? "",
    backgroundId,
  });

  useEffect(() => {
    if (musicName?.trim().length) {
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
    setMusicName("");
    updateMusicText.mutate({ musicName: newMusicName });
    setCreateNewMusicForm(false);
  };

  return (
    <>
      <div
        className={`${
          createNewMusicForm ? "hidden" : ""
        } sm:w-[77%] flex-grow w-full flex-wrap sm:flex-row flex-col flex items-center gap-[1rem] relative`}
      >
        <button
          onClick={() => setShowMusicDropDown((prev) => !prev)}
          className="text-[1.3rem] flex-grow outline-gray-400 bg-white rounded-md px-[1rem] py-[.5rem] sm:w-auto w-full sm:text-start text-center"
        >
          {currentMusicName?.trim().length ? (
            currentMusicName
          ) : (
            <span className="text-gray-600 text-[1.3rem]">Название Музыки</span>
          )}
        </button>
        <button
          onClick={() => {
            setNewMusicName("");
            setCreateNewMusicForm(true);
          }}
          className="text-[1.3rem] flex-shrink-0 block outline-gray-400 bg-green-400 text-white hover:opacity-85 rounded-md px-[1rem] py-[.5rem] self-end sm:w-auto w-full sm:text-start text-center"
        >
          Добавить Музыку
        </button>
        <ul
          className={`${
            showMusicDropDown ? "" : "hidden"
          } translate-y-[70%] left-[-.5rem] bg-neutral-alabaster rounded-md z-[10] flex-grow w-full flex flex-col gap-[.2rem] max-h-[15rem] overflow-y-auto overflow-x-hidden p-[.5rem] absolute | scrollBar`}
        >
          {allMusicMemoized.map((mm, i) => (
            <li key={mm + i}>
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
    </>
  );
}
