import React, { useEffect, useState } from 'react';
import { ScreenCapture } from 'react-screen-capture';

const Screenshot = () => {
  const [screenCapture, setScreenCapture] = useState('');
  const [counter, setCounter] = useState(0);

  const handleScreenCapture = screenCapture => {
    setScreenCapture(screenCapture);
  };

  const handleSave = () => {
    const screenCaptureSource = screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const onButtonPress = () => {
    setCounter(10);
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }

  useEffect(() => {
    
  }, [counter]);

  return (
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <div className="App">
              <div>Countdown: {counter}</div>
            </div>
            <button onClick={onStartCapture}>Capture</button>
            <center>
              <img src={screenCapture} alt='react-screen-capture' />
              <p>
                {screenCapture && <button onClick={handleSave}>Download</button>}
              </p>
            </center>
          </div>
        )}
      </ScreenCapture>
  );
};

export default Screenshot;