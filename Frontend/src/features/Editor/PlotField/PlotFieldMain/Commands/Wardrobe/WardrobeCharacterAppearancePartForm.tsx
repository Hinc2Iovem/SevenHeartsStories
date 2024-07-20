import { useEffect, useState } from "react";
import useGetCharacterById from "../../../../../../hooks/Fetching/Character/useGetCharacterById";
import useEscapeOfModal from "../../../../../../hooks/UI/useEscapeOfModal";
import useGetTranslationCharacterEnabled from "../hooks/Character/useGetTranslationCharacterEnabled";
import useCreateWardrobeAppearanceTypeBlock from "../hooks/Wardrobe/WardrobeAppearancePartBlock/useCreateWardrobeAppearanceTypeBlock";
import PlotfieldAppearancePartPromptMain from "../Prompts/AppearanceParts/PlotfieldAppearancePartPromptMain";
import PlotfieldCharacterPromptMain from "../Prompts/Characters/PlotfieldCharacterPromptMain";

type WardrobeCharacterAppearancePartFormTypes = {
  characterId: string;
  commandWardrobeId: string;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
};

export type PossibleWardrobeAppearancePartVariationsTypes =
  | "hair"
  | "dress"
  | "other";

const PossibleWardrobeAppearancePartVariations = [
  "Волосы",
  "Внешний вид",
  "Остальное",
];

export default function WardrobeCharacterAppearancePartForm({
  commandWardrobeId,
  characterId,
  setCharacterId,
}: WardrobeCharacterAppearancePartFormTypes) {
  const [characterImg, setCharacterImg] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const { data: character } = useGetCharacterById({ characterId });
  const { data: translatedCharacter } = useGetTranslationCharacterEnabled({
    characterId,
    commandSayType: "character",
  });

  useEffect(() => {
    if (character) {
      setCharacterImg(character?.img ?? "");
    }
  }, [character]);

  useEffect(() => {
    if (translatedCharacter) {
      translatedCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCharacterName(tc.text);
        }
      });
    }
  }, [translatedCharacter]);

  const [appearancePartId, setAppearancePartId] = useState("");
  const [appearancePartVariationType, setAppearancePartVariationType] =
    useState<PossibleWardrobeAppearancePartVariationsTypes>(
      "" as PossibleWardrobeAppearancePartVariationsTypes
    );
  const [
    showAppearancePartVariationModal,
    setShowAppearancePartVariationModal,
  ] = useState(false);
  const [showAppearancePartModal, setShowAppearancePartModal] = useState(false);
  const [
    transmittingAppearancePartVariableEngToRus,
    setTransmittingAppearancePartVariableEngToRus,
  ] = useState("");

  const createAppearancePartBlock = useCreateWardrobeAppearanceTypeBlock({
    appearancePartId,
    commandWardrobeId,
  });

  useEffect(() => {
    if (appearancePartId?.trim().length) {
      createAppearancePartBlock.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appearancePartId]);

  useEscapeOfModal({
    value: showCharacterModal,
    setValue: setShowCharacterModal,
  });
  useEscapeOfModal({
    value: showAppearancePartModal,
    setValue: setShowAppearancePartModal,
  });
  useEscapeOfModal({
    value: showAppearancePartVariationModal,
    setValue: setShowAppearancePartVariationModal,
  });

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="sm:w-[77%] flex-grow w-full flex flex-col gap-[1rem]"
    >
      <div className="w-full relative">
        <button
          onClick={() => {
            setShowAppearancePartModal(false);
            setShowAppearancePartVariationModal(false);
            setShowCharacterModal((prev) => !prev);
          }}
          type="button"
          className="w-full text-start bg-white rounded-md px-[1rem] py-[.5rem] shadow-md flex items-center justify-between"
        >
          <p className="text-[1.4rem] text-gray-700">
            {characterName?.trim().length ? characterName : "Имя персонажа"}
          </p>
          <img
            src={characterImg}
            alt="CharacterImg"
            className={`${
              characterImg?.trim().length ? "" : "hidden"
            } w-[3rem] object-cover rounded-md self-end`}
          />
        </button>
        <PlotfieldCharacterPromptMain
          characterName={characterName}
          setCharacterId={setCharacterId}
          setCharacterName={setCharacterName}
          setShowCharacterModal={setShowCharacterModal}
          showCharacterModal={showCharacterModal}
          setCharacterImg={setCharacterImg}
        />
      </div>
      <div className="w-full relative flex gap-[1rem] sm:flex-row flex-col">
        <button
          onClick={() => {
            setShowAppearancePartModal(false);
            setShowCharacterModal(false);
            setShowAppearancePartVariationModal((prev) => !prev);
          }}
          type="button"
          className="w-full text-start bg-white rounded-md px-[1rem] py-[.5rem] shadow-md flex items-center justify-between"
        >
          <p className="text-[1.4rem] text-gray-700 whitespace-nowrap">
            {transmittingAppearancePartVariableEngToRus || "Тип Одежды"}
          </p>
        </button>
        <aside
          className={`${
            showAppearancePartVariationModal ? "" : "hidden"
          } translate-y-[2rem] absolute top-1/2 z-[10] p-[1rem] min-w-[10rem] w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
        >
          {PossibleWardrobeAppearancePartVariations.map((p) => (
            <button
              type="button"
              onClick={() => {
                if (p === "Волосы") {
                  setTransmittingAppearancePartVariableEngToRus("Волосы");
                  setAppearancePartVariationType("hair");
                } else if (p === "Внешний вид") {
                  setTransmittingAppearancePartVariableEngToRus("Внешний вид");
                  setAppearancePartVariationType("dress");
                } else {
                  setTransmittingAppearancePartVariableEngToRus("Остальное");
                  setAppearancePartVariationType("other");
                }
                setShowAppearancePartVariationModal(false);
              }}
              className="text-start text-[1.3rem] px-[.5rem] py-[.2rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
            >
              {p}
            </button>
          ))}
        </aside>
        <button
          onClick={() => {
            setShowCharacterModal(false);
            setShowAppearancePartVariationModal(false);
            setShowAppearancePartModal((prev) => !prev);
          }}
          type="button"
          className="w-full text-start bg-white rounded-md px-[1rem] py-[.5rem] shadow-md flex items-center justify-between"
        >
          <p className="text-[1.4rem] text-gray-700">Одежда</p>
        </button>
        <PlotfieldAppearancePartPromptMain
          setAppearancePartId={setAppearancePartId}
          appearancePartVariationType={appearancePartVariationType}
          characterId={characterId}
          setShowAppearancePartModal={setShowAppearancePartModal}
          showAppearancePartModal={showAppearancePartModal}
        />
      </div>
    </form>
  );
}
