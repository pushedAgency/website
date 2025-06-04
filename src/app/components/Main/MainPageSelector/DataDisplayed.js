"use client";

import React, { useState } from "react";
import ButtonComponentLine from "@/app/components/Main/ButtonComponentLine/ButtonComponentLine";
import Link from "next/link";
import Image from "next/image";

const DataDisplayed = ({ data, title }) => {
  const [currentPlaybackId, setCurrentPlaybackId] = useState(
    data?.[0]?.playbackId
  );

  console.log(data);

  return (
    <section>
      <section className="headerSection paddingSection">
        <h1 className="font-extrabold text-2xl">📚 {title}</h1>
      </section>

      <section className="flex">
        <div className="moduleContent paddingSection">
          <p className="font-bold text-2xl accent w-fit">Contenidos</p>

          <p className="w-fit">
            {title === "COMO ENCONTRAR EL PRODUCTO QUE TE CAMBIE LA VIDA" && "En este módulo te enseño cómo buscar productos ganadores, cómo analizarlos, y te doy estrategias concretas para encontrar ese producto que puede marcar un antes y un después."}
            {title === "COMO SACAR COSTOS DE PRODUCTO" && "Aprendé a sacar costos de productos con este módulo, que incluye información vital sobre requisitos fiscales para mejorar las ventas y una clase completa sobre el cálculo de costos."}
            {title === "COMO HACER VIDEOS 100% CONVERTIDORES" && "Las claves para crear contenido de video de alta conversión. Este módulo proporciona orientación sobre la elaboración de guiones ganadores y la edición de creativos que captan la atención."}
            {title === "COMO LANZAR UN TESTEO" && "Una guía paso a paso para lanzar pruebas de marketing exitosas. Desde la configuración de tu Business Manager de Meta hasta la ejecución de campañas de calentamiento y la comprensión de la teoría ABO, este módulo cubre toda la rutina de testeo."}
            {title === "COMO HACERTE UN EXPERTO EN LAS METRICAS" && "Convertite en un experto en métricas aprendiendo a personalizar tus columnas de Meta y comprendiendo las métricas clave esenciales para un testeo efectivo."}
            {title === "TEORIA/PRACTICA ESCALADO" && "Este módulo profundiza en los aspectos teóricos y prácticos de escalar tu negocio, aunque no se especifica el contenido de video. (En proceso)"}
            {title === "OPTIMIZACION DE CAMPAÑAS/TESTEO" && "Enfocate en perfeccionar tus esfuerzos de marketing. Este módulo cubre estrategias para optimizar tanto campañas como pruebas. (En proceso)"}
            {title === "CREANDO TU EMPRESA" && "Un paso a paso para armar tu negocio desde cero: desde crear tu cuenta de Gmail, redes sociales y tienda online, hasta dejarla lista para vender con banners, productos y testimonios."}
            {title === "MI HISTORIA ¿QUIEN SOY Y COMO LLEGUE A DONDE ESTOY?" && "Una introducción personal donde cuento mi historia, cómo empecé y el camino que recorrí hasta construir mi negocio actual."}
            {title === "SI VES ESTO TE VA A IR BIEN" && "Una serie de videos con consejos clave para avanzar rápido en tu negocio, entender los desafíos que vas a enfrentar y cómo prepararte mentalmente para el camino emprendedor."}
          </p>

          <div className="">
            {data?.map((videoData, index) =>
              videoData?.playbackId ? (
                <div key={index}>
                  <ButtonComponentLine
                    title={videoData.filename}
                    src={videoData.playbackId}
                    onClick={() => setCurrentPlaybackId(videoData.playbackId)}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="videoParagrapgh gap-2">
          <div className="">
            {data?.map((videoData, index) =>
              videoData?.playbackId ? (
                <Link
                  key={index}
                  href={`/singleVideo/${videoData.playbackId}`}
                  className="videoComponentLineDiv"
                >
                  <div className="videoComponentLine flex items-center gap-5">
                    <Image
                      src={`https://image.mux.com/${videoData.playbackId}/thumbnail.webp?`}
                      alt="Icon Play Button"
                      width={1080}
                      height={1080}
                      className="borderImg videoThumbnail"
                      priority
                    />
                    <h3 className="text-xl">{videoData.filename}</h3>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default DataDisplayed;
