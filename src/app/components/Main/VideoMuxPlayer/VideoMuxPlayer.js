"use client"

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player/themes/classic";

export default function VideoMuxPlayer({ id }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const playbackId = id;

  useEffect(() => {
    const fetchVideoToken = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/getVideoToken?playbackId=${playbackId}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("Error fetching token:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoToken();
  }, [playbackId]);

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="w-2/3">
        {loading ? (
          <div>Loading video...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}. Please try again later.</div>
        ) : token ? (
          <MuxPlayer
            playbackId={playbackId}
            playbackToken={token}
            streamType="on-demand"
            autoPlay={false}
            accent-color="#17e6da"
          />
        ) : (
          <div>No video available.</div> // Fallback if no token and no error
        )}
      </div>
    </div>
  );
}