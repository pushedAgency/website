"use client";

import React, { useEffect, useState } from "react";
import ButtonComponentLine from "@/app/components/Main/ButtonComponentLine/ButtonComponentLine";
import Link from "next/link";
import Image from "next/image";

const DataDisplayed = ({ data, title }) => {
  const [currentPlaybackId, setCurrentPlaybackId] = useState(
    data?.[0]?.playbackId
  );

  return (
    <section>
      <section className="headerSection paddingSection">
        <h1 className="font-extrabold text-4xl">📚 {title}</h1>
      </section>

      <section className="flex">
        <div className="moduleContent paddingSection">
          <p className="font-bold text-2xl accent w-fit">Contenidos</p>

          <p className="w-fit">
            Parrafo breve de descripción de contenido lorem ipsum bla bla bla.
          </p>

          <div className="">
            {data?.map((videoData, index) => (
              <div key={index}>
                <ButtonComponentLine
                  title={videoData.filename}
                  src={videoData.signedId}
                  onClick={() => setCurrentPlaybackId(videoData.playbackId)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="videoParagrapgh gap-2">
          <div className="">
            {data?.map((videoData, index) => (
              <Link key={index} href={`/singleVideo/${videoData.signedId}`} className="videoComponentLineDiv">
                <div className="videoComponentLine flex items-center gap-5">
                  <Image
                    src={`https://image.mux.com/${videoData.playbackId}/thumbnail.webp?"`}
                    alt="Icon Play Button"
                    width={1080}
                    height={1080}
                    className="borderImg videoThumbnail"
                    priority
                  />
                  <h3 className="text-xl">{videoData.filename}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default DataDisplayed;
