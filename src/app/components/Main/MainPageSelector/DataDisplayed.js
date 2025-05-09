"use client";

import React from "react";
import ButtonComponentLine from "@/app/components/Main/ButtonComponentLine/ButtonComponentLine";
import MuxPlayer from "@mux/mux-player-react";

const DataDisplayed = ({ data, title }) => {
  return (
    <section>
      <section className="headerSection paddingSection">
        <h1 className="font-extrabold text-4xl">📚 {title}</h1>
      </section>

      <section className="gridContainer">
        <div className="moduleContent paddingSection">
          <p className="font-bold text-2xl accent w-fit">Contenidos</p>

          <p className="w-fit">
            Parrafo breve de descripción de contenido lorem ipsum bla bla bla.
          </p>

          {data?.map((videoData, index) => (
            <div key={index}>
              <ButtonComponentLine title={videoData.filename} />
              <hr />
            </div>
          ))}
        </div>

        <div className="paddingSection videoParagrapgh">
          <MuxPlayer
            playbackId={"YMBmsTyQyH7cIZyS3DIe9s402DGvu7MsJl9b8C3HBae8"}
            metadata={{ video_title: "Demo Video" }}
          />
        </div>
      </section>
    </section>
  );
};

export default DataDisplayed;
