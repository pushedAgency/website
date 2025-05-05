import React from "react";
import Image from "next/image";

const ButtonComponentLine = () => {
  return (
    <a className="mt-2 mb-2 gap-4 flex w-fit buttonComponentLine" href="">
      <Image
        src={"/images/IconPlayButton.svg"}
        alt="Icon Play Button"
        width={20}
        height={20}
        className=""
      />
      <p className="text-2xl">Título de video 1</p>
    </a>
  );
};

export default ButtonComponentLine;
