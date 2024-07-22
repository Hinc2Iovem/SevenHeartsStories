import useGetAllCharacteristics from "../../../../../../../hooks/Fetching/CharacterCharacteristic/useGetAllCharacteristics";
import PlotfieldCharacteristicsPrompt from "./PlotfieldCharacteristicsPrompt";
import "../promptStyles.css";

type PlotfieldCharacteristicPromptMainTypes = {
  setCharacteristicName: React.Dispatch<React.SetStateAction<string>>;
  setCharacteristicId: React.Dispatch<React.SetStateAction<string>>;
  setShowCharacteristicModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCharacteristicModal: boolean;
};

export default function PlotfieldCharacteristicPromptMain({
  setCharacteristicName,
  setCharacteristicId,
  setShowCharacteristicModal,
  showCharacteristicModal,
}: PlotfieldCharacteristicPromptMainTypes) {
  const { data: allCharacteristics } = useGetAllCharacteristics();

  return (
    <aside
      className={`${
        showCharacteristicModal ? "" : "hidden"
      } translate-y-[1.5rem] right-0 absolute top-1/2 z-[10] p-[1rem] min-w-fit w-full max-h-[10rem] overflow-y-auto bg-white shadow-md rounded-md flex flex-col gap-[1rem] | scrollBar`}
    >
      {allCharacteristics &&
        allCharacteristics?.map((c) => (
          <PlotfieldCharacteristicsPrompt
            key={c._id}
            setCharacteristicName={setCharacteristicName}
            setCharacteristicId={setCharacteristicId}
            setShowCharacteristicModal={setShowCharacteristicModal}
            {...c}
          />
        ))}
    </aside>
  );
}
