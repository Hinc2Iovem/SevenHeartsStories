import { Link } from "react-router-dom";
import back from "../../assets/images/shared/back.png";
import logout from "../../assets/images/shared/logout.png";
import ProfileLeftSide from "./ProfileLeftSide";
import ProfileRightSide from "./ProfileRightSide";

export default function Profile() {
  return (
    <section className="max-w-[146rem] px-[1rem] mx-auto flex sm:flex-row flex-col gap-[3rem] py-[5rem] relative items-center sm:items-start">
      <Link to={"/stories"} className="absolute top-[1rem] left-[1rem]">
        <img src={back} alt="Back" className="w-[3rem]" />
      </Link>
      <button className="absolute top-[1rem] right-[1rem]">
        <img src={logout} alt="Logout" className="w-[3rem]" />
      </button>
      <ProfileLeftSide />
      <ProfileRightSide />
    </section>
  );
}
