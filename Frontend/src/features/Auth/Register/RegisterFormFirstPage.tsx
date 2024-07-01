import { useState } from "react";
import { Link } from "react-router-dom";

type RegisterFormFirstPageTypes = {
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setSecretKey: React.Dispatch<React.SetStateAction<string>>;
  login: string;
  password: string;
  secretKey: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export default function RegisterFormFirstPage({
  login,
  setLogin,
  password,
  setPassword,
  secretKey,
  setSecretKey,
  currentPage,
  setCurrentPage,
}: RegisterFormFirstPageTypes) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`${
        currentPage === 1 ? "" : "hidden"
      } mx-auto flex flex-col gap-[2rem]`}
    >
      <div className="w-full flex flex-col text-center">
        <h2 className="text-accent-marine-blue font-medium text-[2rem]">
          Личные данные
        </h2>
        <p className="text-neutral-600">
          Введите ваш логин, пароль и код для регистрации
        </p>
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
      <div className="flex flex-col gap-[.5rem] w-full relative">
        <label
          htmlFor="secretKey"
          className="text-[1.2rem] bg-white p-[.1rem] rounded-md text-neutral-600 absolute left-[1rem] top-[-1rem]"
        >
          Код
        </label>
        <input
          id="secretKey"
          className="w-full outline-0 px-[1rem] py-[.8rem] border-[1px] border-primary-pastel-blue rounded-md border-dotted"
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>

      <button
        onClick={() => setCurrentPage(2)}
        className="w-fit self-end px-[1rem] py-[.5rem] rounded-md shadow-md hover:bg-neutral-50 active:scale-[0.98]"
        type="button"
      >
        Следующая
      </button>

      <Link to="/auth/login">Уже есть аккаунт? Логин</Link>
    </div>
  );
}
