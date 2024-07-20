import { useEffect, useState } from "react";
import useGetCommandGetItem from "../hooks/GetItem/useGetCommandGetItem";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import useGetCommandGetItemTranslation from "../hooks/GetItem/useGetCommandGetItemTranslation";
import useUpdateGetItemTranslationText from "../hooks/GetItem/useUpdateGetItemTranslationText";

type CommandGetItemFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandGetItemField({
  plotFieldCommandId,
  command,
}: CommandGetItemFieldTypes) {
  const [nameValue] = useState<string>(command ?? "GetItem");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const [commandGetItemId, setCommandGetItemId] = useState("");

  const { data: commandGetItem } = useGetCommandGetItem({
    plotFieldCommandId,
  });
  const { data: translatedGetItem } = useGetCommandGetItemTranslation({
    getItemId: commandGetItemId ?? "",
  });

  const updateGetItemTranslationTexts = useUpdateGetItemTranslationText({
    getItemId: commandGetItemId ?? "",
    buttonText,
    itemDescription,
    itemName,
  });

  useEffect(() => {
    if (commandGetItem) {
      setCommandGetItemId(commandGetItem._id);
    }
  }, [commandGetItem]);

  useEffect(() => {
    if (translatedGetItem) {
      translatedGetItem.map((tgi) => {
        if (tgi.textFieldName === "itemDescription") {
          setItemDescription(tgi.text);
        } else if (tgi.textFieldName === "itemName") {
          setItemName(tgi.text);
        } else if (tgi.textFieldName === "buttonText") {
          setButtonText(tgi.text);
        }
      });
    }
  }, [translatedGetItem]);

  const debouncedItemNameValue = useDebounce({ value: itemName, delay: 500 });
  const debouncedItemDescriptionValue = useDebounce({
    value: itemDescription,
    delay: 500,
  });
  const debouncedButtonTextValue = useDebounce({
    value: buttonText,
    delay: 500,
  });

  useEffect(() => {
    if (
      debouncedItemNameValue?.trim().length ||
      debouncedItemDescriptionValue?.trim().length ||
      debouncedButtonTextValue?.trim().length
    ) {
      updateGetItemTranslationTexts.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedItemNameValue,
    debouncedItemDescriptionValue,
    debouncedButtonTextValue,
  ]);

  return (
    <div className="flex flex-wrap gap-[1rem] w-full bg-primary-light-blue rounded-md p-[.5rem] sm:flex-row flex-col">
      <div className="sm:w-[20%] min-w-[10rem] flex-grow w-full relative">
        <h3 className="text-[1.3rem] text-start outline-gray-300 w-full capitalize px-[1rem] py-[.5rem] rounded-md shadow-md bg-white cursor-default">
          {nameValue}
        </h3>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="sm:w-[77%] flex-grow w-full flex flex-col gap-[1rem]"
      >
        <input
          value={itemName}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md"
          placeholder="Название"
          onChange={(e) => setItemName(e.target.value)}
        />
        <textarea
          value={itemDescription}
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Описание"
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input
          value={buttonText}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md"
          placeholder="Текст Кнопки"
          onChange={(e) => setButtonText(e.target.value)}
        />
      </form>
    </div>
  );
}
