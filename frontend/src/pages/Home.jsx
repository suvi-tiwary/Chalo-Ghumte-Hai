import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Varanasi",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Ladakh",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=90",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  // Change destination image automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!destination.trim()) return;

    navigate(`/explore/${encodeURIComponent(destination.trim())}`);
  };

  return (
    <main className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black text-white">

      {/* =====================================================
          BACKGROUND IMAGES
      ===================================================== */}

      <div className="absolute inset-0">

        {destinations.map((place, index) => (
          <div
            key={place.name}
            className={`
              absolute -inset-[5%]
              bg-cover bg-center
              transition-all duration-[1800ms] ease-in-out
              ${index === current
                ? "scale-100 opacity-100"
                : "scale-[1.08] opacity-0"}
            `}
            style={{
              backgroundImage: `url(${place.image})`,
            }}
          />
        ))}

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

        {/* Bottom cinematic gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent" />

      </div>


      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-7 md:px-14 md:py-9">

        {/* Logo */}

        <div className="flex items-center gap-2">

          <span className="text-lg">
            ✦
          </span>

          <span className="text-xs font-medium tracking-[0.35em] md:text-sm">
            GHUMAKKAD
          </span>

        </div>


        {/* Location */}

        <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.25em] opacity-80 sm:flex">

          <span className="h-2 w-2 rounded-full bg-white" />

          India

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 flex h-full flex-col justify-center px-6 pt-10 md:px-[9vw]">

        {/* Small heading */}

        <div className="mb-6 flex items-center gap-3">

          <span className="h-px w-8 bg-white/70 md:w-10" />

          <span className="text-[9px] tracking-[0.35em] text-white/70 md:text-[11px]">
            YOUR NEXT JOURNEY STARTS HERE
          </span>

        </div>


        {/* =====================================================
            MAIN TITLE
        ===================================================== */}

        <h1 className="mb-8 font-serif text-[68px] font-medium leading-[0.82] tracking-[-4px] sm:text-[90px] md:text-[120px] lg:text-[145px]">

          <span className="block">
            चलो
          </span>

          <span className="ml-8 block md:ml-20">
            घूमते हैं<span className="text-[#e9c46a]">.</span>
          </span>

        </h1>


        {/* Description */}

        <p className="mb-8 text-sm leading-7 text-white/75 md:text-[15px]">

          Tell us where you want to go.
          <br />

          We'll take care of the rest.

        </p>


        {/* =====================================================
            DESTINATION SEARCH
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            flex w-full max-w-[670px]
            flex-wrap items-center
            rounded-md
            bg-white/95
            p-2
            text-black
            shadow-[0_20px_70px_rgba(0,0,0,0.3)]
            backdrop-blur-xl
          "
        >

          {/* Location Icon */}

          <div className="flex w-14 items-center justify-center text-2xl text-gray-500">
            ⌖
          </div>


          {/* Input */}

          <div className="flex min-w-0 flex-1 flex-col gap-1 px-1">

            <label className="text-[8px] tracking-[0.25em] text-gray-500">
              WHERE TO?
            </label>

            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter a city or state..."
              className="
                w-full
                bg-transparent
                text-sm
                outline-none
                placeholder:text-gray-400
                md:text-[16px]
              "
            />

          </div>


          {/* Button */}

          <button
            type="submit"
            className="
              mt-2
              flex h-14 w-full
              items-center justify-center gap-5
              rounded-sm
              bg-[#171717]
              text-[10px]
              tracking-[0.2em]
              text-white
              transition-all
              duration-300
              hover:bg-[#292929]
              hover:-translate-y-[2px]
              sm:mt-0
              sm:h-[68px]
              sm:w-[145px]
            "
          >

            <span>
              EXPLORE
            </span>

            <span className="text-xl">
              ↗
            </span>

          </button>

        </form>


        {/* =====================================================
            CURRENT DESTINATION
        ===================================================== */}

        <div className="mt-7 flex items-center gap-4">

          <span className="h-px w-10 bg-white/40" />

          <div className="flex flex-col gap-1">

            <span className="text-[8px] tracking-[0.3em] text-white/50">
              NOW DISCOVERING
            </span>

            <span className="font-serif text-lg">
              {destinations[current].name}
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="absolute bottom-7 left-6 right-6 z-20 flex items-end justify-between md:bottom-9 md:left-14 md:right-14">

        {/* Scroll indicator */}

        <div className="flex items-center gap-4">

          <div className="flex h-8 w-5 justify-center rounded-full border border-white/60 pt-1.5">

            <span className="h-1.5 w-[3px] animate-bounce rounded-full bg-white" />

          </div>

          <span className="hidden text-[8px] tracking-[0.3em] text-white/60 sm:block">
            SCROLL TO EXPLORE
          </span>

        </div>


        {/* Image counter */}

        <div className="flex items-center gap-3 text-[9px] tracking-[0.2em]">

          <span>
            0{current + 1}
          </span>

          <div className="h-px w-20 bg-white/30">

            <div
              className="h-full bg-white transition-all duration-700"
              style={{
                width: `${((current + 1) / destinations.length) * 100}%`,
              }}
            />

          </div>

          <span className="text-white/50">
            0{destinations.length}
          </span>

        </div>

      </div>

    </main>
  );
}