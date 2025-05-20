"use client";
import React, { useEffect, useState } from "react";

const DataReader = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const loadVideos = async () => {
      const allData = {};

      try {
        const res = await fetch(`/_next-video`);
        if (res.ok) {
          const json = await res.json();
          allData[folder] = json;
        }
      } catch (err) {
        console.warn(`No se pudo cargar ${folder}:`, err);
      }

      setData(allData);
    };

    loadVideos();
  }, []);

  console.log(data);
  return <div></div>;
};

export default DataReader;
