"use client";
import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

export default function VideoMuxPlayer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/getVideos")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setVideos(data.videos || []))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        
        {videos?.map((video, index) => (
          <MuxPlayer
            playbackId={video.playback_id}
            metadata={{ video_title: "Demo Video" }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
