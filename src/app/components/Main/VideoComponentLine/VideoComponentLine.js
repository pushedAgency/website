import React from "react";
import Image from "next/image";

const VideoComponentLine = ({title, duration, description}) => {
  return (
    <div className="flex items-start">
      <a
        href=""
        className="group flex items-center w-auto float-left mb-2 relative videoComponentLineDiv"
      >
        <div className="videoComponentLine flex relative items-center">
          <div className="relative flex justify-center items-center imgVideo">
            <Image
              src={"/images/imgVideo.png"}
              alt="Icon Play Button"
              width={1080}
              height={1080}
              className="borderImg"
            />
            <Image
              src={"/images/PlayButton.svg"}
              alt="Icon Play Button"
              width={25}
              height={20}
              className="absolute"
            />
          </div>

          <div>
            <h3 className="text-2xl ml-4">{title}</h3>
            <p className="text-base ml-4 lenghtVideo">{duration}</p>
          </div>

          <Image
            src={"/images/ArrowRight.svg"}
            alt="Icon Play Button"
            width={10}
            height={20}
            className="absolute right-0 mr-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <div className="videoColumnParagraph borderImg ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-full left-0 z-10 bg-white p-2 shadow-lg">
          <p>
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};

export default VideoComponentLine;
