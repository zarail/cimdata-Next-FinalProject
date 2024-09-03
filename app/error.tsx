"use client";

type Props = {
  error: Error;
  reset: () => void;
};
export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="default-layout">
      <h1>Unfortunately, there was a problem</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
