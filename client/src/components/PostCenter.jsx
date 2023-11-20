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
import { Link } from "react-router-dom";

export default function PostCenter() {
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]);
  const { currentUser, theme } = useSelector((state) => state.user);
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
              // console.log("URL retrieved:", downloadURL)
              const uploadedUrls = downloadURL;
              setUploadedImages(uploadedUrls);
            }
          })
          .catch((downloadError) => {
            // Handle download URL retrieval error
            console.error("Download URL error:", downloadError);
          });
      }
    );
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const maxWidth = 480;
          const maxHeight = 320;

          // Calculate the new dimensions while maintaining aspect ratio
          let newWidth, newHeight;
          if (img.width > img.height) {
            newWidth = maxWidth;
            newHeight = (img.height / img.width) * maxWidth;
          } else {
            newHeight = maxHeight;
            newWidth = (img.width / img.height) * maxHeight;
          }

          // Create a canvas and draw the image with the new dimensions
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Convert the canvas content back to a data URL
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            file.type,
            0.7 // Adjust compression quality if needed
          );
        };

        img.onerror = () => {
          reject(new Error("Failed to load the image"));
        };
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        const compressedImages = await Promise.all(
          acceptedFiles.map(async (file) => {
            const compressedBlob = await compressImage(file);
            const compressedFile = new File([compressedBlob], file.name, {
              type: compressedBlob.type,
            });
            return compressedFile;
          })
        );
        // Now you can send the compressed images to the handleUpload function
        handleUpload(compressedImages);
      } catch (error) {
        console.error("Error compressing images:", error);
      }
    },
    [handleUpload]
  );

  console.log(uploadedImages);

  // const onDrop = useCallback((acceptedFiles) => {
  //   handleUpload(acceptedFiles);
  // }, []);

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

  return (
    <div
      className={`flex flex-col bg-${theme}-secondary rounded-lg w-[90%] m-auto lg:w-[540px] h-fit py-7 shadow-lg mt-10 mb-7`}
      // style={{ background: "#B0D9B1" }}
    >
      <div className="flex flex-row px-3 gap-3 md:px-7 align-middle items-center">
        <div className="w-20 h-15 rounded-full">
          <Link to={"/profile"}>
            <img
              src={currentUser.picturePath}
              alt="img"
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
            />
          </Link>
        </div>

        <div
          className={`bg-${theme}-contrasting text-dark-primary p-2 rounded-full w-full`}
          // style={{ background: "#ECE3CE" }}
        >
          <input
            type="text"
            placeholder="what's on your mind"
            className="bg-transparent focus:outline-none py-2 px-2 w-full"
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
              {isDragActive && imageupload ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
              {uploadedImages.length > 0 && (
                <img
                  src={uploadedImages}
                  alt={`Uploaded ${uploadedImages.length}`}
                  className="max-h-full max-w-full"
                />
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
          className={`bg-${theme}-primary text-${theme}-tertiary px-3 py-1 rounded-2xl align-middle uppercase`}
          style={
            {
              // background: "#79AC78",
            }
          }
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
