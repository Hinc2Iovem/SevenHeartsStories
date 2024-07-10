import { useState } from "react";
import EmotionHeader from "./EmotionHeader/EmotionHeader";
import EmotionItem from "./EmotionItem";
import useGetAllEmotionsByCharacterId from "../../hooks/Fetching/CharacterEmotion/useGetAllEmotionsByCharacterId";

export default function Emotion() {
  const [characterId, setCharacterId] = useState("");

  const { data: characterEmotions } = useGetAllEmotionsByCharacterId({
    characterId,
  });

  return (
    <section className="max-w-[146rem] mx-auto p-[1rem]">
      <EmotionHeader
        characterId={characterId}
        setCharacterId={setCharacterId}
      />
      <main className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-[1rem] justify-items-center justify-center w-full mt-[2rem]">
        {characterEmotions
          ? characterEmotions?.map((ce) => <EmotionItem key={ce._id} {...ce} />)
          : null}
      </main>
    </section>
  );
}
