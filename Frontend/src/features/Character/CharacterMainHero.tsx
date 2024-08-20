import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import add from "../../assets/images/shared/add.png";
import characteristic from "../../assets/images/Story/characteristic.png";
import wardrobe from "../../assets/images/Story/wardrobe.png";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import ButtonHoverPromptModal from "../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import PreviewImage from "../shared/utilities/PreviewImage";
import "./characterStyle.css";

type CharacterItemMainHeroTypes = {
  isFrontSide: boolean;
  characterName: string;
  img?: string;
  characterId: string;
};

export default function CharacterItemMainHero({
  isFrontSide,
  characterId,
  characterName,
  img,
}: CharacterItemMainHeroTypes) {
  const { storyId } = useParams();
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

  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    img ? img : null
  );

  const uploadImgMutation = useUpdateImg({
    id: characterId,
    path: "/characters",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      uploadImgMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  return (
    <>
      {isFrontSide ? (
        <>
          {img ? (
            <div className="w-full h-full rounded-t-md relative shadow-sm">
              <img
                src={img}
                alt="StoryBackground"
                className="object-cover w-full h-full cursor-pointer rounded-t-md border-[3px] border-b-0 border-white"
              />
            </div>
          ) : (
            <PreviewImage
              imgClasses="w-full h-full bg-neutral-alabaster object-cover rounded-md border-[2px] border-b-0 rounded-b-none border-white"
              divClasses="bg-neutral-alabaster w-full h-full relative"
              imagePreview={imagePreview}
              setPreview={setPreview}
            />
          )}
          <div className="w-full rounded-b-md bg-neutral-alabaster p-[1rem] text-[1.5rem] shadow-sm border-t-[1px] border-gray-300 rounded-t-md shadow-gray-600">
            {characterName.length > 30
              ? characterName.substring(0, 30) + "..."
              : characterName}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[1rem] justify-between h-full">
          <div className="gap-[1rem] flex flex-col">
            <div>
              <h3 className="text-[2rem] break-words">{characterName}</h3>
              <p className="text-[1.3rem] break-words">НеймТаг: {"SMH"}</p>
            </div>
          </div>

          <div className="flex gap-[1rem] flex-wrap">
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-[.5rem] bg-white p-[.5rem] rounded-md shadow-md"
            >
              <ButtonHoverPromptModal
                contentName="Лист характеристик"
                positionByAbscissa="left"
                asideClasses="text-[1.5rem]"
                variant="rectangle"
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
              </ButtonHoverPromptModal>
              <ButtonHoverPromptModal
                contentName="Создать характеристику"
                positionByAbscissa="left"
                asideClasses="text-[1.5rem]"
                variant="rectangle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCharacteristicModalCreate(true);
                  setShowCharacteristicModal(false);
                }}
                className="active:scale-[0.99] hover:scale-[1.1]"
              >
                <img src={add} alt="Add" className="w-[2rem]" />
              </ButtonHoverPromptModal>
            </div>

            <ButtonHoverPromptModal
              contentName="Гардероб"
              positionByAbscissa="right"
              positionForDiv="ml-auto"
              asideClasses="text-[1.5rem]"
              className=" bg-white shadow-md p-[.5rem] rounded-md active:scale-[0.99] hover:scale-[1.01] "
            >
              <Link className="ml-auto" to={`/stories/${storyId}/wardrobes`}>
                <img src={wardrobe} alt="Wardrobe" className="w-[3rem]" />
              </Link>
            </ButtonHoverPromptModal>
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
