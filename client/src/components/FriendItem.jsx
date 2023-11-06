import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function FriendItem({
  friendPicture,
  firstName,
  lastName,
  occupation,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const friends = currentUser.friends;

  console.log("friend: ", friendPicture);

  return (
    <div
      className="flex flex-row h-fit py-3 justify-between mx-auto w-11/12 rounded-xl align-middle items-center"
      style={{
        background: "#B0D9B1",
      }}
    >
      <div className="flex flex-row gap-4 align-middle items-center">
        <img src={friendPicture} alt="img" className="w-14 h-15 rounded-full" />
        <div className="text-sm cursor-pointer">
          <h1 className="font-semibold">{`${firstName} ${lastName}`}</h1>
          <p>{occupation}</p>
        </div>
      </div>
      <div
        className="flex rounded-full w-10 h-10 items-center justify-center cursor-pointer"
        style={{ backgroundColor: "#79AC78" }}
      >
        <BiUserMinus size={24} />
        {/* <BiUserPlus size={20} /> */}
      </div>
    </div>
  );
}
