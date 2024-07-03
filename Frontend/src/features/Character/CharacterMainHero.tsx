import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import characteristic from "../../assets/images/Story/characteristic.png";
import wardrobe from "../../assets/images/Story/wardrobe.png";
import add from "../../assets/images/shared/add.png";
import shsBg from "../../assets/images/Story/storyBg.png";
import "./characterStyle.css";

export default function CharacterItemMainHero({
  isFrontSide,
}: {
  isFrontSide: boolean;
}) {
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [showCharacteristicModal, setShowCharacteristicModal] = useState(false);
  const characteristicRef = useRef<HTMLDivElement | null>(null);

  useOutOfModal({
    setShowModal: setShowCharacteristicModal,
    showModal: showCharacteristicModal,
    modalRef: characteristicRef,
  });

  const [showCharacteristicModalCreate, setShowCharacteristicModalCreate] =
    useState(false);
  const characteristicCreateRef = useRef<HTMLDivElement | null>(null);

  useOutOfModal({
    setShowModal: setShowCharacteristicModalCreate,
    showModal: showCharacteristicModalCreate,
    modalRef: characteristicCreateRef,
  });

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
            Главный перс Имя
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
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-[.5rem] bg-white p-[.5rem] rounded-md shadow-md"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCharacteristicModal(true);
                  setShowCharacteristicModalCreate(false);
                }}
                className="active:scale-[0.99] hover:scale-[1.01] "
              >
                <img
                  src={characteristic}
                  alt="Characteristic"
                  className="w-[3rem]"
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCharacteristicModalCreate(true);
                  setShowCharacteristicModal(false);
                }}
                className="active:scale-[0.99] hover:scale-[1.1]"
              >
                <img src={add} alt="Add" className="w-[2rem]" />
              </button>
            </div>

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

      <aside
        id="scrollBar"
        onClick={(e) => e.stopPropagation()}
        className={`${
          showCharacteristicModal ? "" : "hidden"
        } absolute bg-white rounded-md w-full h-[10rem] overflow-y-auto z-[10] bottom-[-11rem] p-[1rem] shadow-md border-dotted border-[2px] border-gray-300`}
        ref={characteristicRef}
      >
        {...Array.from({ length: 10 }).map((_, i) => (
          <p
            className="text-[1.5rem] text-gray-700 border-b-[2px] border-dotted border-gray-400"
            key={i + 1}
          >
            Strength: {i + 1}
          </p>
        ))}
      </aside>

      <aside
        onClick={(e) => e.stopPropagation()}
        className={`${
          showCharacteristicModalCreate ? "" : "hidden"
        } absolute bg-white rounded-md w-full z-[10] bottom-[-6.5rem] p-[1rem] shadow-md border-dotted border-[2px] border-gray-300`}
        ref={characteristicCreateRef}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewCharacteristic("");
            setShowCharacteristicModalCreate(false);
          }}
        >
          <input
            type="text"
            placeholder="Ловкость"
            value={newCharacteristic}
            onChange={(e) => setNewCharacteristic(e.target.value)}
            className="text-[1.5rem] outline-none w-full rounded-md px-[1rem] py-[.5rem]"
          />
        </form>
      </aside>
    </>
  );
}
