import React, { useState, useCallback } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut'; 
import PasteClipboard from './PasteClipboard';

const DetectKeypress = () => {  
  const [showImage, setShowImage] = useState(false);
//   const keys = ['Meta', 'Control', 'Shift', '3'];
  const keys = ['Shift', 'S'];
  const handleKeyboardShortcut = useCallback(keys => {
    setShowImage(currentShowImage => !currentShowImage)
  }, [setShowImage]);
  useKeyboardShortcut(keys, handleKeyboardShortcut);
  
  return (
    <div>
      {showImage && (<img alt="FullStackLabs Logo" src="src/logo.svg"/>)}
      <h1>{`Press ${keys.join(' + ')} to show image.`}</h1>
      {showImage && (<p>Hello</p>)}
      <PasteClipboard pressed={showImage}/>
    </div>
    );
}

export default DetectKeypress;