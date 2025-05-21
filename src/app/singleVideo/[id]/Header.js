"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = ({ id }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState(null);

  // Fetch de datos
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

  // Búsqueda del signedId una vez que data se carga
  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      function findSignedId(data, signedIdBuscado) {
        for (const categoria in data) {
          const elementos = data[categoria];
          const encontrado = elementos.find(
            (item) => item.signedId === signedIdBuscado
          );
          if (encontrado) {
            return { categoria, ...encontrado };
          }
        }
        return null;
      }

      const resultadoEncontrado = findSignedId(data, id);
      console.log("Encontrado:", resultadoEncontrado);
      setResultado(resultadoEncontrado);
    }
  }, [data, id, loading]);

  return (
    <div>
      <section className="headerSection paddingSection flex items-center gap-2">
        <Link href={"/"}><IoMdArrowRoundBack className="text-2xl" /></Link>
        <h1 className="font-extrabold text-2xl">
          📚 {resultado?.categoria} / {resultado?.filename || "Cargando..."}
        </h1>
      </section>
    </div>
  );
};

export default Header;
