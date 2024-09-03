import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Not Found 🤷",
};

export default function NotFound() {
  return (
    <main className="default-layout">
      <h1>Nothing was found at this URL 🤷</h1>
      {/* <p>Try one of the following links instead:</p> */}
      <ul>
        <li>
          <Link href="/">Back to Home</Link>
        </li>
      </ul>
    </main>
  );
}
