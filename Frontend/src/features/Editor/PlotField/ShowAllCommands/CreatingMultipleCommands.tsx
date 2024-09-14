import { useState } from "react";
import addCommand from "../../../../assets/images/Editor/addCommand.png";
import minusCommand from "../../../../assets/images/Editor/minusCommand.png";
import plusCommand from "../../../../assets/images/Editor/plusCommand.png";
import cross from "../../../../assets/images/Editor/cross.png";

type CreatingMultipleCommandsTypes = {
  setAllCommandsToCreate: React.Dispatch<React.SetStateAction<string[]>>;
  pc: string;
};

export default function CreatingMultipleCommands({
  setAllCommandsToCreate,
  pc,
}: CreatingMultipleCommandsTypes) {
  const [amountOfCommands, setAmountOfCommands] = useState(0);
  const [
    showAmountOfCommandsWillBeCreated,
    setShowAmountOfCommandsWillBeCreated,
  ] = useState(false);

  return (
    <form
      className="self-end"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button
        type="button"
        onClick={() => {
          setAmountOfCommands(1);
          setAllCommandsToCreate((prev) => {
            return [...prev, pc];
          });
          setShowAmountOfCommandsWillBeCreated(true);
        }}
        className={`${
          showAmountOfCommandsWillBeCreated ? "hidden" : ""
        } shadow-md rounded-full outline-white`}
      >
        <img src={addCommand} alt="+" className="w-[2.8rem]" />
      </button>
      <div
        className={`flex gap-[2rem] ${
          showAmountOfCommandsWillBeCreated ? "" : "hidden"
        }`}
      >
        <div className="flex gap-[.5rem]">
          <button
            type="button"
            onClick={() => {
              setAmountOfCommands((prev) => {
                if (prev - 1 === 0) {
                  setShowAmountOfCommandsWillBeCreated(false);
                  return 0;
                } else {
                  return prev - 1;
                }
              });

              setAllCommandsToCreate((prev) => {
                const index = prev.lastIndexOf(pc);
                if (index !== -1) {
                  const newCommands = [...prev];
                  newCommands.splice(index, 1);
                  return newCommands;
                } else {
                  return prev;
                }
              });
            }}
            className="shadow-md outline-white"
          >
            <img src={minusCommand} alt="-" className="w-[2.8rem]" />
          </button>
          <div className="shadow-md outline-white h-full min-w-[2.8rem] text-center">
            <h3 className="text-[1.7rem]">{amountOfCommands}</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setAmountOfCommands((prev) => prev + 1);
              setAllCommandsToCreate((prev) => {
                return [...prev, pc];
              });
            }}
            className="shadow-md outline-white"
          >
            <img src={plusCommand} alt="+" className="w-[2.8rem]" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowAmountOfCommandsWillBeCreated(false);
            setAmountOfCommands(0);
            setAllCommandsToCreate((prev) => {
              return prev.filter((p) => p !== pc);
            });
          }}
          className="shadow-md rounded-full outline-white"
        >
          <img src={cross} alt="X" className="w-[2.8rem]" />
        </button>
      </div>
    </form>
  );
}
