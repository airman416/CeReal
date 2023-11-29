import React, { useRef, useState } from 'react';
import './css/ScreenCapture.css';

const App = () => {
  const videoRef = useRef(null);
  const [capturedFrame, setCapturedFrame] = useState(null);

  let mediaStream = null; // To store the reference to the active media stream

  const displayMediaOptions = {
    video: true,
  };

  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setCapturedFrame(dataURL);
      }
    }
  };

  const handleCaptureButtonClick = () => {
    captureFrame();
    stopVideoStream();
  };

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
    <div class="container">
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={handleStartButtonClick}>Start Capture</button>
      <button onClick={handleCaptureButtonClick}>Capture Screenshot</button>
      {capturedFrame && <img src={capturedFrame} alt="Captured Frame" />}
    </div>
  );
};

export default App;
