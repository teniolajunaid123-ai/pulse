import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Pulse</h1>
      <p className="text-neutral-500">
        Live prediction market feed, scored and ranked in real time.
      </p>
      <Link
        href="/feed"
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        View the feed
      </Link>
    </main>
  );
}
