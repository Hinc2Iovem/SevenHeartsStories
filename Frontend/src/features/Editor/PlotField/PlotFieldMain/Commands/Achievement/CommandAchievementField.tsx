import { useEffect, useState } from "react";
import useGetCommandAchievement from "../hooks/Achievement/useGetCommandAchievement";
import useGetTranslationAchievementEnabled from "../hooks/Achievement/useGetTranslationAchievementEnabled";
import useDebounce from "../../../../../../hooks/utilities/useDebounce";
import useUpdateAchievementText from "../hooks/Achievement/useUpdateAchievementText";

type CommandAchievementFieldTypes = {
  plotFieldCommandId: string;
  command: string;
};

export default function CommandAchievementField({
  plotFieldCommandId,
  command,
}: CommandAchievementFieldTypes) {
  const [nameValue] = useState(command ?? "achievement");
  const [textValue, setTextValue] = useState("");

  const { data: commandAchievement } = useGetCommandAchievement({
    plotFieldCommandId,
  });
  const [commandAchievementId, setCommandAchievementId] = useState("");

  useEffect(() => {
    if (commandAchievement) {
      setCommandAchievementId(commandAchievement._id);
    }
  }, [commandAchievement]);

  const { data: translatedAchievement } = useGetTranslationAchievementEnabled({
    achievementId: commandAchievementId,
  });

  useEffect(() => {
    if (translatedAchievement) {
      translatedAchievement.forEach((ac) => {
        if (ac.textFieldName === "achievementName") {
          setTextValue(ac.text);
        }
      });
    }
  }, [translatedAchievement]);

  const debouncedValue = useDebounce({ value: textValue, delay: 500 });

  const updateAchievementText = useUpdateAchievementText({
    achievementId: commandAchievementId,
    achievementName: debouncedValue,
  });

  useEffect(() => {
    if (debouncedValue?.trim().length) {
      updateAchievementText.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
          value={textValue}
          type="text"
          className=" w-full outline-gray-300 text-gray-600 text-[1.6rem] px-[1rem] py-[.5rem] rounded-md shadow-md sm:max-h-[20rem] max-h-[40rem]"
          placeholder="Such a lovely day"
          onChange={(e) => setTextValue(e.target.value)}
        />
      </form>
    </div>
  );
}
