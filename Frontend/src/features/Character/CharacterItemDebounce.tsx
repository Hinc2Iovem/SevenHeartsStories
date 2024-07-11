import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wardrobe from "../../assets/images/Story/wardrobe.png";
import useGetCharacterById from "../../hooks/Fetching/Character/useGetCharacterById";
import useGetTranslationCharacters from "../../hooks/Fetching/Translation/useGetTranslationCharacters";
import useUpdateImg from "../../hooks/Patching/useUpdateImg";
import { TranslationCharacterTypes } from "../../types/Additional/TranslationTypes";
import PreviewImage from "../shared/utilities/PreviewImage";
import CharacterItemMainHero from "./CharacterMainHero";

export default function CharacterItemDebounce({
  characterId,
}: TranslationCharacterTypes) {
  const { data: character } = useGetCharacterById({ characterId });

  const { data: translationCharacter } = useGetTranslationCharacters({
    characterId,
  });

  const [isFrontSide, setIsFrontSide] = useState(true);
  const [characterName, setCharacterName] = useState("");
  const [characterUnknownName, setCharacterUnknownName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");

  useEffect(() => {
    if (translationCharacter) {
      translationCharacter.map((tc) => {
        if (tc.textFieldName === "characterName") {
          setCharacterName(tc.text);
        } else if (tc.textFieldName === "characterDescription") {
          setCharacterDescription(tc.text);
        } else if (tc.textFieldName === "characterUnknownName") {
          setCharacterUnknownName(tc.text);
        }
      });
    }
  }, [translationCharacter]);

  return (
    <>
      {character?.type === "maincharacter" ? (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemMainHero
            img={character?.img}
            characterId={characterId}
            characterName={characterName}
            isFrontSide={isFrontSide}
          />
        </article>
      ) : character?.type === "minorcharacter" ? (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemMinor
            img={character?.img}
            characterId={characterId}
            nameTag={character?.nameTag ?? ""}
            characterName={characterName}
            characterDescription={characterDescription}
            characterUnknownName={characterUnknownName}
            isFrontSide={isFrontSide}
          />
        </article>
      ) : (
        <article
          onClick={() => setIsFrontSide((prev) => !prev)}
          className={`${
            isFrontSide ? "hover:scale-[1.01]" : ""
          } cursor-pointer flex flex-col rounded-md bg-white w-full h-[30rem] border-[2px] border-dashed border-gray-300 relative`}
        >
          <CharacterItemEmpty
            img={character?.img}
            characterId={characterId}
            characterName={characterName}
            isFrontSide={isFrontSide}
          />
        </article>
      )}
    </>
  );
}

type CharacterItemMinorTypes = {
  characterName: string;
  characterDescription: string;
  characterUnknownName: string;
  isFrontSide: boolean;
  nameTag: string;
  img?: string;
  characterId: string;
};

function CharacterItemMinor({
  isFrontSide,
  characterDescription,
  characterName,
  nameTag,
  img,
  characterId,
  characterUnknownName,
}: CharacterItemMinorTypes) {
  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const uploadImgMutation = useUpdateImg({
    id: characterId,
    path: "/characters",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      uploadImgMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  return (
    <>
      {isFrontSide ? (
        <>
          {img ? (
            <div className="w-full h-full rounded-t-md relative shadow-sm">
              <img
                src={img}
                alt="StoryBackground"
                className="object-cover w-full h-full cursor-pointer rounded-t-md border-[3px] border-b-0 border-white"
              />
            </div>
          ) : (
            <PreviewImage
              imgClasses="w-full h-full object-cover rounded-md absolute top-0 bottom-0 left-0 right-0 border-[2px] border-b-0 rounded-b-none border-white"
              imagePreview={imagePreview}
              setPreview={setPreview}
            />
          )}
          <div className="w-full rounded-b-md bg-neutral-alabaster p-[1rem] absolute bottom-0 text-[1.5rem] shadow-sm border-t-[1px] border-gray-300 rounded-t-md shadow-gray-600">
            {characterName.length > 30
              ? characterName.substring(0, 30) + "..."
              : characterName}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[1rem] justify-between h-full">
          <div className="gap-[1rem] flex flex-col">
            <div>
              <h3 className="text-[2rem]">Имя: {characterName}</h3>
              <p className="text-[1.35rem]">
                Имя(Незнакомец) : {characterUnknownName}
              </p>
              <p className="text-[1.3rem]">НеймТаг {nameTag}</p>
            </div>
            <p className="text-[1.1rem] text-gray-600">
              Описание: {characterDescription}
            </p>
          </div>

          <div className="flex gap-[1rem] flex-wrap">
            <Link className="ml-auto" to="/wardrobes">
              <button className=" bg-white shadow-md p-[.5rem] rounded-md active:scale-[0.99] hover:scale-[1.01] ">
                <img src={wardrobe} alt="Wardrobe" className="w-[3rem]" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

type CharacterItemEmptyTypes = {
  characterName: string;
  isFrontSide: boolean;
  characterId: string;
  img?: string;
};

function CharacterItemEmpty({
  isFrontSide,
  characterId,
  img,
  characterName,
}: CharacterItemEmptyTypes) {
  const [imagePreview, setPreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const uploadImgMutation = useUpdateImg({
    id: characterId,
    path: "/characters",
    preview: imagePreview,
  });

  useEffect(() => {
    if (imagePreview) {
      uploadImgMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePreview]);

  return (
    <>
      {isFrontSide ? (
        <>
          {img ? (
            <div className="w-full h-full rounded-t-md relative shadow-sm">
              <img
                src={img}
                alt="StoryBackground"
                className="object-cover w-full h-full cursor-pointer rounded-t-md border-[3px] border-b-0 border-white"
              />
            </div>
          ) : (
            <PreviewImage
              imgClasses="w-full h-full bg-neutral-alabaster object-cover rounded-md border-[2px] border-b-0 rounded-b-none border-white"
              divClasses="bg-neutral-alabaster w-full h-full relative"
              imagePreview={imagePreview}
              setPreview={setPreview}
            />
          )}
          <div className="w-full rounded-b-md bg-neutral-alabaster p-[1rem] text-[1.5rem] shadow-sm border-t-[1px] border-gray-300 rounded-t-md shadow-gray-600">
            {characterName.length > 30
              ? characterName.substring(0, 30) + "..."
              : characterName}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1rem] p-[1rem] h-full">
          <h3 className="text-[2rem]">{characterName}</h3>
        </div>
      )}
    </>
  );
}
