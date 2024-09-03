import Image from "next/image";

type Props = {
  id: number;
  url: string;
  name: string;
};

export default function PlaceImage({ id, url, name }: Props) {
  console.log("PlaceImage", id, url, name);
  return (
    <div className="place-image">
      <Image
        key={id}
        alt={`${name} Image`}
        src={url}
        width={800}
        height={600}
        sizes="(max-width: 800px) 100vw, 800px"
        placeholder="blur"
        blurDataURL={url}
      />
    </div>
  );
}
