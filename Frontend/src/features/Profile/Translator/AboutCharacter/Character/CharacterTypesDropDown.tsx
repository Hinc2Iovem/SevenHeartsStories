import { useRef, useState } from "react";
import useOutOfModal from "../../../../../hooks/UI/useOutOfModal";

const CHARACTER_TYPES = [
  "Обычный Персонаж",
  "Второстепенный Персонаж",
  "Главный Персонаж",
];

type CharacterTypesDropDownTypes = {
  characterType: string;
  setCharacterType: React.Dispatch<React.SetStateAction<string>>;
};

export default function CharacterTypesDropDown({
  characterType,
  setCharacterType,
}: CharacterTypesDropDownTypes) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutOfModal({ modalRef, setShowModal, showModal });
  return (
    <div className="bg-white rounded-md shadow-md relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowModal((prev) => !prev);
        }}
        className="text-[1.3rem] text-center px-[1rem] py-[.5rem] whitespace-nowrap"
      >
        {characterType || "Тип Персонажа"}
      </button>
      <aside
        ref={modalRef}
        className={`${
          showModal ? "" : "hidden"
        } overflow-auto flex flex-col gap-[.5rem] min-w-fit w-full absolute bg-white rounded-md shadow-md translate-y-[.5rem] p-[1rem]`}
      >
        {CHARACTER_TYPES.map((ct) => (
          <button
            key={ct}
            type="button"
            onClick={() => {
              if (ct === characterType) {
                setCharacterType("");
              } else {
                setCharacterType(ct);
              }
              setShowModal(false);
            }}
            className={`${
              ct === characterType
                ? "bg-primary-pastel-blue text-white"
                : " text-gray-600 bg-white"
            } text-[1.4rem] outline-gray-300 text-start hover:bg-primary-pastel-blue hover:text-white rounded-md px-[1rem] py-[.5rem] hover:shadow-md`}
          >
            {ct}
          </button>
        ))}
      </aside>
    </div>
  );
}
