import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  udpateUserFail,
  udpateUserStart,
  udpateUserSuccess,
} from "../redux/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error, theme } = useSelector(
    (state) => state.user
  );
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(`Upload is ${progress}% done`);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, picturePath: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(udpateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(udpateUserFail(data.message));
        return;
      }
      dispatch(udpateUserSuccess(data));
    } catch (error) {
      // console.log('ewwww!');
      dispatch(udpateUserFail(error.message));
    }
  };

  const handleDeleteUser = async () => {};

  const handleSignOut = async () => {
    console.log("signing out");
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      console.log("signing out");
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <div className={`bg-${theme}-primary text-${theme}-tertiary `}>
      <div className={`p-3 max-w-lg mx-auto`}>
        <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />

          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={formData?.picturePath || currentUser.picturePath}
            alt="profile"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image Upload(image must be less than 5 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="firstName"
            placeholder="firstName"
            id="firstName"
            defaultValue={currentUser.firstName}
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <input
            type="lastName"
            placeholder="lastName"
            id="lastName"
            defaultValue={currentUser.lastName}
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="location"
            id="location"
            defaultValue={currentUser.location}
            // className="border p-3 rounded-lg"
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="occupation"
            id="occupation"
            defaultValue={currentUser.occupation}
            // className="border p-3 rounded-lg"
            className="bg-transparent placeholder-current focus:outline-none p-2 mb-2 border-2 border-dashed focus:border-solid"
            style={{ borderColor: "#618264" }}
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "loading..." : "update"}
          </button>
        </form>

        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign out
          </span>
        </div>
        {error && <p className="text-red-700 mt-5"> {error}</p>}
        {updateSuccess && (
          <p className="text-green-700 mt-5">User Updated Succesfully</p>
        )}
      </div>
    </div>
  );
}
