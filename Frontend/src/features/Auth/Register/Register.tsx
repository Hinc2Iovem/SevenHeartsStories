import { useState } from "react";
import Sidebar from "../Sidebar";
import RegisterFormFirstPage from "./RegisterFormFirstPage";
import RegisterFormSecondPage from "./RegisterFormSecondPage";

export default function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("scriptwriter");
  // for disabled bg-primary-light-blue
  return (
    <section className="md:h-screen w-screen flex md:items-center justify-center">
      <main className="w-full max-w-[60rem] md:mx-[1rem] md:bg-white flex md:flex-row flex-col md:h-[30rem] overflow-x-hidden shadow-sm rounded-md">
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <form className="md:h-full p-[1rem] w-3/4 mx-auto md:bg-transparent bg-white md:relative absolute md:top-0 md:left-auto md:translate-x-0 top-[5rem] left-1/2 -translate-x-1/2">
          <RegisterFormFirstPage
            login={login}
            password={password}
            secretKey={secretKey}
            setLogin={setLogin}
            setPassword={setPassword}
            setSecretKey={setSecretKey}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <RegisterFormSecondPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            role={role}
            setRole={setRole}
          />
        </form>
      </main>
    </section>
  );
}
