import Link from "next/link";
import Image from "next/image";
import ButtonComponentLine from "@/app/components/Main/ButtonComponentLine/ButtonComponentLine";
import VideoComponentLine from "./components/Main/VideoComponentLine/VideoComponentLine";

export default function Home() {
  const videos = [
    {
      title: "Video 1",
      duration: "10:42",
      description: "Descripción del Video 1",
    },
    {
      title: "Video 2",
      duration: "08:30",
      description: "Descripción del Video 2",
    },
    {
      title: "Video 3",
      duration: "12:15",
      description: "Descripción del Video 3",
    },
    {
      title: "Video 4",
      duration: "09:50",
      description: "Descripción del Video 4",
    },
    {
      title: "Video 5",
      duration: "07:20",
      description: "Descripción del Video 5",
    },
    {
      title: "Video 6",
      duration: "11:05",
      description: "Descripción del Video 6",
    },
  ];

  return (
    <main className="">
      <section className="headerSection paddingSection">
        <h1 className="font-extrabold text-4xl">📚 Módulo 1</h1>
      </section>

      <section className="gridContainer">
        <div className="moduleContent paddingSection">
          <p className="font-bold text-2xl accent w-fit">Contenidos</p>

          <p className="w-fit">
            Parrafo breve de descripción de contenido lorem ipsum bla bla bla.
          </p>

          <div>
            <ButtonComponentLine></ButtonComponentLine>
            <hr />
            <ButtonComponentLine></ButtonComponentLine>
            <hr />
            <ButtonComponentLine></ButtonComponentLine>
            <hr />
          </div>
        </div>

        <div className="paddingSection videoColumn col-span-2">
          {videos.map((video, index) => (
            <VideoComponentLine
              key={index}
              title={video.title}
              duration={video.duration}
              description={video.description}
            />
          ))}
        </div>

        <div className="paddingSection videoParagrapgh"></div>
      </section>

      <section className="flex justify-center fixed bottom-0 w-screen">
        <Link className="bottomSection activeBottom" href="">
          <h1 className="font-bold text-xl">📚 Módulo 1</h1>
        </Link>

        <Link className="bottomSection" href="">
          <h1 className="font-bold text-xl">📚 Módulo 2</h1>
        </Link>

        <Link className="bottomSection" href="">
          <h1 className="font-bold text-xl">📚 Módulo 3</h1>
        </Link>
      </section>
    </main>
  );
}
