import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const scenes = [
  {
    name: "Spiti Valley",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=90",
    line: "Roads carved between silence and mountains.",
  },
  {
    name: "Ladakh",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2400&q=90",
    line: "Some roads are meant to be remembered.",
  },
  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=90",
    line: "Slow mornings. Green horizons. Still waters.",
  },
  {
    name: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2400&q=90",
    line: "Golden light across an ancient land.",
  },
  {
    name: "Meghalaya",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90",
    line: "Into the clouds, where the road gets quieter.",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2400&q=90",
    line: "Salt in the air. Nothing on the clock.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((value) => (value + 1) % scenes.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="cinema-home relative min-h-screen overflow-hidden text-white">

      {/* =========================================
          CINEMATIC BACKGROUND
      ========================================= */}

      <div className="absolute inset-0">

        {scenes.map((scene, index) => (
          <div
            key={scene.name}
            className={`scene-image ${
              index === current ? "scene-image-active" : ""
            }`}
            style={{
              backgroundImage: `url(${scene.image})`,
            }}
          />
        ))}

        {/* cinematic darkness */}

        <div className="absolute inset-0 bg-black/30" />

        {/* left cinematic gradient */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/20" />

        {/* bottom cinematic gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

      </div>

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="relative z-20 flex items-center justify-between px-6 py-7 md:px-14">

        <span className="text-sm font-medium tracking-[0.18em] text-white/90">
          ✦ CHALO GHUMTE HAI
        </span>

        <Link
          to="/plan-trip"
          className="group text-sm text-white/70 transition hover:text-white"
        >
          Plan a trip
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            ↗
          </span>
        </Link>

      </header>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col justify-center px-6 pb-28 md:px-[10vw]">

        <p className="text-[10px] uppercase tracking-[0.4em] text-white/55">
          Travel differently
        </p>

        <h1 className="mt-7 font-serif text-[4.5rem] leading-[0.82] tracking-[-0.04em] sm:text-[6rem] md:text-[8rem]">

          चलो

          <br />

          <span className="italic">
            घूमते हैं
          </span>

        </h1>

        <p className="mt-9 max-w-md text-base leading-7 text-white/65 md:text-lg">
          You bring the destination.
          <br />
          We build the journey around you.
        </p>

        <Link
          to="/plan-trip"
          className="group mt-9 flex w-fit items-center gap-4 rounded-full border border-white/20 bg-white/[0.08] px-6 py-3.5 text-sm backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.15]"
        >
          <span>Plan my journey</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </Link>

      </section>

      {/* =========================================
          CURRENT DESTINATION
      ========================================= */}

      <footer className="absolute bottom-8 left-6 right-6 z-20 flex items-end justify-between md:left-14 md:right-14">

        <div className="hidden sm:block">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/40">
            A journey, not a checklist
          </p>

          {/* Scene progress */}

          <div className="mt-5 flex gap-2">

            {scenes.map((scene, index) => (
              <button
                key={scene.name}
                onClick={() => setCurrent(index)}
                className="group"
                aria-label={`Explore ${scene.name}`}
              >
                <div
                  className={`h-[2px] transition-all duration-500 ${
                    index === current
                      ? "w-12 bg-white"
                      : "w-5 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}

          </div>

        </div>

        <div className="text-right">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">
            Currently exploring
          </p>

          <p className="mt-2 font-serif text-2xl">
            {scenes[current].name}
          </p>

          <p className="mt-1 max-w-xs text-sm text-white/50">
            {scenes[current].line}
          </p>

        </div>

      </footer>

    </main>
  );
}