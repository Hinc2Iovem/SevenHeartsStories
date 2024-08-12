import { useEffect, useRef, useState } from "react";
import useGetTranslationCharacteristicsQueries from "../../hooks/Fetching/Translation/Characteristic/useGetTranslationCharacteristicsQueries";
import useOutOfModal from "../../hooks/UI/useOutOfModal";
import { useParams } from "react-router-dom";
import useCreateCharacteristic from "../../hooks/Posting/Characteristic/useCreateCharacteristic";

type StorySinglePageHeaderCharacteristicModalTypes = {
  showCharacteristicsModal: boolean;
  setShowCharacteristicsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StorySinglePageHeaderCharacteristicModal({
  showCharacteristicsModal,
  setShowCharacteristicsModal,
}: StorySinglePageHeaderCharacteristicModalTypes) {
  const { storyId } = useParams();
  const [characteristicName, setCharacteristicName] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const characteristics = useGetTranslationCharacteristicsQueries({
    storyId: storyId || "",
    language: "russian",
  });

  const createCharacteristic = useCreateCharacteristic({
    characteristicName,
    storyId: storyId || "",
    language: "russian",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characteristicName?.trim().length) {
      createCharacteristic.mutate();
      setShowCharacteristicsModal(false);
    }
  };

  useEffect(() => {
    if (showCharacteristicsModal) {
      setCharacteristicName("");
    }
  }, [showCharacteristicsModal]);

  useOutOfModal({
    modalRef,
    setShowModal: setShowCharacteristicsModal,
    showModal: showCharacteristicsModal,
  });
  return (
    <aside
      ref={modalRef}
      className={`${
        showCharacteristicsModal ? "" : "hidden"
      } absolute w-[25rem] max-h-[30rem] overflow-auto flex flex-col gap-[1rem] rounded-md shadow-md bg-white right-0 z-[1]`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full p-[1rem] bg-white gap-[1rem]"
      >
        <input
          type="text"
          value={characteristicName}
          placeholder="Сила"
          className="w-full px-[1rem] text-[1.4rem] py-[.5rem] border-gray-700 border-dashed border-[2px] rounded-md"
          onChange={(e) => setCharacteristicName(e.target.value)}
        />
        <button className="px-[1rem] py-[.5rem] text-[1.3rem] rounded-md border-black border-[1px] hover:bg-black hover:text-white transition-all">
          Создать
        </button>
      </form>
      <div
        className={`${
          characteristics.length ? "" : "hidden"
        } px-[1rem] flex gap-[1rem] pb-[1rem] flex-wrap`}
      >
        {characteristics.map((c) =>
          c.data?.map((cd) => (
            <h3
              className="text-[1.5rem] bg-white rounded-md shadow-md p-[.2rem] cursor-default hover:text-white hover:bg-green-300 transition-all"
              key={cd._id}
            >
              {cd.text}
            </h3>
          ))
        )}
      </div>
    </aside>
  );
}
