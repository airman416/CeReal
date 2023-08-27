import './UploadImage.css';
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';


const UploadImage = (props) => {
    
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `screens/`);
    const user = props.user;
    
    // sets the imageUpload state to the selected file
    const fileSelectedHandler = event => {
        const file = event.target.files[0];
        console.log(file);
        const imageTypes = ['image/jpeg', 'image/png'];
        if (imageTypes.includes(file.type)) {
            setImageUpload(file);
        } else {
            alert("Not an image!");
        }
    }
    
    
    // takes imageUpload state and ssends it to firebase storage
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `screens/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("Image Uploaded");
            setImageUpload(null);
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
        })
    }
    
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);
    
    return (
        <div className="UploadImage">
            <input type="file" accept="image/*" onChange={fileSelectedHandler} />
            <button onClick={uploadImage}>Upload</button>
            <div>
                {imageList.map((url) => {
                    return <img src={url}/>
                })}
            </div>
        </div>
    );
}
    
export default UploadImage;
    