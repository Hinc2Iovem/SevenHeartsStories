import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import commands from "../../../assets/images/Editor/commands.png";
import stats from "../../../assets/images/shared/stats.png";
import { Link, useParams } from "react-router-dom";

export default function EditorHeader() {
  const { storyId } = useParams();
  return (
    <header className="flex w-full items-center gap-[1rem] justify-between px-[1rem]">
      <button className="bg-white rounded-md shadow-md px-[1rem] hover:scale-[1.01]">
        <Link className="text-[2rem]" to={`/stories/${storyId}`}>
          Назад к Истории
        </Link>
      </button>
      <div className="flex gap-[1rem] w-fit">
        <ButtonHoverPromptModal
          contentName="Лист Команд"
          positionByAbscissa="right"
          asideClasses="text-[1.5rem]"
        >
          <img src={commands} alt="Commands" className="w-[4rem]" />
        </ButtonHoverPromptModal>
        <ButtonHoverPromptModal
          contentName="Информация по эпизоду"
          positionByAbscissa="right"
          asideClasses="text-[1.5rem]"
        >
          <img src={stats} alt="Episode Info" className="w-[4rem]" />
        </ButtonHoverPromptModal>
      </div>
    </header>
  );
}
