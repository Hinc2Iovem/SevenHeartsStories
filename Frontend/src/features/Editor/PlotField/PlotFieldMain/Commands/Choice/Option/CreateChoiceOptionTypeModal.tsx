import { useParams } from "react-router-dom";
import useEscapeOfModal from "../../../../../../../hooks/UI/useEscapeOfModal";
import { ChoiceOptionVariations } from "../../../../../../../types/StoryEditor/PlotField/Choice/ChoiceTypes";
import useCreateChoiceOption from "../../hooks/Choice/ChoiceOption/useCreateChoiceOption";

type CreateChoiceOptionTypeModalTypes = {
  topologyBlockId: string;
  choiceId: string;
  showCreateChoiceOptionModal: boolean;
  setShowCreateChoiceOptionModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateChoiceOptionTypeModal({
  topologyBlockId,
  choiceId,
  showCreateChoiceOptionModal,
  setShowCreateChoiceOptionModal,
}: CreateChoiceOptionTypeModalTypes) {
  const { episodeId } = useParams();

  const createChoiceOption = useCreateChoiceOption({
    episodeId: episodeId ?? "",
    plotFieldCommandChoiceId: choiceId,
    topologyBlockId,
  });

  useEscapeOfModal({
    value: showCreateChoiceOptionModal,
    setValue: setShowCreateChoiceOptionModal,
  });
  return (
    <aside
      className={`${
        showCreateChoiceOptionModal ? "" : "hidden"
      } absolute right-1/2 z-[10] flex flex-col min-w-fit w-full rounded-md shadow-md p-[.5rem] bg-white`}
    >
      {ChoiceOptionVariations.map((cov) => (
        <button
          key={cov}
          onClick={() => {
            setShowCreateChoiceOptionModal(false);
            createChoiceOption.mutate({ type: cov });
          }}
          className={`hover:bg-primary-light-blue hover:text-white transition-all text-[1.4rem] whitespace-nowrap text-gray-700 px-[1rem] py-[.5rem] rounded-md`}
        >
          {cov}
        </button>
      ))}
    </aside>
  );
}
