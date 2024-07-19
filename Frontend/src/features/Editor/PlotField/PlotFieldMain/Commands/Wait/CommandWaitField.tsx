import { useEffect, useState } from "react";
import useGetCommandWait from "../hooks/Wait/useGetCommandWait";
import useUpdateWaitText from "../hooks/Wait/useUpdateWaitText";

type CommandWaitFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandWaitField({
  plotFieldCommandId,
  command,
}: CommandWaitFieldTypes) {
  const [nameValue] = useState<string>(command ?? "Wait");
  const [waitValue, setWaitValue] = useState<number>(0);

  const { data: commandWait } = useGetCommandWait({
    plotFieldCommandId,
  });
  const [commandWaitId, setCommandWaitId] = useState("");

  useEffect(() => {
    if (commandWait) {
      setCommandWaitId(commandWait._id);
    }
  }, [commandWait]);

  useEffect(() => {
    if (commandWait?.waitValue) {
      setWaitValue(commandWait.waitValue);
    }
  }, [commandWait]);

  const updateWaitText = useUpdateWaitText({
    waitValue,
    waitId: commandWaitId,
  });

  useEffect(() => {
    if (waitValue) {
      updateWaitText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitValue]);

  console.log("waitValue: ", waitValue);

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="sm:w-[77%] flex-grow w-full"
      >
        <input
          value={waitValue || ""}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Such a lovely day"
          onChange={(e) => setWaitValue(+e.target.value)}
        />
      </form>
    </div>
  );
}
