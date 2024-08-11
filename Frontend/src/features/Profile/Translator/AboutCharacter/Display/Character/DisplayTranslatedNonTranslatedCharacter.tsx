import { useEffect, useState } from "react";
import useGetCharacterById from "../../../../../../hooks/Fetching/Character/useGetCharacterById";
import { CharacterTypes } from "../../../../../../types/StoryData/Character/CharacterTypes";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import useUpdateCharacterTranslation from "../../../../../../hooks/Patching/Translation/useUpdateCharacterTranslation";
import { CurrentlyAvailableLanguagesTypes } from "../../../../../../types/Additional/CURRENTLY_AVAILABEL_LANGUAGES";
import { CombinedTranslatedAndNonTranslatedCharacterTypes } from "../../Filters/FiltersEverythingCharacterForCharacter";

type DisplayTranslatedNonTranslatedCharacterTypes = {
  characterTypeFilter: string;
  characterIdFilter: string;
  languageToTranslate: CurrentlyAvailableLanguagesTypes;
} & CombinedTranslatedAndNonTranslatedCharacterTypes;

export default function DisplayTranslatedNonTranslatedCharacter({
  nonTranslated,
  translated,
  characterTypeFilter,
  characterIdFilter,
  languageToTranslate,
}: DisplayTranslatedNonTranslatedCharacterTypes) {
  const [translatedCharacterName, setTranslatedCharacterName] = useState("");
  const [translatedUnknownName, setTranslatedUnknownName] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");

  const [characterName, setCharacterName] = useState("");
  const [unknownName, setUnknownName] = useState("");
  const [description, setDescription] = useState("");

  const [characterId, setCharacterId] = useState("");

  const { data: character } = useGetCharacterById({ characterId });
  const [characterType, setCharacterType] = useState<CharacterTypes>(
    "" as CharacterTypes
  );
  const [characterTypeFilterToEng, setCharacterTypeFilterToEng] =
    useState<CharacterTypes>("" as CharacterTypes);

  useEffect(() => {
    if (characterTypeFilter?.trim().length) {
      if (characterTypeFilter === "Обычный Персонаж") {
        setCharacterTypeFilterToEng("emptycharacter");
      } else if (characterTypeFilter === "Главный Персонаж") {
        setCharacterTypeFilterToEng("maincharacter");
      } else {
        setCharacterTypeFilterToEng("minorcharacter");
      }
    } else {
      setCharacterTypeFilterToEng("" as CharacterTypes);
    }
  }, [characterTypeFilter]);

  useEffect(() => {
    if (character) {
      setCharacterType(character.type);
    }
  }, [character]);

  useEffect(() => {
    if (translated) {
      translated.map((t) => {
        if (t.textFieldName === "characterName") {
          setTranslatedCharacterName(t.text);
          setCharacterId(t.characterId);
        } else if (t.textFieldName === "characterDescription") {
          setTranslatedDescription(t.text);
        } else if (t.textFieldName === "characterUnknownName") {
          setTranslatedUnknownName(t.text);
        }
      });
    }
  }, [translated]);

  useEffect(() => {
    if (nonTranslated) {
      nonTranslated.map((nt) => {
        if (nt.textFieldName === "characterName") {
          setCharacterName(nt.text);
        } else if (nt.textFieldName === "characterDescription") {
          setDescription(nt.text);
        } else if (nt.textFieldName === "characterUnknownName") {
          setUnknownName(nt.text);
        }
      });
    } else {
      setCharacterName("");
      setDescription("");
      setUnknownName("");
    }
  }, [nonTranslated, languageToTranslate]);

  const debouncedName = useDebounce({ value: characterName, delay: 500 });
  const debouncedUnknownName = useDebounce({ value: unknownName, delay: 500 });
  const debouncedDescription = useDebounce({ value: description, delay: 500 });

  const updateCharacterTranslation = useUpdateCharacterTranslation({
    language: languageToTranslate,
    characterId,
  });

  useEffect(() => {
    if (debouncedName?.trim().length) {
      updateCharacterTranslation.mutate({ characterName: debouncedName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);
  useEffect(() => {
    if (debouncedUnknownName?.trim().length) {
      updateCharacterTranslation.mutate({ unknownName: debouncedUnknownName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUnknownName]);
  useEffect(() => {
    if (debouncedDescription?.trim().length) {
      updateCharacterTranslation.mutate({ description: debouncedDescription });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDescription]);

  const isCharacterIdMatched =
    characterIdFilter?.trim().length && characterIdFilter === characterId;

  return (
    <>
      {isCharacterIdMatched ? (
        <div
          className={`${
            characterTypeFilter === "Обычный Персонаж" ||
            characterTypeFilter === "Главный Персонаж"
              ? "h-fit flex-col"
              : "min-h-[24rem] sm:flex-row flex-col"
          } w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
        >
          <div
            className={`h-full ${
              characterTypeFilter === "Обычный Персонаж" ||
              characterTypeFilter === "Главный Персонаж"
                ? "w-full"
                : "w-full sm:w-[calc(50%)]"
            } rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={translatedCharacterName}
                className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setTranslatedCharacterName(e.target.value)}
              />
              {characterType === "minorcharacter" ? (
                <>
                  <input
                    type="text"
                    value={translatedUnknownName}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                    onChange={(e) => setTranslatedUnknownName(e.target.value)}
                  />
                  <textarea
                    value={translatedDescription}
                    rows={5}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.5rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
                    onChange={(e) => setTranslatedDescription(e.target.value)}
                  />
                </>
              ) : null}
            </form>
          </div>
          <div
            className={`h-full ${
              characterTypeFilter === "Обычный Персонаж" ||
              characterTypeFilter === "Главный Персонаж"
                ? "w-full"
                : "w-full sm:w-[calc(50%)] "
            } rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={characterName}
                placeholder="Имя персонажа"
                className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setCharacterName(e.target.value)}
              />
              {characterType === "minorcharacter" ? (
                <>
                  <input
                    type="text"
                    value={unknownName}
                    placeholder="Неивестное имя персонажа"
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                    onChange={(e) => setUnknownName(e.target.value)}
                  />
                  <textarea
                    value={description}
                    placeholder="Описание персонажа"
                    rows={5}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.5rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </>
              ) : null}
            </form>
          </div>
        </div>
      ) : (
        <div
          className={`${
            characterTypeFilter === "Обычный Персонаж" ||
            characterTypeFilter === "Главный Персонаж"
              ? "h-fit flex-col"
              : "min-h-[24rem] sm:flex-row flex-col"
          } ${
            characterTypeFilterToEng?.trim().length &&
            characterType === characterTypeFilterToEng
              ? ""
              : !characterTypeFilter?.trim().length
              ? ""
              : "hidden"
          }  w-full flex gap-[.5rem] bg-primary-pastel-blue p-[.5rem] rounded-md`}
        >
          <div
            className={`h-full ${
              characterTypeFilter === "Обычный Персонаж" ||
              characterTypeFilter === "Главный Персонаж"
                ? "w-full"
                : "w-full sm:w-[calc(50%)]"
            } rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={translatedCharacterName}
                className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setTranslatedCharacterName(e.target.value)}
              />
              {characterType === "minorcharacter" ? (
                <>
                  <input
                    type="text"
                    value={translatedUnknownName}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                    onChange={(e) => setTranslatedUnknownName(e.target.value)}
                  />
                  <textarea
                    value={translatedDescription}
                    rows={5}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.5rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
                    onChange={(e) => setTranslatedDescription(e.target.value)}
                  />
                </>
              ) : null}
            </form>
          </div>
          <div
            className={`h-full ${
              characterTypeFilter === "Обычный Персонаж" ||
              characterTypeFilter === "Главный Персонаж"
                ? "w-full"
                : "w-full sm:w-[calc(50%)] "
            } rounded-md shadow-md shadow-gray-400 bg-white`}
          >
            <form
              className="flex flex-col gap-[.5rem] p-[1rem] w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={characterName}
                placeholder="Имя персонажа"
                className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                onChange={(e) => setCharacterName(e.target.value)}
              />
              {characterType === "minorcharacter" ? (
                <>
                  <input
                    type="text"
                    value={unknownName}
                    placeholder="Неивестное имя персонажа"
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.6rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white"
                    onChange={(e) => setUnknownName(e.target.value)}
                  />
                  <textarea
                    value={description}
                    placeholder="Описание персонажа"
                    rows={5}
                    className="w-full border-dotted border-gray-600 border-[2px] text-[1.5rem] font-medium text-gray-700 outline-none rounded-md px-[1rem] py-[.5rem] bg-white | containerScroll"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </>
              ) : null}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
