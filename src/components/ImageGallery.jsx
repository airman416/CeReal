import "./css/UploadImage.css";
import { useEffect, useContext } from "react";
import { storage, db } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { UserContext } from "../App";
import "./css/ImageGallery.css";

/**
 * Displays all screens on top of each other
 *
 * @param {List, Function} props
 * @returns view
 */
const ImageGallery = (props) => {
  const { imageList, setImageList } = props.imageList;
  const { user, setUser } = useContext(UserContext);

  /**
   * Updates images stored in the state
   */
  const getScreens = async () => {
    const querySnapshot = await getDocs(collection(db, "screens"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setImageList((prev) => [...prev, doc.data()]);
    });
  };

  /**
   * Deletes image from Firestore and Firebase Storage
   *
   * @param {Number} id
   */
  const handleDeleteImage = async (id) => {
    const q = query(collection(db, "screens"), where("id", "==", id));
    const qSnap = await getDocs(q);
    qSnap.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    // TODO: use filter instead
    const imageRef = ref(storage, `screens/${id}`);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted image");
      })
      .catch((error) => {
        console.log(error);
      });

    setImageList([]);
    getScreens();
  };

  useEffect(() => {
    getScreens();
  }, []);

  return (
    <div className="image-gallery-container">
      {imageList.map((data) => {
        return (
          <div key={data.id}>
            <div className="user-info">
              <img
                className="profile-picture"
                src={null}
                alt="Profile"
                // key={data.userId}
              />
              <span className="username">{data.userEmail}</span>
            </div>
            <div className="image-container">
              <img className="gallery-image" src={data.screenUrl} alt={""} />
              <div className="caption">{data.caption}</div>
              {console.log("User", data.userId, "Signed in", user.uid)}
              {data.userId === user.uid && (
                <div className="button-container">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImage(data.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
