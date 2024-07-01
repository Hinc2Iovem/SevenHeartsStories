import translator from "../../../assets/images/Auth/translator.png";
import scriptwriter from "../../../assets/images/Auth/scriptwriter.png";

type RegisterFormSecondPageTypes = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  currentPage: number;
};

export default function RegisterFormSecondPage({
  currentPage,
  setCurrentPage,
  role,
  setRole,
}: RegisterFormSecondPageTypes) {
  return (
    <div
      className={`${
        currentPage === 2 ? "" : "hidden"
      } mx-auto flex flex-col gap-[2rem] h-full`}
    >
      <div className="w-full flex flex-col text-center">
        <h2 className="text-accent-marine-blue font-medium text-[2rem]">
          Выберите роль
        </h2>
        <p className="text-neutral-600">
          Роль будет решать доступность функционала для вас
        </p>
      </div>
      <button
        type="button"
        onClick={() => setRole("scriptwriter")}
        className={`${
          role === "scriptwriter"
            ? "bg-primary-pastel-blue text-white"
            : "bg-white text-black"
        } md:w-[20rem] justify-center w-fit mx-auto active:scale-[0.98] transition-all hover:bg-primary-pastel-blue hover:text-white flex items-center gap-[.5rem] shadow-md px-[1rem] py-[.5rem] rounded-md`}
      >
        <p>Сценарист</p>
        <img
          src={scriptwriter}
          alt="Scriptwriter"
          className="w-[2.5rem] h-[2.5rem]"
        />
      </button>
      <button
        type="button"
        onClick={() => setRole("translator")}
        className={`${
          role === "translator"
            ? "bg-accent-purplish-blue text-white"
            : "bg-white text-black"
        } md:w-[20rem] justify-center w-fit mx-auto active:scale-[0.98] transition-all hover:bg-accent-purplish-blue hover:text-white flex items-center gap-[.5rem] shadow-md px-[1rem] py-[.5rem] rounded-md`}
      >
        <p>Переводчик</p>
        <img
          src={translator}
          alt="Translator"
          className="w-[2.5rem] h-[2.5rem]"
        />
      </button>
      <div className="mt-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(1)}
          className="w-fit self-start px-[1rem] py-[.5rem] rounded-md shadow-md hover:bg-neutral-50 active:scale-[0.98]"
          type="button"
        >
          Предыдущая
        </button>
        <button
          type="submit"
          className="w-fit self-start px-[1rem] py-[.5rem] rounded-md shadow-md bg-primary-pastel-blue  text-white hover:bg-accent-purplish-blue active:scale-[0.98] transition-all"
        >
          Завершить
        </button>
      </div>
    </div>
  );
}
