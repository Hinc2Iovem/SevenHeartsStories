import { useEffect, useState } from "react";
import useGetCommandName from "../hooks/Name/useGetCommandName";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import useUpdateNameText from "../hooks/Name/useUpdateNameText";
import useGetCharacterById from "../../../../../../hooks/Fetching/Character/useGetCharacterById";
import useGetTranslationCharacterEnabled from "../hooks/Character/useGetTranslationCharacterEnabled";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import PlotfieldCharacterPromptMain from "../Prompts/Characters/PlotfieldCharacterPromptMain";

type CommandNameFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandNameField({
  plotFieldCommandId,
  command,
}: CommandNameFieldTypes) {
  const [nameValue] = useState<string>(command ?? "Name");
  const [textValue, setTextValue] = useState("");
  const [currentCharacterId, setCurrentCharacterId] = useState("");
  const [currentCharacterImg, setCurrentCharacterImg] = useState("");
  const [currentCharacterName, setCurrentCharacterName] = useState("");
  const [showCharacterList, setShowCharacterList] = useState(false);

  const { data: commandName } = useGetCommandName({
    plotFieldCommandId,
  });
  const [commandNameId, setCommandNameId] = useState("");

  const { data: character } = useGetCharacterById({
    characterId: commandName?.characterId ?? "",
  });
  const { data: translatedCharacter } = useGetTranslationCharacterEnabled({
    characterId: commandName?.characterId ?? "",
    commandSayType: "character",
  });

  useEffect(() => {
    if (character) {
      setCurrentCharacterImg(character?.img as string);
    }
  }, [character]);

  useEffect(() => {
    if (translatedCharacter) {
      translatedCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCurrentCharacterName(tc.text ?? "");
        }
      });
    }
  }, [translatedCharacter]);

  useEffect(() => {
    if (commandName) {
      setCommandNameId(commandName._id);
      setCurrentCharacterId(commandName?.characterId ?? "");
    }
  }, [commandName]);

  useEffect(() => {
    if (commandName?.name) {
      setTextValue(commandName.name);
    }
  }, [commandName]);

  const debouncedValue = useDebounce({ value: textValue, delay: 500 });

  const updateNameText = useUpdateNameText({
    characterId: currentCharacterId,
    nameId: commandNameId,
    newName: debouncedValue,
  });

  useEffect(() => {
    if (debouncedValue?.trim().length || currentCharacterImg?.trim().length) {
      updateNameText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, currentCharacterImg]);

  useEscapeOfModal({
    setValue: setShowCharacterList,
    value: showCharacterList,
  });
  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col relative">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>
      <button
        onClick={() => setShowCharacterList((prev) => !prev)}
        className={`bg-white rounded-md ${
          currentCharacterImg ? "pl-[1rem]" : "px-[1rem]"
        }  text-gray-600 hover:scale-[1.01] active:scale-[.99] flex items-center gap-[1rem] flex-grow justify-between`}
      >
        <p className="text-[1.4rem]">
          {currentCharacterName || (
            <span className="text-gray-600 text-[1.3rem]">Пусто</span>
          )}
        </p>
        <img
          className={`${
            currentCharacterImg ? "" : "hidden"
          } w-[3rem] rounded-md object-cover self-end block`}
          src={currentCharacterImg}
          alt="CharacterIcon"
        />
      </button>
      <PlotfieldCharacterPromptMain
        characterName={currentCharacterName}
        setCharacterImg={setCurrentCharacterImg}
        setCharacterId={setCurrentCharacterId}
        setCharacterName={setCurrentCharacterName}
        setShowCharacterModal={setShowCharacterList}
        showCharacterModal={showCharacterList}
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="sm:w-[77%] flex-grow w-full"
      >
        <input
          value={textValue}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Such a lovely day"
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
