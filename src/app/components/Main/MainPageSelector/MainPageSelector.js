"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DataDisplayed from "@/app/components/Main/MainPageSelector/DataDisplayed";

const MainPageSelector = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [activeData, setActiveData] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data.json", { cache: "no-store" });
        const response = await res.json();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const titles = data && typeof data === "object" ? Object.keys(data) : [];

  return (
    <section>
      {!loading && titles.length > 0 && (
        <>
          <DataDisplayed
            data={data[titles[activeData]]}
            title={titles[activeData]}
            active={activeData}
          />
          <section className="flex justify-center fixed bottom-0 w-screen gap-5 z-100">
            {titles?.map((title, index) => (
              <Link
                key={index}
                href=""
                className={`bottomSection ${activeData === index ? "activeBottom" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveData(index);
                }}
              >
                <h1 className="font-bold text-xl">📚 {title}</h1>
              </Link>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default MainPageSelector;
