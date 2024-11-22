import React from "react";
import Image from "next/image";

const Button = ({ image, text, isRed = false, click }) => {
  return (
    <button
      onClick={click}
      className={`flex items-center gap-2 font-bold ${
        isRed ? "text-[#ED6468]" : "text-[#5457B6]"
      }`}
    >
      {image && <Image src={image.src} alt={image.alt} />}
      {text}
    </button>
  );
};

export default Button;
