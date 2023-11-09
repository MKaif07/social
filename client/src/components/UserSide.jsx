import { useSelector } from "react-redux";
import { BiUserCircle } from "react-icons/bi";
import { FaLocationDot, FaSuitcase, FaTwitter } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import FriendBar from "./FriendBar";
export default function UserSide() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div
        className="md:block lg:block w-[90%] mx-auto lg:w-[352px] h-fit py-3 shadow-lg my-5 md:my-10 rounded-lg"
        style={{ background: "#B0D9B1" }}
      >
        <FriendBar
          userPicture={currentUser.picturePath}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          subtitle={`${currentUser.friends.length} friends`}
        />
        <hr className="mx-4 my-3" />
        <div className="flex flex-col ">
          <div className="flex flex-row justify-start gap-3 px-5 items-center">
            <FaLocationDot />
            <p>{currentUser.location}</p>
          </div>
          <div className="flex flex-row justify-start gap-3 px-5 items-center">
            <FaSuitcase />
            <p>{currentUser.occupation}</p>
          </div>
        </div>
        <hr className="mx-4 my-3" />
        <div className="flex flex-col text-sm">
          <div className="flex flex-row justify-between px-5 gap-3">
            <p>Who's viewed your profile</p>
            <p>{currentUser.viewedProfile}</p>
          </div>
          <div className="flex flex-row justify-between px-5 gap-3">
            <p>impression</p>
            <p>{currentUser.impressions}</p>
          </div>
        </div>
        <hr className="mx-4 my-3" />
        <div className="justify-around">
          <h1 className="px-5 text-lg font-semibold">Social Profiles</h1>
          <div className="flex justify-between cursor-pointer ">
            <div className="flex items-center">
              <div className="px-5 my-2">
                <FaTwitter size={30} className="" />
              </div>
              <div className="flex flex-col my-2 align-middle ">
                <div className="text-md">Twitter</div>{" "}
                <div className="text-sm">Social Network</div>
              </div>
            </div>

            <div className="px-5 my-2">
              <FiEdit2 size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
