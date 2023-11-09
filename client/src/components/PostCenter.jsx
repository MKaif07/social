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
import { validator } from "../utils/Validator";

export default function PostCenter() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [drop, setDrop] = useState(false);

  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ userId: currentUser._id });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file[0].name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking logic
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress.toFixed(2)}%`);
      },
      (error) => {
        // Handle errors here
        console.error("Upload error:", error);
      },
      () => {
        // Upload complete logic
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            if (downloadURL) {
              setFormData((prevState) => ({
                ...prevState,
                picturePath: downloadURL,
              }));
              console.log("URL retrieved:", downloadURL);
            }
          })
          .catch((downloadError) => {
            // Handle download URL retrieval error
            console.error("Download URL error:", downloadError);
          });
      }
    );
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
    const validated = validator(formData);
    if (Object.keys(validated).length < 2) {
      console.log("atleast add desc or a picture");
      return;
    }

    document.getElementById("description").value = "";

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div
      className="flex flex-col rounded-lg w-[90%] m-auto lg:w-[540px] h-fit py-7 shadow-lg mt-10 mb-7"
      style={{ background: "#B0D9B1" }}
    >
      <div className="flex flex-row px-3 gap-3 md:px-7 md:gap-7 align-middle items-center rounded-xl">
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

        <div className="hidden lg:flex items-center gap-1 cursor-pointer">
          <span>
            <GoPaperclip size={20} />
          </span>
          Attachment
        </div>
        <div className="hidden lg:flex items-center gap-1 cursor-pointer">
          <span>
            <AiFillAudio size={20} />
          </span>
          Audio
        </div>

        <button
          className="px-3 py-1 rounded-2xl align-middle uppercase"
          style={{
            background: "#79AC78",
          }}
          // style={{
          // background:
          //   Object.keys(formData).length < 2 ? "rgb(239, 68, 68)" : "#79AC78",
          //   cursor:
          //     Object.keys(formData).length < 2 ? "not-allowed" : "pointer",
          //   color: Object.keys(formData).length < 2 ? "white" : "inherit",
          // }}
          type="submit"
          onClick={handlePost}
          // disabled={Object.keys(formData).length < 2}
        >
          post
        </button>
      </div>
    </div>
  );
}
