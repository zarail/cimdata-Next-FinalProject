import CategoryCard from "@/components/Category/CategoryCard";
import HomePageMessage from "@/components/HomePageMessage";
import type { Metadata } from "next";
import classes from "@/components/Category/CategoryCard.module.css";

export const metadata: Metadata = {
  title: "📍 Hey Local",
  description: "Let me enjoy your city just like you do!",
};

const categories = ["culture", "sport", "food", "sightseeing"];

categories.sort();

export default function Home() {
  return (
    <main className="default-layout">
      <h1>Hey local! 👋</h1>
      <HomePageMessage name="Zara" city="Cologne" />
      <section>
        <div className={classes.categoryGrid}>
          {categories.map((category) => (
            <li key={category}>
              <CategoryCard key={category} category={category} />
            </li>
          ))}
        </div>
      </section>
    </main>
  );
}
