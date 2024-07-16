import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { axiosCustomized } from "../../../../../../../../api/axios";
import useOutOfModal from "../../../../../../../../hooks/UI/useOutOfModal";
import { CommandSayVariationTypes } from "../../../../../../../../types/StoryEditor/PlotField/Say/SayTypes";
import useUpdateCommandSayText from "../../../hooks/Say/useUpdateCommandSayText";
import { TranslationCommandTypes } from "../../../../../../../../types/Additional/TranslationTypes";
import useDebounce from "../../../../../../../../hooks/utilities/useDebounce";

type CommandSayFieldItemTypes = {
  nameValue: string;
  plotFieldCommandId: string;
  plotFieldCommandSayId: string;
};

const CommandSayPossibleUpdateVariations = ["author", "hint", "notify"];

export default function CommandSayFieldItem({
  nameValue,
  plotFieldCommandId,
  plotFieldCommandSayId,
}: CommandSayFieldItemTypes) {
  const [textValue, setTextValue] = useState("");

  const debouncedValue = useDebounce({ value: textValue, delay: 500 });

  const { data: commandSayText } = useQuery({
    queryKey: ["translation", "command", "say", plotFieldCommandSayId, "text"],
    queryFn: async () =>
      await axiosCustomized
        .get<TranslationCommandTypes[]>(
          `/translations/plotFieldCommands/say/${plotFieldCommandSayId}?currentLanguage=russian`
        )
        .then((r) => r.data),
    enabled: !!plotFieldCommandSayId,
  });

  useEffect(() => {
    if (commandSayText) {
      commandSayText.map((cst) => {
        if (cst.textFieldName === "sayText") {
          setTextValue(cst.text);
        }
      });
    }
  }, [commandSayText]);

  const queryClient = useQueryClient();
  const [showUpdateNameModal, setShowUpdateNameModal] = useState(false);

  const updateNameModalRef = useRef<HTMLDivElement | null>(null);
  const updateCommandSayNameValue = useMutation({
    mutationFn: async (type: CommandSayVariationTypes) =>
      await axiosCustomized.patch(
        `/plotFieldCommands/say/${plotFieldCommandSayId}/type`,
        {
          type,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plotfieldComamnd", plotFieldCommandId, "say"],
        exact: true,
        type: "active",
      });
    },
  });

  useOutOfModal({
    modalRef: updateNameModalRef,
    setShowModal: setShowUpdateNameModal,
    showModal: showUpdateNameModal,
  });

  const updateCommandSayText = useUpdateCommandSayText({
    commandSayId: plotFieldCommandSayId,
    textValue,
  });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      updateCommandSayText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowUpdateNameModal(true);
          }}
          className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default"
        >
          {nameValue}
        </button>
        <aside
          ref={updateNameModalRef}
          className={`${
            showUpdateNameModal ? "" : "hidden"
          } bg-white w-full translate-y-[.5rem] rounded-md shadow-md absolute z-10`}
        >
          <ul>
            {CommandSayPossibleUpdateVariations.map((pv) => {
              return (
                <li
                  key={pv}
                  onClick={() => {
                    updateCommandSayNameValue.mutate(
                      pv as CommandSayVariationTypes
                    );
                    setShowUpdateNameModal(false);
                  }}
                  className={`${
                    pv === nameValue ? "hidden" : ""
                  } rounded-md capitalize text-[1.3rem] text-gray-700 hover:text-white transition-all p-[1rem] cursor-pointer hover:bg-primary-pastel-blue`}
                >
                  {pv}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <form className="sm:w-[77%] flex-grow w-full">
        <textarea
          value={textValue}
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Such a lovely day"
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
