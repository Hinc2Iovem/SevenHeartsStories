import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AllPossiblePlotFieldCommands,
  AllPossibleSayPlotFieldCommands,
} from "../../../../../../const/PLOTFIELD_COMMANDS";
import useGetAllCharacterNames from "../../../../../../hooks/Fetching/Translation/Characters/useGetAllCharacterNames";
import useGetTranslationCharactersQueries from "../../../../../../hooks/Fetching/Translation/Characters/useGetTranslationCharactersQueries";
import { axiosCustomized } from "../../../../../../api/axios";
import { CommandSayVariationTypes } from "../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useCreateSayCommand from "../hooks/Say/useCreateSayCommand";
import useCreateSayCharacterCommand from "../hooks/Say/useCreateSayCharacterCommand";
// queryKey: ["plotfield", "topologyBlock", topologyBlockId]

type PlotFieldBlankTypes = {
  plotFieldIdCommandId: string;
  topologyBlockId: string;
};

export default function PlotfieldBlank({
  plotFieldIdCommandId,
  topologyBlockId,
}: PlotFieldBlankTypes) {
  const { storyId } = useParams();

  const translatedCharacters = useGetTranslationCharactersQueries({
    storyId: storyId ?? "",
  });
  const allNames = useGetAllCharacterNames({ translatedCharacters });
  const [characterId, setCharacterId] = useState("");
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const updateCommandName = useMutation({
    mutationFn: async ({ valueForSay }: { valueForSay: boolean }) =>
      await axiosCustomized.patch(
        `/plotField/${plotFieldIdCommandId}/topologyBlocks/commandName`,
        {
          commandName: valueForSay ? "say" : value,
        }
      ),
  });

  const createSayCharacterCommand = useCreateSayCharacterCommand({
    characterId,
    plotFieldIdCommandId,
    topologyBlockId,
  });

  const createSayCommand = useCreateSayCommand({
    plotFieldIdCommandId,
    topologyBlockId,
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
      updateCommandName.mutate({ valueForSay: true });
      if (type) {
        if (type === "character") {
          createSayCharacterCommand.mutate({ type });
        } else {
          createSayCommand.mutate({ type });
        }
      }
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
      if (value !== "hint" && value !== "author" && value !== "notify") {
        type = "character";
        index = allNames.findIndex((v) => v === value.toLowerCase());
        handleSetCharacterId(index);
      } else {
        type = value;
      }

      submittedByCharacter = true;
      handleSubmit({ submittedByCharacter, type });
    } else if (AllPossiblePlotFieldCommands.includes(value.toLowerCase())) {
      submittedByCharacter = false;
      handleSubmit({ submittedByCharacter });
    } else {
      console.log("Такой команды или персонажа с таким именем не существует");
      // Дать возможность создать перса тут
      return;
    }
  };

  return (
    <div className="shadow-sm shadow-gray-300 bg-white rounded-md px-[1rem] py-[.5rem] relative">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={value}
          placeholder="author"
          onChange={(e) => setValue(e.target.value)}
          className="outline-none text-[1.5rem] text-gray-600 w-full"
        />
      </form>
    </div>
  );
}
