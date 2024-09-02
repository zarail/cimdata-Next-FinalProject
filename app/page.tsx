import HomePageMessage from "@/components/HomePageMessage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "📍 Hey Local -- Home",
  description: "Let me visit your city just like you do!",
};

export default function Home() {
  return (
    <main className="default-layout">
      <h1>Hey local! 👋</h1>
      <HomePageMessage name="Zara" city="Barcelona" />
    </main>
  );
}
