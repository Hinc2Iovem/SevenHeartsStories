import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import plus from "../../../assets/images/shared/add.png";

type PreviewImage = {
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  imagePreview: string | ArrayBuffer | null;
  divClasses?: string;
  children?: React.ReactNode;
};

export default function PreviewImage({
  setPreview,
  imagePreview,
  divClasses,
  children,
}: PreviewImage) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = new FileReader();

      file.onload = function () {
        setPreview(file.result);
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
    [setPreview]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer ${divClasses ? divClasses : ""}`}
    >
      <input type="file" name="Image" id="image" {...getInputProps()} />
      <img
        src={imagePreview ? (imagePreview as string) : plus}
        alt="addImage"
        className={`${
          imagePreview
            ? "w-full h-full object-cover rounded-md absolute top-0 bottom-0 left-0 right-0 border-[2px] border-white"
            : "absolute w-[5.5rem] h-[5.5rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        }`}
      />
      {children ? children : ""}
    </div>
  );
}
