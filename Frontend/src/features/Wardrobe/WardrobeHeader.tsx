import { useState } from "react";
import { Link } from "react-router-dom";
import arrowBack from "../../assets/images/shared/back.png";
import "../Character/characterStyle.css";
import useEscapeOfModal from "../../hooks/UI/useEscapeOfModal";

const characterNames = ["hinc2iovem", "hinc", "molodoy", "energyi"];
const bodyTypes = ["art", "skin", "hair", "dress", "accessory", "body"];
export default function WardrobeHeader() {
  const [characterName, setCharacterName] = useState(characterNames[0]);
  const [bodyType, setBodyType] = useState(bodyTypes[0]);

  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showBodyTypeModal, setShowBodyTypeModal] = useState(false);

  useEscapeOfModal({
    setValue: setShowBodyTypeModal,
    value: showBodyTypeModal,
  });
  useEscapeOfModal({
    setValue: setShowCharacterModal,
    value: showCharacterModal,
  });
  return (
    <header className="flex flex-col gap-[1rem]">
      <Link className="w-fit" to={"/editor/characters"}>
        <button className="block">
          <img src={arrowBack} className="w-[3rem]" alt="ToCharacters" />
        </button>
      </Link>
      <div className="flex gap-[1rem]">
        <div className="flex flex-col gap-[.5rem] relative">
          <button
            onClick={() => {
              setShowCharacterModal(false);
              setShowBodyTypeModal(true);
            }}
            className="text-[1.5rem] px-[1rem] py-[.5rem] outline-gray-400 bg-white rounded-md shadow-md hover:bg-primary-pastel-blue hover:text-white transition-all active:scale-[0.98]"
          >
            Тип Одежды
          </button>
          <p className="text-[1.5rem] border-b-[2px] border-gray-700 border-dotted text-center rounded-md">
            {bodyType}
          </p>
          <aside
            id="scrollBar"
            className={`${
              showBodyTypeModal ? "" : "hidden"
            } absolute top-1/2 translate-y-[1rem] z-[10] p-[1rem] min-w-[10rem] w-full h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem]`}
          >
            {bodyTypes.map((bt) => (
              <button
                key={bt}
                onClick={() => {
                  setBodyType(bt);
                  setShowBodyTypeModal(false);
                }}
                className="text-[1.3rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
              >
                {bt}
              </button>
            ))}
          </aside>
        </div>
        <div className="flex flex-col gap-[.5rem] relative">
          <button
            onClick={() => {
              setShowBodyTypeModal(false);
              setShowCharacterModal(true);
            }}
            className="text-[1.5rem] px-[1rem] py-[.5rem] outline-gray-400 bg-white rounded-md shadow-md hover:bg-primary-pastel-blue hover:text-white transition-all active:scale-[0.98]"
          >
            Имя Персонажа
          </button>
          <p className="text-[1.5rem] border-b-[2px] border-gray-700 border-dotted text-center rounded-md">
            {characterName}
          </p>
          <aside
            id="scrollBar"
            className={`${
              showCharacterModal ? "" : "hidden"
            } absolute top-1/2 translate-y-[1rem] z-[10] p-[1rem] min-w-[10rem] w-full h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem]`}
          >
            {characterNames.map((cn) => (
              <button
                key={cn}
                onClick={() => {
                  setCharacterName(cn);
                  setShowCharacterModal(false);
                }}
                className="text-[1.3rem] hover:bg-primary-light-blue hover:text-white transition-all rounded-md"
              >
                {cn}
              </button>
            ))}
          </aside>
        </div>
      </div>
    </header>
  );
}
