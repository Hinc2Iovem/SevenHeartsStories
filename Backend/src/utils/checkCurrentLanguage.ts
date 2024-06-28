import createHttpError from "http-errors";
import { Languages } from "../consts/LANGUAGES";

export const checkCurrentLanguage = ({
  currentLanguage,
}: {
  currentLanguage: string;
}) => {
  if (!Languages.includes(currentLanguage.toLowerCase())) {
    throw createHttpError(
      400,
      `App currently only supports these languages: ${Languages.map((l) => l)}`
    );
  }
};
