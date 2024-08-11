import { useEffect, useRef, useState } from "react";
import useGetCharacterTranslationByTextFieldNameAndSearch from "../../../../hooks/Fetching/Character/useGetCharacterTranslationByTextFieldNameAndSearch";
import useOutOfModal from "../../../../hooks/UI/useOutOfModal";
import useDebounce from "../../../../hooks/utilities/useDebounce";

type CharacterPromptTypes = {
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
};

export default function CharacterPrompt({
  setCharacterId,
}: CharacterPromptTypes) {
  const [showCharacters, setShowCharacters] = useState(false);
  const modalCharactersRef = useRef<HTMLDivElement>(null);
  const [characterValue, setCharacterValue] = useState("");

  useOutOfModal({
    modalRef: modalCharactersRef,
    setShowModal: setShowCharacters,
    showModal: showCharacters,
  });

  const debouncedValue = useDebounce({ value: characterValue, delay: 500 });

  const { data: charactersSearch, isLoading } =
    useGetCharacterTranslationByTextFieldNameAndSearch({
      debouncedValue,
      language: "russian",
    });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      setCharacterId(
        charactersSearch?.find((cs) => cs.text === debouncedValue)
          ?.characterId || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, charactersSearch]);

  return (
    <form
      className="bg-white rounded-md shadow-md relative"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="w-full rounded-md shadow-md bg-white text-[1.3rem] px-[1rem] py-[.5rem] text-gray-700 outline-none"
        placeholder="Имя Персонажа"
        onClick={(e) => {
          e.stopPropagation();
          setShowCharacters(true);
        }}
        value={characterValue}
        onChange={(e) => setCharacterValue(e.target.value)}
      />
      <aside
        ref={modalCharactersRef}
        className={`${
          showCharacters ? "" : "hidden"
        } max-h-[15rem] overflow-auto flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[.5rem] p-[1rem] | containerScroll`}
      >
        {isLoading ? (
          <div className="text-[1.4rem] text-gray-600 text-center py-[.5rem]">
            Загрузка...
          </div>
        ) : charactersSearch && charactersSearch.length > 0 ? (
          charactersSearch.map((s) => (
            <button
              key={s._id}
              type="button"
              onClick={() => {
                setCharacterId(s.characterId);
                setCharacterValue(s.text);
                setShowCharacters(false);
              }}
              className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
            >
              {s.text}
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowCharacters(false);
            }}
            className="text-[1.4rem] outline-gray-300 text-gray-600 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md"
          >
            Нету Подходящих Персонажей
          </button>
        )}
      </aside>
    </form>
  );
}
