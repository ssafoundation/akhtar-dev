import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 pt-24">
      <section className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="headline text-5xl font-semibold sm:text-7xl">This page slipped out of the build.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">
          The route does not exist, but the main experience is ready.
        </p>
        <div className="mt-8">
          <Button href="/">Return Home</Button>
        </div>
      </section>
    </main>
  );
}
