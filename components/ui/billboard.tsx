import Image from "next/image";

interface BillboardProps {
  backdrop_path: string;
  title: string;
}

const Billboard = ({ backdrop_path, title }: BillboardProps) => {
  return (
    <section className="relative -z-20 aspect-video max-h-screen w-full overflow-hidden sm:top-0">
      <div className="relative w-full h-ful=">
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          width={1500}
          height={1500}
          alt={title}
          className="object-cover w-full"
        />
        <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-black to-transparent sm:block" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
};

export default Billboard;
