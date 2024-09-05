import CategoryCard from "@/components/Category/CategoryCard";
import HomePageMessage from "@/components/HomePageMessage";
import type { Metadata } from "next";
import classes from "@/components/Category/CategoryCard.module.css";
import { sortedCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "📍 Hey Local",
  description: "Let me enjoy your city just like you do!",
};

export default function Home() {
  return (
    <main className="default-layout">
      <div className="container">
        <h3>Hey local! 👋</h3>
        <HomePageMessage city="Cologne" />
        <section>
          <div className={classes.categoryGrid}>
            {sortedCategories.map((category) => (
              <li key={category}>
                <CategoryCard key={category} category={category} />
              </li>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
