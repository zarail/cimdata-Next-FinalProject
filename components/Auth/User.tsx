import type { GitHubUser } from "@/types/auth-types";
import Image from "next/image";

type Props = GitHubUser;

export default function User({ name, image }: Props) {
  return (
    <div>
      Signed in as <em>{name}</em>
      {/* {image && (
        <Image
          src={image}
          alt={`GitHub-Avatar von ${name}`}
          width={40}
          height={40}
        />
      )} */}
    </div>
  );
}
