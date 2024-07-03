import { Outlet } from "react-router-dom";
import DivBgColor from "../features/shared/utilities/DivBgColor";

export default function AuthLayout() {
  return (
    <>
      <DivBgColor bgColor="bg-neutral-magnolia" />
      <Outlet />
    </>
  );
}
