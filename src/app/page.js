import MainPageSelector from "@/app/components/Main/MainPageSelector/MainPageSelector";
import VideoMuxPlayer from "@/app/components/Main/VideoMuxPlayer/VideoMuxPlayer";
import DataReader from "./components/Main/MainPageSelector/DataReader";

export default function Home() {
  return (
    <main className="">
      <MainPageSelector />
      <DataReader />
    </main>
  );
}
