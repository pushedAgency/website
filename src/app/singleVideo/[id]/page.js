import VideoMuxPlayer from "@/app/components/Main/VideoMuxPlayer/VideoMuxPlayer";
import Link from "next/link";

const Page = async ({ params }) => {
  const { id } = await params;
  return (
    <main className="">
      <section className="headerSection paddingSection flex items-center gap-2">
        <Link href={"/"}>
        Volver
        </Link>
        <h1 className="font-extrabold text-4xl">📚 sds</h1>
      </section>
      <VideoMuxPlayer id={id} />
    </main>
  );
};

export default Page;
