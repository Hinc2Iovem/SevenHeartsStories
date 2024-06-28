import createHttpError from "http-errors";
import { ChoiceOptionTypes } from "../consts/CHOICE_OPTION_TYPES";

export const checkChoiceOptionType = ({
  type,
}: {
  type: string | undefined;
}) => {
  if (type?.trim().length) {
    if (!ChoiceOptionTypes.includes(type.toLowerCase())) {
      throw createHttpError(
        400,
        `Unexpected type, possible types = ${ChoiceOptionTypes.map((c) => c)}`
      );
    }
  }
};
