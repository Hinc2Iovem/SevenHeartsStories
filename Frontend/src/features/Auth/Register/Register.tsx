import { useState } from "react";
import Sidebar from "../Sidebar";
import RegisterFormFirstPage from "./RegisterFormFirstPage";
import RegisterFormSecondPage from "./RegisterFormSecondPage";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosCustomized } from "../../../api/axios";

export default function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("scriptwriter");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || "/stories";

  const canSubmit = [login, password, secretKey].every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      console.log("Can't submit now");
      return;
    }
    try {
      const res = await axiosCustomized.post("/staff", {
        username: login,
        password,
        key: secretKey,
      });
      localStorage.setItem("staffId", res.data?._id);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          console.log("No Serve Response");
        } else if (error.response?.status === 400) {
          console.log("Username or Password is missing");
        } else if (error.response?.status === 401) {
          console.log("Wrong Username or Password");
        } else {
          console.log("Something Went Wrong");
        }
      }
    }
  };
  // for disabled
  return (
    <section className="md:h-screen w-screen flex md:items-center justify-center">
      <main className="w-full max-w-[80rem] md:max-w-[70rem] md:mx-[1rem] md:bg-white flex md:flex-row flex-col overflow-x-hidden shadow-sm md:rounded-md">
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <form
          onSubmit={handleSubmit}
          className="md:h-full p-[1rem] w-3/4 mx-auto md:bg-transparent bg-white md:relative absolute md:top-0 md:left-auto md:translate-x-0 top-[5rem] left-1/2 -translate-x-1/2"
        >
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
            canSubmit={canSubmit}
          />
        </form>
      </main>
    </section>
  );
}
