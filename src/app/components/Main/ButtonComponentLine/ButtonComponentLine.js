import React from "react";
import Image from "next/image";
import Link from "next/link";

const ButtonComponentLine = ({title}) => {
  return (
    <Link className="mt-2 mb-2 gap-4 flex w-fit buttonComponentLine" href={""}>
      <Image
        src={"/images/IconPlayButton.svg"}
        alt="Icon Play Button"
        width={20}
        height={20}
        className=""
      />
      <p className="text-2xl">{title}</p>
    </Link>
  );
};

export default ButtonComponentLine;
