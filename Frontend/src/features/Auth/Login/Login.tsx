import { useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="md:h-screen w-screen flex md:items-center justify-center">
      <main className="w-full max-w-[60rem] md:mx-[1rem] md:bg-white flex md:flex-row flex-col md:h-[30rem] overflow-x-hidden shadow-sm rounded-md">
        <Sidebar />
        <form className="md:h-full p-[1rem] w-3/4 mx-auto md:bg-transparent bg-white md:relative absolute md:top-0 md:left-auto md:translate-x-0 top-[5rem] left-1/2 -translate-x-1/2">
          <div className={`mx-auto flex flex-col gap-[2rem]  mb-[2rem]`}>
            <div className="w-full flex flex-col text-center">
              <h2 className="text-accent-marine-blue font-medium text-[2rem]">
                Личные данные
              </h2>
              <p className="text-neutral-600">Введите ваш логин и пароль</p>
            </div>
            <div className="flex flex-col gap-[.5rem] w-full relative">
              <label
                htmlFor="username"
                className="text-[1.2rem] bg-white p-[.1rem] rounded-md text-neutral-600 absolute left-[1rem] top-[-1rem]"
              >
                Логин
              </label>
              <input
                id="username"
                className="w-full outline-0 px-[1rem] py-[.8rem] border-[1px] border-primary-pastel-blue rounded-md border-dotted"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[.5rem] w-full relative">
              <label
                htmlFor="password"
                className="text-[1.2rem] bg-white p-[.1rem] rounded-md text-neutral-600 absolute left-[1rem] top-[-1rem]"
              >
                Пароль
              </label>
              <input
                id="password"
                className="w-full outline-0 px-[1rem] py-[.8rem] border-[1px] border-primary-pastel-blue rounded-md border-dotted"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between flex-col">
            <Link className="md:block hidden" to="/auth/register">
              Всё ещё нету аккаунта? Регистрация
            </Link>
            <button
              type="submit"
              className="w-fit self-end px-[1rem] py-[.5rem] rounded-md shadow-md bg-primary-pastel-blue text-white hover:bg-accent-purplish-blue active:scale-[0.98] transition-all"
            >
              Завершить
            </button>
          </div>
        </form>
        <Link
          className="block md:hidden absolute bottom-[15rem] left-1/2 -translate-x-1/2"
          to="/auth/register"
        >
          Всё ещё нету аккаунта? Регистрация
        </Link>
      </main>
    </section>
  );
}
