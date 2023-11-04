import { GoImage, GoPaperclip, GoVideo } from "react-icons/go";
import { AiFillAudio } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function PostCenter() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className="flex flex-col rounded-lg w-[540px] h-[150px] py-7 shadow-lg mt-10 mb-7"
      style={{ background: "#B0D9B1" }}
    >
      <div className="flex flex-row px-7 gap-7 align-middle items-center rounded-xl">
        <img
          src={currentUser.picturePath}
          alt="img"
          className="w-14 h-15 rounded-full"
        />
        <div
          className="p-2 rounded-full w-full"
          style={{ background: "#ECE3CE" }}
        >
          <input
            type="text"
            placeholder="what's on your mind"
            className="bg-transparent focus:outline-none py-2 px-2"
          />
        </div>
      </div>
      <hr className="mx-4 my-3" />
      <div className="flex flex-row justify-around items-center">
        <div className="flex items-center gap-1">
          <span>
            <GoImage size={20} />
          </span>
          Image
        </div>
        <div className="flex items-center gap-1">
          <span>
            <GoVideo size={20} />
          </span>
          Clip
        </div>
        <div className="flex items-center gap-1">
          <span>
            <GoPaperclip size={20} />
          </span>
          Attachment
        </div>
        <div className="flex items-center gap-1">
          <span>
            <AiFillAudio size={20} />
          </span>
          Audio
        </div>
        <button
          className="px-3 py-1 rounded-2xl align-middle uppercase"
          style={{ background: "#79AC78" }}
        >
          post
        </button>
      </div>
    </div>
  );
}
