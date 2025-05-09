"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import ButtonComponentLine from "@/app/components/Main/ButtonComponentLine/ButtonComponentLine";
import VideoComponentLine from "@/app/components/Main/VideoComponentLine/VideoComponentLine";
import DataDisplayed from "@/app/components/Main/MainPageSelector/DataDisplayed";

const MainPageSelector = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getFolders`);
        const response = await res.json();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    setActiveData(0);
  }, []);

  console.log(Object.keys(data));
  return (
    <section>
      <DataDisplayed
        data={data}
        title={Object.keys(data)}
        active={activeData}
      />
      <section className="flex justify-center fixed bottom-0 w-screen gap-5 z-100">
        {Object.keys(data).map((data, index) => (
          <Link
            className={`bottomSection ${activeData === index ? "activeBottom" : ""}`}
            href=""
            key={index}
            onClick={() => setActiveData(index)}
          >
            <h1 className="font-bold text-xl">📚 {data}</h1>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default MainPageSelector;
