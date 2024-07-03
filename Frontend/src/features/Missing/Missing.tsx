import { useEffect, useState } from "react";
import DivBgColor from "../shared/utilities/DivBgColor";
import { useNavigate } from "react-router-dom";

export default function Missing() {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/stories", { replace: true });
    }
  }, [seconds, navigate]);
  return (
    <article>
      <DivBgColor />
      <h1 className="text-gray-700 text-[3.5rem] text-center">
        Page wasn't found
      </h1>
      <p className="text-[1.5rem]">You will be redirected in {seconds}</p>
    </article>
  );
}
