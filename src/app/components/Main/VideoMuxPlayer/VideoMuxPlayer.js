"use client";

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";
import "@mux/mux-player/themes/classic";

export default function VideoMuxPlayer({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const playbackId = id;

  const handleLoadedMetadata = () => {
    setIsLoading(false);
  };

  const handleError = (event) => {
    console.error("Mux Player error:", event);
    setError("No se pudo cargar el video.");
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="w-2/3 h-full">
        {isLoading && (
          <div className="flex items-center justify-center h-48 animate-pulse">
            <Image
              src={`/images/loading.gif`}
              alt="Loading Button"
              width={100}
              height={100}
            />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            <p>{error}</p>
          </div>
        )}

        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          autoPlay={false}
          accent-color="#17e6da"
          className={`mt-5 ${isLoading ? "hidden" : "block"}`}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
        />
      </div>
    </div>
  );
}
