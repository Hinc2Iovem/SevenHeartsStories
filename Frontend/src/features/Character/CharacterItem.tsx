import shsBg from "../../assets/images/Story/storyBg.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CharacterTypes } from "./CharacterListPage";
import CharacterItemMainHero from "./CharacterMainHero";
import wardrobe from "../../assets/images/Story/wardrobe.png";

export default function CharacterItem() {
  const [isFrontSide, setIsFrontSide] = useState(false);
  const [characterType, setCharacterType] =
    useState<CharacterTypes>("MainHero");
  return (
    <>
      {characterType === "MainHero" ? (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col gap-[1rem] rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemMainHero isFrontSide={isFrontSide} />
        </article>
      ) : characterType === "MinorCharacter" ? (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col gap-[1rem] rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemMinor isFrontSide={isFrontSide} />
        </article>
      ) : (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col gap-[1rem] rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemEmpty isFrontSide={isFrontSide} />
        </article>
      )}
    </>
  );
}

function CharacterItemMinor({ isFrontSide }: { isFrontSide: boolean }) {
  return (
    <>
      {isFrontSide ? (
        <>
          <img
            src={shsBg}
            alt="CharacterImg"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="w-full rounded-b-md bg-neutral-alabaster p-[1rem] absolute bottom-0 text-[1.5rem] shadow-sm shadow-gray-600">
            Второстепенный Перс Имя
            {/* Sdelatb tyt potom substring */}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[1rem] justify-between h-full">
          <div className="gap-[1rem] flex flex-col">
            <div>
              <h3 className="text-[2rem]">Имя перса</h3>
              <p className="text-[1.35rem]">Имя(Незнакомец)</p>
              <p className="text-[1.3rem]">НеймТаг</p>
            </div>
            <p className="text-[1.1rem] text-gray-600">Описание Перса</p>
          </div>

          <div className="flex gap-[1rem] flex-wrap">
            <Link
              className="ml-auto"
              to="/editor/characters/:characterId/wardrobes"
            >
              <button className=" bg-white shadow-md p-[.5rem] rounded-md active:scale-[0.99] hover:scale-[1.01] ">
                <img src={wardrobe} alt="Wardrobe" className="w-[3rem]" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function CharacterItemEmpty({ isFrontSide }: { isFrontSide: boolean }) {
  return (
    <>
      {isFrontSide ? (
        <>
          <img
            src={shsBg}
            alt="CharacterImg"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="w-full rounded-b-md bg-neutral-alabaster p-[1rem] absolute bottom-0 text-[1.5rem] shadow-sm shadow-gray-600">
            Просто Никто Перс Имя
            {/* Sdelatb tyt potom substring */}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[1rem] h-full">
          <h3 className="text-[2rem]">Имя перса</h3>
        </div>
      )}
    </>
  );
}
