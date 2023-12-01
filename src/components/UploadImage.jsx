import "./css/UploadImage.css";
import { useState, useEffect, useContext } from "react";
import { storage, db } from "../firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import ImageGallery from "./ImageGallery";
import ScreenUploader from "./ScreenUploader";

/**
 * Includes box for image upload and image gallery below it
 *
 * TODO: move image gallery to Home
 * @returns view
 */
const UploadImage = () => {
  // image file to upload
  const [imageUpload, setImageUpload] = useState(null);
  // list of images displayed on the webpage
  const [imageList, setImageList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [blur, setBlur] = useState(true);
  const navigate = useNavigate();

  // callback from ScreenUploader
  const uploadCallBack = (dataPNG, caption) => {
    uploadImage(dataPNG, caption);
  };

  // checks if one day has passed.
  const hasOneDayPassed = () => {
    const date = new Date().toLocaleDateString();
    if (localStorage.yourapp_date === date) return false;
    localStorage.yourapp_date = date;
    return true;
  };

  // some function which should run once a day
  const runOncePerDay = () => {
    console.log(
      "The day is",
      localStorage.yourapp_date,
      new Date().toLocaleDateString()
    );
    if (!hasOneDayPassed()) return false;

    setCerealTime();
    // alert("CeReal time set at", cerealTime);
  };

  const setCerealTime = () => {
    const oneDay = 86400000;
    const tenSeconds = 120 * 1000;
    const randomTime = Math.floor(Math.random() * tenSeconds);
    setTimeout(() => {
      // Your code to be executed at the random time
      console.log("Code executed at random time:", new Date());
      alert("BeReal time!");

      // Repeat the process for the next day
      setCerealTime();
    }, randomTime);
  };

  // sets the imageUpload state to the selected file
  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const imageTypes = ["image/jpeg", "image/png"];
    if (imageTypes.includes(file.type)) {
      setImageUpload(file);
    } else {
      alert("Not an image!");
    }
  };

  // gets the screens from database
  // TODO: add limit
  const getScreens = async () => {
    const querySnapshot = await getDocs(collection(db, "screens"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setImageList([]);
      setImageList((prev) => [...prev, doc.data()]);
    });
  };

  // takes imageUpload state and sends it to firebase storage
  const uploadImage = (dataPNG, caption) => {
    // if (imageUpload == null) return;
    console.log("Trying to upload", dataPNG);
    const imageId = v4();
    const imageRef = ref(storage, `screens/${imageId}`);
    uploadString(imageRef, dataPNG, "data_url")
      .then((snapshot) => {
        alert("Image Uploaded");
        setImageUpload(null);
        getDownloadURL(snapshot.ref).then((url) => {
          addImageToDatabase(imageId, url, caption);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadScreen = () => {};

  // adds the image along with its data to firestore
  const addImageToDatabase = async (imageId, url, caption) => {
    console.log("Entered");
    console.log(user);
    try {
      const screen = {
        id: imageId,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        screenUrl: url,
        datetime: new Date(),
        caption: caption,
      };
      const docRef = await addDoc(collection(db, "screens"), screen);

      setImageList((prev) => [...prev, screen]);
      console.log(docRef);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (!user) {
    //   navigate("/login");
    }
    runOncePerDay(); // run the cod
    setCerealTime();
    // Clean up the timer on component unmount
    return () => clearTimeout();
  }, []);

  return (
    <div className="UploadImage">
      {/* <input type="file" accept="image/*" onChange={fileSelectedHandler} />
            <button onClick={uploadImage}>Upload</button>
            <button onClick={uploadScreen}>Screenshot</button> */}
      <ScreenUploader uploadCallBack={uploadCallBack} />
      <ImageGallery
        imageList={{ imageList, setImageList }}
        getScreens={getScreens}
        blur={blur}
      />
    </div>
  );
};

export default UploadImage;
