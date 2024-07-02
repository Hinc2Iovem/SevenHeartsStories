import { Outlet } from "react-router-dom";
import DivBgColor from "../features/shared/utilities/DivBgColor";

export default function CharacterLayout() {
  return (
    <>
      <DivBgColor bgColor="bg-neutral-magnolia" />
      <Outlet />
    </>
  );
}
