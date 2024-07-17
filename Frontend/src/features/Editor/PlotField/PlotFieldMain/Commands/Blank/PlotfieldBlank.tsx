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
import { AllPossiblePlotFieldComamndsTypes } from "../../../../../../types/StoryEditor/PlotField/PlotFieldTypes";
import useCreateAchievement from "../hooks/Achievement/useCreateAchievement";
import useCreateAmbient from "../hooks/Ambient/useCreateAmbient";
import useCreateBackground from "../hooks/Background/useCreateBackground";
import useCreateCall from "../hooks/Call/useCreateCall";
import useCreateChoice from "../hooks/Choice/useCreateChoice";
import useCreateCommandIf from "../hooks/If/useCreateCommandIf";
import useCreateCondition from "../hooks/Condition/useCreateCondition";
import useCreateCutScene from "../hooks/CutScene/useCreateCutScene";
import useCreateEffect from "../hooks/Effect/useCreateEffect";
import useCreateGetItem from "../hooks/GetItem/useCreateGetItem";
import useCreateKey from "../hooks/Key/useCreateKey";
import useCreateMove from "../hooks/Move/useCreateMove";
import useCreateMusic from "../hooks/Music/useCreateMusic";
import useCreateName from "../hooks/Name/useCreateName";
import useCreateSound from "../hooks/Sound/useCreateSound";
import useCreateSuit from "../hooks/Suit/useCreateSuit";
import useCreateWait from "../hooks/Wait/useCreateWait";
import useCreateWardrobe from "../hooks/Wardrobe/useCreateWardrobe";

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

  const createCommandAchievement = useCreateAchievement({
    plotFieldCommandId,
    storyId: storyId ?? "",
  });
  const createCommandAmbient = useCreateAmbient({ plotFieldCommandId });
  const createBackground = useCreateBackground({ plotFieldCommandId });
  const createCall = useCreateCall({ plotFieldCommandId });
  const createChoice = useCreateChoice({ plotFieldCommandId });
  const createCommandIf = useCreateCommandIf({ plotFieldCommandId });
  const createCondition = useCreateCondition({ plotFieldCommandId });
  const createCutScene = useCreateCutScene({ plotFieldCommandId });
  const createEffect = useCreateEffect({ plotFieldCommandId });
  const createGetItem = useCreateGetItem({ plotFieldCommandId });
  const createKey = useCreateKey({ plotFieldCommandId });
  const createMove = useCreateMove({ plotFieldCommandId });
  const createMusic = useCreateMusic({
    plotFieldCommandId,
    storyId: storyId ?? "",
  });
  const createName = useCreateName({ plotFieldCommandId });
  const createSound = useCreateSound({
    plotFieldCommandId,
    storyId: storyId ?? "",
  });
  const createSuit = useCreateSuit({ plotFieldCommandId });
  const createWait = useCreateWait({ plotFieldCommandId });
  const createWardrobe = useCreateWardrobe({ plotFieldCommandId });

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
      const allCommands: AllPossiblePlotFieldComamndsTypes =
        value.toLowerCase() as AllPossiblePlotFieldComamndsTypes;
      if (allCommands === "achievement") {
        createCommandAchievement.mutate();
      } else if (allCommands === "ambient") {
        createCommandAmbient.mutate();
      } else if (allCommands === "background") {
        createBackground.mutate();
      } else if (allCommands === "call") {
        createCall.mutate();
      } else if (allCommands === "choice") {
        createChoice.mutate();
      } else if (allCommands === "condition") {
        createCondition.mutate();
      } else if (allCommands === "cutscene") {
        createCutScene.mutate();
      } else if (allCommands === "effect") {
        createEffect.mutate();
      } else if (allCommands === "getitem") {
        createGetItem.mutate();
      } else if (allCommands === "if") {
        createCommandIf.mutate();
      } else if (allCommands === "key") {
        createKey.mutate();
      } else if (allCommands === "move") {
        createMove.mutate();
      } else if (allCommands === "music") {
        createMusic.mutate();
      } else if (allCommands === "name") {
        createName.mutate();
      } else if (allCommands === "sound") {
        createSound.mutate();
      } else if (allCommands === "suit") {
        createSuit.mutate();
      } else if (allCommands === "wait") {
        createWait.mutate();
      } else if (allCommands === "wardrobe") {
        createWardrobe.mutate();
      }
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
