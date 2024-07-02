import add from "../../../assets/images/shared/add.png";
import scriptwriter from "../../../assets/images/Auth/scriptwriter.png";
// import translator from "../../../assets/images/Auth/translator.png";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";

export default function ProfileLeftSide() {
  return (
    <div className="w-[20rem] flex gap-[1rem] flex-col">
      <div className="w-full h-[20rem] relative bg-white rounded-md shadow-sm">
        <img
          src={add}
          alt="Add"
          className="w-[5rem] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer"
        />
      </div>
      <div className="w-full p-[1rem] bg-white rounded-md shadow-sm">
        <h3 className="text-[1.5rem] text-center">Hinc2iovem</h3>
      </div>
      <div className="w-full p-[1rem] bg-white rounded-md shadow-sm flex gap-[.5rem] items-center justify-center">
        <h3 className="text-[1.5rem] text-center">Роль: </h3>
        <ButtonHoverPromptModal
          contentName="Сценарист"
          positionByAbscissa="left"
          asideClasses="text-[1.3rem] top-[4rem] bottom-[-3.5rem]"
        >
          <img src={scriptwriter} alt="Scriptwriter" className="w-[3.5rem]" />
        </ButtonHoverPromptModal>
      </div>
      <div className="w-full p-[1rem] bg-white rounded-md shadow-sm">
        <h3 className="text-[1.5rem] text-center">
          Количество законченных эпизодов: 5
        </h3>
      </div>
    </div>
  );
}
