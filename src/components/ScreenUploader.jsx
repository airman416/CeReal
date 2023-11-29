import React, { useRef, useState } from 'react';
import './css/ScreenUploader.css';

const ScreenUploader = ( {uploadCallBack} ) => {
  // stores screen video
  const videoRef = useRef(null);

  // stores the frame captured when recording stopped
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [caption, setCaption] = useState('');

  let mediaStream = null; // To store the reference to the active media stream

  const displayMediaOptions = {
    video: true,
  };

  /**
   * Captures the video frame 
   */
  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        const dataPNG = canvas.toDataURL();
        console.log("Found data png", dataPNG);
        setCapturedFrame(dataURL);
        uploadCallBack(dataPNG, caption);
        setCapturedFrame(null);
      }
    }
  };

  /**
   * Handler from button
   */
  const handleCaptureButtonClick = () => {
    captureFrame();
    stopVideoStream();
  };

  /**
   * Starts the video stream of screen
   */
  const handleStartButtonClick = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing display media:', error);
    }
  };

  /**
   * Stops the video stream of screen
   */
  const stopVideoStream = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <>
    <div className="capture-container">
      <div className="preview-container">
        <div className="preview-box">
            {!capturedFrame && <video className="screen-view" ref={videoRef} autoPlay playsInline />}
            {capturedFrame && <img className="screen-view" src={capturedFrame} alt=""/>}
        </div>
      </div>
      <div className="caption-input">
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" name="caption" placeholder="Type in a caption" onChange={(e)=>setCaption(e.target.value)}/>
      </div>
      <div className="capture-button-container">
        <button onClick={handleStartButtonClick} className="start-capture-button">Start Capture</button>
        <button onClick={handleCaptureButtonClick} className="capture-screenshot-button">Capture Screenshot</button>
      </div>
    </div>
    </>
  );
};

export default ScreenUploader;
