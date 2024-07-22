import { useEffect, useState } from "react";
import useUpdateChoiceOption from "../../../hooks/Choice/ChoiceOption/useUpdateChoiceOption";
import useGetRelationshipOption from "../../../hooks/Choice/ChoiceOptionVariation/useGetRelationshipOption";
import useEscapeOfModal from "../../../../../../../../hooks/UI/useEscapeOfModal";
import useGetTranslationCharacterEnabled from "../../../hooks/Character/useGetTranslationCharacterEnabled";
import PlotfieldCharacterPromptMain from "../../../Prompts/Characters/PlotfieldCharacterPromptMain";
import useGetCharacterById from "../../../../../../../../hooks/Fetching/Character/useGetCharacterById";

type OptionRelationshipBlockTypes = {
  choiceOptionId: string;
};

export default function OptionRelationshipBlock({
  choiceOptionId,
}: OptionRelationshipBlockTypes) {
  const { data: optionRelationship } = useGetRelationshipOption({
    plotFieldCommandChoiceOptionId: choiceOptionId,
  });
  const [characterId, setCharacterId] = useState("");
  const [characterImg, setCharacterImg] = useState("");
  const [characterName, setCharacterName] = useState("");

  const { data: character } = useGetCharacterById({ characterId });

  useEffect(() => {
    if (character) {
      setCharacterImg(character?.img || "");
    }
  }, [character]);
  const { data: translatedCharacter } = useGetTranslationCharacterEnabled({
    characterId,
    commandSayType: "character",
  });

  useEffect(() => {
    if (translatedCharacter) {
      translatedCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCharacterName(tc.text);
        }
      });
    }
  }, [translatedCharacter]);

  useEffect(() => {
    if (optionRelationship) {
      setCharacterId(optionRelationship.characterId);
    }
  }, [optionRelationship]);

  const [showAllCharacters, setShowAllCharacters] = useState(false);

  const [amountOfPoints, setAmountOfPoints] = useState(
    optionRelationship?.amountOfPoints || ""
  );

  useEffect(() => {
    if (optionRelationship) {
      setAmountOfPoints(optionRelationship.amountOfPoints);
    }
  }, [optionRelationship]);

  const updateOptionRelationship = useUpdateChoiceOption({
    choiceOptionId,
  });

  useEffect(() => {
    if (amountOfPoints) {
      updateOptionRelationship.mutate({ amountOfPoints: +amountOfPoints });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountOfPoints]);

  useEffect(() => {
    if (characterId?.trim().length) {
      updateOptionRelationship.mutate({
        characterId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  useEscapeOfModal({
    value: showAllCharacters,
    setValue: setShowAllCharacters,
  });
  return (
    <div className="self-end w-full px-[.5rem] flex gap-[1rem] flex-grow flex-wrap">
      <div className="relative flex-grow">
        <button
          onClick={() => setShowAllCharacters((prev) => !prev)}
          className="w-full outline-gray-300 px-[1rem] py-[.5rem] rounded-md shadow-md flex justify-between items-center"
          type="button"
        >
          <h4 className="text-[1.4rem]">{characterName || "Персонажи"}</h4>
          <img
            src={characterImg}
            alt="CharacterIcon"
            className={`${
              characterImg ? "" : "hidden"
            } rounded-md w-[3.5rem] object-contain`}
          />
        </button>
        <PlotfieldCharacterPromptMain
          characterName={characterName}
          setCharacterId={setCharacterId}
          setCharacterName={setCharacterName}
          setShowCharacterModal={setShowAllCharacters}
          showCharacterModal={showAllCharacters}
          setCharacterImg={setCharacterImg}
        />
      </div>
      <input
        type="text"
        placeholder="Очки характеристики"
        className="flex-grow  text-[1.3rem] px-[1rem] py-[.5rem] text-gray-700 outline-gray-300 rounded-md shadow-md"
        value={amountOfPoints || ""}
        onChange={(e) => setAmountOfPoints(+e.target.value)}
      />
    </div>
  );
}
