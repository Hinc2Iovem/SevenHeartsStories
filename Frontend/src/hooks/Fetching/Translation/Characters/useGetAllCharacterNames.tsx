import { UseQueryResult } from "@tanstack/react-query";
import { TranslationCharacterTypes } from "../../../../types/Additional/TranslationTypes";
import { useMemo } from "react";

type useGetAllCharacterNames = {
  translatedCharacters: UseQueryResult<TranslationCharacterTypes[], Error>[];
};

export default function useGetAllCharacterNames({
  translatedCharacters,
}: useGetAllCharacterNames) {
  return useMemo(() => {
    const res: string[] = [];
    if (translatedCharacters) {
      translatedCharacters.forEach((tc) => {
        tc.data?.forEach((t) => {
          if (t.textFieldName === "characterName") {
            res.push(t.text.toLowerCase());
          }
        });
      });
    }
    return res;
  }, [translatedCharacters]);
}
