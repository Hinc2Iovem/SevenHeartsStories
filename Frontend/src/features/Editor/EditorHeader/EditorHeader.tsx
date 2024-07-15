import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import commands from "../../../assets/images/Editor/commands.png";
import stats from "../../../assets/images/shared/stats.png";

export default function EditorHeader() {
  return (
    <header className="flex w-fit items-center gap-[1rem] self-end px-[1rem]">
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
    </header>
  );
}
