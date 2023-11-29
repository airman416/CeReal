import React, { useState } from "react";

const PasteClipboard = (props) => {
  const [src, setSrc] = useState();

  const handleOnPaste = (event) => {
    if (!props.pressed) {
        return;
    }
    console.log({ event });
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    console.log("items: ", JSON.stringify(items));

    let blob = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }

    if (blob !== null) {
      // console.log({ blob });
      const reader = new FileReader();
      reader.onload = function (event) {
        // console.log(event.target.result); // data url!
        // console.log(event.target);
        setSrc(event.target.result);
      };
      reader.readAsDataURL(blob);

      console.log({ reader });
    }
  };

  return (
    <>
      <h1>Container</h1>
      <span>Make screen and paste to textarea</span>
      <br />
      <br />
      <textarea onPaste={handleOnPaste} />
      <br />
      <span>some text</span>
      <br />
      <img src={src} alt="pic" />
    </>
  );
};

export default PasteClipboard;
