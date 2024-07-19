import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import useGetAllSoundByStoryIdAndIsGlobal from "../hooks/Sound/useGetAllSoundsByStoryIdAndIsGlobal";
import useGetCommandSound from "../hooks/Sound/useGetCommandSound";
import useGetSoundById from "../hooks/Sound/useGetSoundById";
import useUpdateSoundText from "../hooks/Sound/useUpdateSoundText";
import "../Prompts/promptStyles.css";

type CommandSoundFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandSoundField({
  plotFieldCommandId,
  command,
}: CommandSoundFieldTypes) {
  const { storyId } = useParams();
  const [showSoundDropDown, setShowSoundDropDown] = useState(false);
  const [createNewSoundForm, setCreateNewSoundForm] = useState(false);
  const [newSoundName, setNewSoundName] = useState("");
  const [nameValue] = useState<string>(command ?? "Sound");
  const [soundName, setSoundName] = useState<string>("");
  const [currentSoundName, setCurrentSoundName] = useState("");
  const { data: allSound } = useGetAllSoundByStoryIdAndIsGlobal({
    storyId: storyId ?? "",
  });

  const allSoundMemoized = useMemo(() => {
    const allSoundNames = allSound?.map((a) => a.soundName) ?? [];
    return allSoundNames;
  }, [allSound]);

  const { data: commandSound } = useGetCommandSound({
    plotFieldCommandId,
  });
  const [commandSoundId, setCommandSoundId] = useState("");
  const { data: sound } = useGetSoundById({
    soundId: commandSound?.soundId ?? "",
  });

  useEffect(() => {
    if (soundName?.trim().length) {
      setCurrentSoundName(soundName);
    } else if (newSoundName?.trim().length) {
      setCurrentSoundName(newSoundName);
    }
  }, [soundName, newSoundName]);

  useEffect(() => {
    if (commandSound) {
      setCommandSoundId(commandSound._id);
    }
  }, [commandSound]);

  useEffect(() => {
    if (sound) {
      setSoundName(sound.soundName);
    }
  }, [sound]);

  const updateSoundText = useUpdateSoundText({
    storyId: storyId ?? "",
    commandSoundId,
  });

  useEffect(() => {
    if (soundName?.trim().length) {
      updateSoundText.mutate({ soundName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundName]);

  useEscapeOfModal({
    setValue: setShowSoundDropDown,
    value: showSoundDropDown,
  });

  const handleNewSoundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSoundName?.trim().length) {
      console.log("Заполните поле");
      return;
    }
    setSoundName("");
    updateSoundText.mutate({ soundName: newSoundName });
    setCreateNewSoundForm(false);
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
          createNewSoundForm ? "hidden" : ""
        } sm:w-[77%] flex-grow w-full md:flex-row flex-col flex-wrap flex justify-between items-center gap-[1rem] p-[.5rem] relative`}
      >
        <button
          onClick={() => setShowSoundDropDown((prev) => !prev)}
          className="text-[1.3rem] outline-gray-400 bg-white rounded-md px-[1rem] py-[.5rem] self-start sm:w-[77%] flex-grow w-full text-start"
        >
          {currentSoundName?.trim().length ? (
            currentSoundName
          ) : (
            <span className="text-gray-600 text-[1.3rem]">Пусто</span>
          )}
        </button>
        <div className="flex gap-[1rem] flex-wrap self-start">
          <button
            onClick={() => {
              setNewSoundName("");
              setCreateNewSoundForm(true);
            }}
            className="text-[1.3rem] outline-gray-400 bg-green-400 text-white hover:opacity-85 rounded-md px-[1rem] py-[.5rem]"
          >
            Добавить Звук
          </button>
        </div>
        <ul
          className={`${
            showSoundDropDown ? "" : "hidden"
          }  bottom-[-.5rem] right-[-.5rem] bg-neutral-alabaster rounded-md z-[10] flex-grow w-[20rem] flex flex-col gap-[.2rem] max-h-[15rem] overflow-y-auto overflow-x-hidden p-[.5rem] absolute | scrollBar`}
        >
          {allSoundMemoized.map((mm) => (
            <li key={mm}>
              <button
                onClick={() => {
                  setShowSoundDropDown(false);
                  setSoundName(mm);
                }}
                className={`${
                  soundName === mm
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
        onSubmit={handleNewSoundSubmit}
        className={`${
          createNewSoundForm ? "" : "hidden"
        } sm:w-[77%] flex-grow w-full flex flex-col gap-[1rem]`}
      >
        <button
          type="button"
          onClick={() => setCreateNewSoundForm(false)}
          className="w-fit self-end bg-white text-red-500 text-[1.3rem] rounded-md px-[1rem]"
        >
          X
        </button>
        <div className="flex gap-[1rem]">
          <input
            value={newSoundName}
            type="text"
            className="w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md"
            placeholder="Майкл Джордэн"
            onChange={(e) => setNewSoundName(e.target.value)}
          />
          <button className="text-[1.3rem] bg-green-400 text-white rounded-md px-[1rem] hover:scale-[1.01] hover:opacity-85 active:scale-[0.99]">
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}
