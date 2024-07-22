import { useEffect, useMemo, useState } from "react";
import useGetCommandIf from "../hooks/If/useGetCommandIf";
import ButtonHoverPromptModal from "../../../../../shared/ButtonAsideHoverPromptModal/ButtonHoverPromptModal";
import plus from "../../../../../../assets/images/shared/add.png";
import commandImg from "../../../../../../assets/images/Editor/command.png";
import useCreateBlankCommandInsideIf from "../hooks/If/useCreateBlankCommandInsideIf";
import useGetAllPlotFieldCommandsByIfId from "../hooks/useGetAllPlotFieldCommandsByIfId";
import PlotfieldItem from "../PlotfieldItem";

type CommandIfFieldTypes = {
  plotFieldCommandId: string;
  command: string;
  topologyBlockId: string;
};

export default function CommandIfField({
  plotFieldCommandId,
  command,
  topologyBlockId,
}: CommandIfFieldTypes) {
  const [nameValue] = useState<string>(command ?? "If");

  const { data: commandIf } = useGetCommandIf({
    plotFieldCommandId,
  });
  const [commandIfId, setCommandIfId] = useState("");
  const createCommandinsideIf = useCreateBlankCommandInsideIf({
    topologyBlockId,
    commandIfId,
  });
  const createCommandInsideElse = useCreateBlankCommandInsideIf({
    topologyBlockId,
    commandIfId,
    isElse: true,
  });

  const { data: commands } = useGetAllPlotFieldCommandsByIfId({ commandIfId });

  const allCommandsInsideIfMemozied = useMemo(() => {
    const res = commands?.filter((c) => c.isElse === false) || [];
    return res;
  }, [commands]);

  const allCommandsInsideElseMemozied = useMemo(() => {
    const res = commands?.filter((c) => c.isElse === true) || [];
    return res;
  }, [commands]);

  useEffect(() => {
    if (commandIf) {
      setCommandIfId(commandIf._id);
    }
  }, [commandIf]);

  return (
    <div className="flex gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] flex-col">
      <div className="min-w-[10rem] flex-grow w-full relative flex items-center gap-[1rem]">
        <h3 className="text-[1.4rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-green-200 text-gray-600 cursor-default">
          {nameValue}
        </h3>
        <ButtonHoverPromptModal
          contentName="Создать строку"
          positionByAbscissa="left"
          className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-green-200"
          asideClasses="text-[1.3rem] translate-x-1/4 -translate-y-2/3"
          onClick={() => createCommandinsideIf.mutate()}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 translate-x-1/2 right-[0rem] bottom-0 z-[2]"
          />
          <img src={commandImg} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </div>
      <ul className="flex flex-col gap-[1rem] w-full bg-green-200 rounded-md">
        {allCommandsInsideIfMemozied?.map((p) => (
          <PlotfieldItem key={p._id} {...p} />
        ))}
      </ul>
      <div className="min-w-[10rem] flex-grow w-full relative flex items-center gap-[1rem]">
        <h3 className="text-[1.4rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-neutral-magnolia text-gray-700 cursor-default">
          Else
        </h3>
        <ButtonHoverPromptModal
          contentName="Создать строку"
          positionByAbscissa="left"
          className="shadow-sm shadow-gray-400 active:scale-[.99] relative bg-neutral-magnolia z-[2]"
          asideClasses="text-[1.3rem] translate-x-1/4 -translate-y-2/3"
          onClick={() => createCommandInsideElse.mutate()}
          variant="rectangle"
        >
          <img
            src={plus}
            alt="+"
            className="w-[1.5rem] absolute translate-y-1/2 translate-x-1/2 right-[0rem] bottom-0"
          />
          <img src={commandImg} alt="Commands" className="w-[3rem]" />
        </ButtonHoverPromptModal>
      </div>
      <ul className="flex flex-col gap-[1rem] w-full bg-neutral-magnolia rounded-md">
        {allCommandsInsideElseMemozied?.map((p) => (
          <PlotfieldItem key={p._id} {...p} />
        ))}
      </ul>
    </div>
  );
}
