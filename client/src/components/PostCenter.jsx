import { GoImage, GoPaperclip, GoVideo } from "react-icons/go";
import { AiFillAudio } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  setNewPostFail,
  setNewPostStart,
  setNewPostSuccess,
  setPost,
} from "../redux/postSlice";

export default function PostCenter() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);

  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ userId: currentUser._id });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file[0].name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    // console.log("logging drop/selected file", file);

    uploadTask.on("state_changed", async () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData((prevState) => ({
          ...prevState,
          picturePath: downloadURL,
        }));
      });
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/.*": [".png", ".jpeg", ".jpg"],
    },
  });

  const handlePost = async (e) => {
    try {
      dispatch(setNewPostStart());
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newData = await res.json();
      dispatch(setNewPostSuccess(newData));
      setFormData({ userId: currentUser._id });
    } catch (error) {
      dispatch(setNewPostFail(error.message));
    }
  };

  return (
    <div
      className="flex flex-col rounded-lg w-[540px] h-fit py-7 shadow-lg mt-10 mb-7"
      style={{ background: "#B0D9B1" }}
    >
      {/* {progress && <h1 className="text-3xl text-red-700">{progress}</h1>} */}
      <div className="flex flex-row px-7 gap-7 align-middle items-center rounded-xl">
        <img
          src={currentUser.picturePath}
          alt="img"
          className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
        />
        <div
          className="p-2 rounded-full w-full"
          style={{ background: "#ECE3CE" }}
        >
          <input
            type="text"
            placeholder="what's on your mind"
            className="bg-transparent focus:outline-none py-2 px-2"
            id="description"
            onChange={handleChange}
          />
        </div>
      </div>
      {drop && (
        <div
          className={`h-${
            drop ? 28 : 0
          } w-11/12 border-dashed border-2 mx-auto my-4 p-2 transition-all items-center align-middle`}
        >
          {/* <Dropbox /> */}
          <div className="h-full w-full ">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
        </div>
      )}
      <hr className="mx-4 my-3" />
      <div className="flex flex-row justify-around items-center">
        <div
          onClick={() => setDrop(!drop)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span>
            <GoImage size={20} />
          </span>
          Image
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <span>
            <GoVideo size={20} />
          </span>
          Clip
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <span>
            <GoPaperclip size={20} />
          </span>
          Attachment
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <span>
            <AiFillAudio size={20} />
          </span>
          Audio
        </div>
        <button
          className="px-3 py-1 rounded-2xl align-middle uppercase"
          style={{ background: "#79AC78" }}
          type="button"
          onClick={handlePost}
        >
          post
        </button>
      </div>
    </div>
  );
}
