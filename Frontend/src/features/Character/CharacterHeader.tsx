import React, { useState } from "react";
import LightBox from "../shared/utilities/LightBox";
import { useLocation, useNavigate } from "react-router-dom";
import arrowPrev from "../../assets/images/shared/prev.png";
import createCharacter from "../../assets/images/Character/createCharacter.png";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import { CharacterTypes } from "./CharacterListPage";

export default function CharacterHeader() {
  const [characterType, setCharacterType] =
    useState<CharacterTypes>("EmptyCharacter");
  const [name, setName] = useState("");
  const [unknownName, setUnknownName] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [description, setDescription] = useState("");
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/stories";

  const handleGoBack = () => {
    navigate(from);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <header className="flex justify-between w-full gap-[1rem]">
        <button
          onClick={handleGoBack}
          className="active:scale-[0.99] hover:scale-[1.01]"
        >
          <img src={arrowPrev} alt="GoBack" className="w-[4rem]" />
        </button>
        <ButtonHoverPromptModal
          onClick={() => setShowCharacterModal(true)}
          positionByAbscissa="right"
          contentName="Создать Персонажа"
          asideClasses="text-[1.3rem]"
          className="active:scale-[0.99] hover:scale-[1.01]"
        >
          <img
            src={createCharacter}
            alt="CreateCharacter"
            className="w-[4rem]"
          />
        </ButtonHoverPromptModal>
      </header>
      <aside
        className={`${
          showCharacterModal ? "" : "hidden"
        } fixed top-1/2 z-[4] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-neutral-magnolia rounded-md ${
          characterType === "EmptyCharacter" ? "min-h-[24rem]" : "min-h-[48rem]"
        } sm:w-[40rem] w-[30rem] p-[1rem]`}
      >
        <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[1rem]">
            <h2 className="text-[2.5rem] text-accent-marine-blue">
              Тип персонажа
            </h2>
            <ul className="flex gap-[1rem] flex-wrap">
              <li>
                <button
                  onClick={() => setCharacterType("EmptyCharacter")}
                  className={`text-[1.3rem] ${
                    characterType === "EmptyCharacter"
                      ? "bg-accent-marine-blue text-white"
                      : "bg-white text-black"
                  } p-[1rem] rounded-md transition-all hover:bg-accent-marine-blue hover:text-white shadow-sm`}
                >
                  EmptyCharacter
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCharacterType("MinorCharacter")}
                  className={`text-[1.3rem] ${
                    characterType === "MinorCharacter"
                      ? "bg-accent-marine-blue text-white"
                      : "bg-white text-black"
                  } p-[1rem] rounded-md transition-all hover:bg-accent-marine-blue hover:text-white shadow-sm`}
                >
                  MinorCharacter
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCharacterType("MainHero")}
                  className={`text-[1.3rem] ${
                    characterType === "MainHero"
                      ? "bg-accent-marine-blue text-white"
                      : "bg-white text-black"
                  } p-[1rem] rounded-md transition-all hover:bg-accent-marine-blue hover:text-white shadow-sm`}
                >
                  MainHero
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[2rem]">
            <input
              type="text"
              className="text-[1.5rem] w-full p-[1rem] outline-none text-gray-700"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {characterType !== "EmptyCharacter" && (
              <>
                <input
                  type="text"
                  className="text-[1.5rem] w-full p-[1rem] outline-none text-gray-700"
                  placeholder="Имя(Незнакомец)"
                  value={unknownName}
                  onChange={(e) => setUnknownName(e.target.value)}
                />
                <input
                  type="text"
                  className="text-[1.5rem] w-full p-[1rem] outline-none text-gray-700"
                  placeholder="nameTag"
                  value={nameTag}
                  onChange={(e) => setNameTag(e.target.value)}
                />
                <textarea
                  className="text-[1.5rem] w-full max-h-[9rem] p-[1rem] outline-none text-gray-700"
                  placeholder="Описание"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            )}
          </div>
          <button className="self-end hover:scale-[1.01] hover:bg-accent-marine-blue hover:text-white transition-all active:scale-[0.99] text-[1.5rem] mt-auto p-[1rem] rounded-md shadow-sm bg-white">
            Завершить
          </button>
        </form>
      </aside>
      <LightBox
        isLightBox={showCharacterModal}
        setIsLightBox={setShowCharacterModal}
      />
    </>
  );
}
