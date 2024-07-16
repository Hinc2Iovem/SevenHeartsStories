import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AllPossiblePlotFieldCommands,
  AllPossibleSayPlotFieldCommands,
} from "../../../../../../const/PLOTFIELD_COMMANDS";
import useGetAllCharacterNames from "../../../../../../hooks/Fetching/Translation/Characters/useGetAllCharacterNames";
import useGetTranslationCharactersQueries from "../../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharactersQueries";
import { CommandSayVariationTypes } from "../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useCreateSayCharacterCommand from "../hooks/Say/useCreateSayCharacterCommand";
import useCreateSayCommand from "../hooks/Say/useCreateSayCommand";
import useUpdateCommandName from "../hooks/useUpdateCommandName";
import PlotFieldBlankCreateCharacter from "./PlotFieldBlankCreateCharacter";

type PlotFieldBlankTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export default function PlotfieldBlank({
  plotFieldCommandId,
  topologyBlockId,
}: PlotFieldBlankTypes) {
  const { storyId } = useParams();
  const [showCreateCharacterModal, setShowCreateCharacterModal] =
    useState(false);

  const translatedCharacters = useGetTranslationCharactersQueries({
    storyId: storyId ?? "",
  });

  const allNames = useGetAllCharacterNames({ translatedCharacters });
  const [characterId, setCharacterId] = useState("");
  const [value, setValue] = useState("");

  const currentInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!showCreateCharacterModal) {
      currentInput.current?.focus();
    }
  }, [showCreateCharacterModal]);

  const updateCommandName = useUpdateCommandName({
    plotFieldCommandId,
    value,
    topologyBlockId,
  });

  const createSayCharacterCommand = useCreateSayCharacterCommand({
    characterId,
    plotFieldCommandId,
  });

  const createSayCommand = useCreateSayCommand({
    plotFieldCommandId,
  });

  const handleSetCharacterId = (index: number) => {
    const allIds: string[] = [];
    for (const t of translatedCharacters) {
      t.data?.map((tp) => {
        if (tp.textFieldName === "characterName") {
          allIds.push(tp.characterId);
        }
      });
    }
    if (allIds) {
      setCharacterId(allIds[index]);
      return;
    }
  };

  const handleSubmit = ({
    submittedByCharacter,
    type,
  }: {
    submittedByCharacter: boolean;
    type?: CommandSayVariationTypes;
  }) => {
    if (submittedByCharacter) {
      if (type) {
        if (type === "character") {
          createSayCharacterCommand.mutate({ type });
        } else {
          createSayCommand.mutate({ type });
        }
      }
      updateCommandName.mutate({ valueForSay: true });
    } else if (!submittedByCharacter) {
      updateCommandName.mutate({ valueForSay: false });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim().length) {
      console.log("Заполните поле");
      return;
    }
    let submittedByCharacter = false;
    if (
      allNames.includes(value.toLowerCase()) ||
      AllPossibleSayPlotFieldCommands.includes(value.toLowerCase())
    ) {
      let type: CommandSayVariationTypes = "" as CommandSayVariationTypes;
      let index = -1;
      if (
        value.toLowerCase() !== "hint" &&
        value.toLowerCase() !== "author" &&
        value.toLowerCase() !== "notify"
      ) {
        type = "character";
        index = allNames.findIndex((v) => v === value.toLowerCase());
        handleSetCharacterId(index);
      } else {
        type = value as CommandSayVariationTypes;
      }

      submittedByCharacter = true;
      handleSubmit({ submittedByCharacter, type });
    } else if (AllPossiblePlotFieldCommands.includes(value.toLowerCase())) {
      submittedByCharacter = false;
      handleSubmit({ submittedByCharacter });
    } else {
      setShowCreateCharacterModal(true);
      return;
    }
  };

  return (
    <div className="shadow-sm shadow-gray-300 bg-white rounded-md relative">
      <form className="px-[1rem] py-[.5rem]" onSubmit={handleFormSubmit}>
        <input
          ref={currentInput}
          type="text"
          value={value}
          placeholder="author"
          onChange={(e) => setValue(e.target.value)}
          className="outline-none text-[1.5rem] text-gray-600 w-full"
        />
      </form>
      <PlotFieldBlankCreateCharacter
        setShowModal={setShowCreateCharacterModal}
        characterName={value}
        plotFieldCommandId={plotFieldCommandId}
        topologyBlockId={topologyBlockId}
        showModal={showCreateCharacterModal}
      />
    </div>
  );
}
