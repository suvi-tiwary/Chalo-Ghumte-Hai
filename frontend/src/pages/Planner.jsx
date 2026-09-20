import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  Compass,
  Heart,
  History,
  MapPin,
  Mountain,
  Moon,
  Plane,
  Sparkles,
  TreePine,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import { apiUrl } from "../lib/api";

const interestOptions = [
  { name: "Mountains", icon: Mountain },
  { name: "Adventure", icon: Compass },
  { name: "Food", icon: Utensils },
  { name: "Photography", icon: Camera },
  { name: "History", icon: History },
  { name: "Culture", icon: Heart },
  { name: "Nature", icon: TreePine },
  { name: "Nightlife", icon: Moon },
];

const plannerScenes = [
  {
    name: "Himalayan mornings",
    subtitle: "Wake up somewhere beautiful",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Desert evenings",
    subtitle: "Follow the golden hour",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=90",
  },
  {
    name: "Coastal afternoons",
    subtitle: "Let the road meet the sea",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=90",
  },
];

export default function Planner() {
  const navigate = useNavigate();

  const [sceneIndex, setSceneIndex] = useState(0);

  const [form, setForm] = useState({
    destination: "",
    starting_point: "",
    days: 4,
    budget: 15000,
    travelers: 2,
    travel_type: "friends",
    interests: [],
  });

  const [planning, setPlanning] = useState(false);
  const [error, setError] = useState("");

  const currentScene = plannerScenes[sceneIndex];

  // Automatically change background scene
  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIndex((current) => (current + 1) % plannerScenes.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleInterest = (interest) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
  };

  const changeNumber = (field, amount, min, max) => {
    setForm((current) => ({
      ...current,
      [field]: Math.min(
        max,
        Math.max(min, Number(current[field]) + amount)
      ),
    }));
  };

  const budgetPercentage =
    ((Number(form.budget) - 3000) / (100000 - 3000)) * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.destination.trim() || !form.starting_point.trim()) {
      setError(
        "Tell us where you're leaving from and where you're going."
      );
      return;
    }

    setError("");
    setPlanning(true);

    try {
      const response = await fetch(
        apiUrl("/plan-trip"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            days: Number(form.days),
            budget: Number(form.budget),
            travelers: Number(form.travelers),
          }),
        }
      );

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload.detail ||
            `Request failed with status ${response.status}`
        );
      }

      navigate("/trip", {
        state: {
          trip: payload.trip,
        },
      });
    } catch (requestError) {
      console.error("[plan-trip]", requestError);

      setError(
        requestError.message ||
          "We couldn't build your journey. Try again."
      );
    } finally {
      setPlanning(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061018] text-[#f7f2e8]">

      {/* =====================================================
          CINEMATIC BACKGROUND
      ===================================================== */}

      <AnimatePresence mode="sync">
        <motion.div
          key={currentScene.image}
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentScene.image})`,
          }}
        />
      </AnimatePresence>

      {/* Cinematic dark overlay */}

      <div className="fixed inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,16,.97)_0%,rgba(3,10,16,.86)_30%,rgba(3,10,16,.45)_65%,rgba(3,10,16,.75)_100%)]" />

      <div className="fixed inset-0 -z-10 bg-[linear-gradient(0deg,rgba(3,10,16,.98)_0%,rgba(3,10,16,.15)_55%,rgba(3,10,16,.55)_100%)]" />

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="relative z-30 mx-auto flex w-[calc(100%-32px)] max-w-[1400px] items-center justify-between py-6 md:w-[calc(100%-64px)] md:py-8">

        <Link
          to="/home"
          className="flex items-center gap-2 text-[11px] font-semibold tracking-[.18em] text-white transition hover:text-[#e9bd61] md:text-sm"
        >
          <span className="text-xl text-[#e9bd61]">
            ✦
          </span>

          CHALO GHUMTE HAI
        </Link>

        <div className="flex items-center gap-4">

          {/* Current scene */}

          <div className="hidden items-center gap-2 text-[9px] uppercase tracking-[.22em] text-white/50 md:flex">

            <span className="h-1.5 w-1.5 rounded-full bg-[#e9bd61] shadow-[0_0_12px_#e9bd61]" />

            {currentScene.name}

          </div>

          <Link
            to="/home"
            className="rounded-full border border-white/15 bg-black/10 px-4 py-2 text-xs text-white/65 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            Exit
          </Link>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-100px)] w-[calc(100%-32px)] max-w-[1400px] items-center gap-12 pb-16 pt-8 md:w-[calc(100%-64px)] md:grid-cols-[.85fr_1.15fr] md:gap-20 md:pt-0">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          className="max-w-2xl"
        >

          {/* Small heading */}

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.3em] text-[#e9bd61]">

            <Sparkles size={13} />

            Your next story begins here

          </div>

          {/* Main heading */}

          <h1 className="mt-7 font-serif text-[58px] font-normal leading-[.9] tracking-[-.055em] sm:text-[72px] md:text-[82px] lg:text-[96px]">

            Where do you

            <br />

            <em className="text-[#e9bd61]">
              want to disappear?
            </em>

          </h1>

          <p className="mt-8 max-w-lg text-sm leading-7 text-white/55 md:text-base">
            Tell us a little about the trip you're imagining.
            We'll turn it into a journey worth remembering.
          </p>

          {/* Scene description */}

          <div className="mt-12 min-h-[65px]">

            <AnimatePresence mode="wait">

              <motion.div
                key={currentScene.name}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.5,
                }}
              >

                <p className="font-serif text-xl text-white md:text-2xl">
                  {currentScene.name}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[.18em] text-white/35">
                  {currentScene.subtitle}
                </p>

              </motion.div>

            </AnimatePresence>

          </div>

          {/* Scene indicators */}

          <div className="mt-5 flex gap-2">

            {plannerScenes.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSceneIndex(index)}
                className={`h-[2px] transition-all duration-500 ${
                  sceneIndex === index
                    ? "w-16 bg-[#e9bd61]"
                    : "w-7 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}

          </div>

        </motion.div>

        {/* =================================================
            RIGHT SIDE — JOURNEY BUILDER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="rounded-[28px] border border-white/10 bg-[#091720]/80 p-5 shadow-[0_35px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-7 md:rounded-[34px] md:p-9"
        >

          <form onSubmit={handleSubmit}>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.28em] text-white/35">

                  <span className="text-[#e9bd61]">
                    01
                  </span>

                  THE DEPARTURE

                </div>

                <h2 className="mt-4 font-serif text-3xl font-normal leading-none md:text-4xl">

                  Let's get you

                  <br />

                  <em className="text-[#e9bd61]">
                    somewhere new.
                  </em>

                </h2>

              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e9bd61]/20 bg-[#e9bd61]/5 text-[#e9bd61]">
                <Plane size={19} />
              </div>

            </div>

            {/* =================================================
                ROUTE
            ================================================= */}

            <div className="mt-9">

              {/* FROM */}

              <div className="flex items-center gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">

                  <span className="h-2.5 w-2.5 rounded-full border-2 border-[#e9bd61]" />

                </div>

                <div className="flex-1">

                  <label className="block text-[8px] uppercase tracking-[.22em] text-white/30">
                    Leaving from
                  </label>

                  <input
                    name="starting_point"
                    value={form.starting_point}
                    onChange={handleChange}
                    placeholder="Delhi, Mumbai, Lucknow..."
                    className="mt-1 w-full border-none bg-transparent font-serif text-xl text-white outline-none placeholder:text-white/20 md:text-2xl"
                  />

                </div>

              </div>

              {/* Route line */}

              <div className="ml-[18px] flex h-8 items-center">

                <div className="h-full w-px border-l border-dashed border-white/20" />

              </div>

              {/* TO */}

              <div className="flex items-center gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e9bd61]/25 bg-[#e9bd61]/5 text-[#e9bd61]">

                  <MapPin size={14} />

                </div>

                <div className="flex-1">

                  <label className="block text-[8px] uppercase tracking-[.22em] text-white/30">
                    Taking me to
                  </label>

                  <input
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="Manali, Goa, Jaipur..."
                    className="mt-1 w-full border-none bg-transparent font-serif text-xl text-white outline-none placeholder:text-white/20 md:text-2xl"
                  />

                </div>

              </div>

            </div>

            <div className="my-8 h-px bg-white/[.08]" />

            {/* =================================================
                SHAPE JOURNEY
            ================================================= */}

            <div className="mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.28em] text-white/35">

              <span className="text-[#e9bd61]">
                02
              </span>

              SHAPE THE JOURNEY

            </div>

            <div className="grid gap-2 sm:grid-cols-3">

              {/* DAYS */}

              <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4">

                <div className="flex items-center gap-2 text-[#e9bd61]">

                  <CalendarDays size={16} />

                  <span className="text-[8px] uppercase tracking-[.18em] text-white/30">
                    Days
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <button
                    type="button"
                    onClick={() =>
                      changeNumber("days", -1, 1, 30)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#e9bd61]/50 hover:text-[#e9bd61]"
                  >
                    −
                  </button>

                  <span className="font-serif text-xl">
                    {form.days}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      changeNumber("days", 1, 1, 30)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#e9bd61]/50 hover:text-[#e9bd61]"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* TRAVELERS */}

              <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4">

                <div className="flex items-center gap-2 text-[#e9bd61]">

                  <Users size={16} />

                  <span className="text-[8px] uppercase tracking-[.18em] text-white/30">
                    Travelers
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <button
                    type="button"
                    onClick={() =>
                      changeNumber(
                        "travelers",
                        -1,
                        1,
                        20
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#e9bd61]/50 hover:text-[#e9bd61]"
                  >
                    −
                  </button>

                  <span className="font-serif text-xl">
                    {form.travelers}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      changeNumber(
                        "travelers",
                        1,
                        1,
                        20
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#e9bd61]/50 hover:text-[#e9bd61]"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* TRAVEL TYPE */}

              <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4">

                <div className="flex items-center gap-2 text-[#e9bd61]">

                  <Heart size={16} />

                  <span className="text-[8px] uppercase tracking-[.18em] text-white/30">
                    Travelling as
                  </span>

                </div>

                <select
                  name="travel_type"
                  value={form.travel_type}
                  onChange={handleChange}
                  className="mt-4 w-full cursor-pointer border-none bg-transparent font-serif text-lg text-white outline-none"
                >
                  <option
                    value="solo"
                    className="bg-[#0b1821]"
                  >
                    Solo
                  </option>

                  <option
                    value="couple"
                    className="bg-[#0b1821]"
                  >
                    Couple
                  </option>

                  <option
                    value="friends"
                    className="bg-[#0b1821]"
                  >
                    Friends
                  </option>

                  <option
                    value="family"
                    className="bg-[#0b1821]"
                  >
                    Family
                  </option>
                </select>

              </div>

            </div>

            {/* =================================================
                BUDGET
            ================================================= */}

            <div className="mt-7 rounded-2xl border border-white/[.08] bg-white/[.02] p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Wallet
                    size={16}
                    className="text-[#e9bd61]"
                  />

                  <span className="text-[9px] uppercase tracking-[.2em] text-white/35">
                    Your travel budget
                  </span>

                </div>

                <motion.strong
                  key={form.budget}
                  initial={{ opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-xl font-normal text-[#e9bd61]"
                >
                  ₹{Number(form.budget).toLocaleString("en-IN")}
                </motion.strong>

              </div>

              <input
                type="range"
                min="3000"
                max="100000"
                step="1000"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="mt-6 h-1 w-full cursor-pointer appearance-none rounded-full accent-[#e9bd61]"
                style={{
                  background: `linear-gradient(
                    to right,
                    #e9bd61 0%,
                    #e9bd61 ${budgetPercentage}%,
                    rgba(255,255,255,.12) ${budgetPercentage}%,
                    rgba(255,255,255,.12) 100%
                  )`,
                }}
              />

              <div className="mt-2 flex justify-between text-[8px] text-white/20">
                <span>₹3K</span>
                <span>₹1L+</span>
              </div>

            </div>

            <div className="my-8 h-px bg-white/[.08]" />

            {/* =================================================
                INTERESTS
            ================================================= */}

            <div className="mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.28em] text-white/35">

              <span className="text-[#e9bd61]">
                03
              </span>

              WHAT FEELS LIKE YOU?

            </div>

            <div className="flex flex-wrap gap-2">

              {interestOptions.map((interest) => {

                const Icon = interest.icon;

                const selected =
                  form.interests.includes(interest.name);

                return (
                  <motion.button
                    key={interest.name}
                    type="button"
                    whileTap={{
                      scale: 0.92,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    onClick={() =>
                      toggleInterest(interest.name)
                    }
                    className={`relative flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[10px] transition-all duration-300 ${
                      selected
                        ? "border-[#e9bd61] bg-[#e9bd61] text-[#071018]"
                        : "border-white/[.09] bg-white/[.025] text-white/50 hover:border-[#e9bd61]/40 hover:text-white"
                    }`}
                  >

                    <Icon size={14} />

                    {interest.name}

                    <AnimatePresence>

                      {selected && (
                        <motion.span
                          initial={{
                            scale: 0,
                            opacity: 0,
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                          }}
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#071018] text-[#e9bd61]"
                        >
                          <Check size={9} />
                        </motion.span>
                      )}

                    </AnimatePresence>

                  </motion.button>
                );
              })}

            </div>

            {/* =================================================
                LIVE JOURNEY
            ================================================= */}

            <AnimatePresence>

              {(form.destination ||
                form.starting_point ||
                form.interests.length > 0) && (

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    marginTop: 24,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginTop: 0,
                  }}
                  className="overflow-hidden"
                >

                  <div className="flex items-center gap-3 rounded-2xl border border-[#e9bd61]/15 bg-[#e9bd61]/[.035] p-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9bd61]/10 text-[#e9bd61]">
                      <Compass size={17} />
                    </div>

                    <div className="min-w-0">

                      <span className="text-[8px] uppercase tracking-[.2em] text-white/30">
                        Your journey
                      </span>

                      <div className="mt-1 flex items-center gap-2 truncate font-serif text-sm text-white">

                        <span className="truncate">
                          {form.starting_point ||
                            "Your city"}
                        </span>

                        <ArrowRight
                          size={13}
                          className="shrink-0 text-[#e9bd61]"
                        />

                        <span className="truncate">
                          {form.destination ||
                            "Somewhere beautiful"}
                        </span>

                      </div>

                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

            {/* =================================================
                ERROR
            ================================================= */}

            <AnimatePresence>

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-200"
                >
                  {error}
                </motion.div>
              )}

            </AnimatePresence>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <motion.button
              type="submit"
              disabled={planning}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="mt-7 flex w-full items-center justify-between rounded-full bg-[#e9bd61] p-1.5 pl-6 text-sm font-semibold text-[#071018] shadow-[0_15px_40px_rgba(233,189,97,.12)] transition-shadow hover:shadow-[0_20px_55px_rgba(233,189,97,.25)] disabled:cursor-wait disabled:opacity-70"
            >

              <span>
                {planning
                  ? "Creating your journey..."
                  : "Build my journey"}
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071018] text-[#e9bd61]">

                {planning ? (
                  <motion.span
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    ✦
                  </motion.span>
                ) : (
                  <ArrowUpRight size={19} />
                )}

              </span>

            </motion.button>

            <p className="mt-3 text-center text-[8px] tracking-[.08em] text-white/20">
              ✦ No perfect answers. Just tell us how you want to travel.
            </p>

          </form>

        </motion.div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="relative z-10 mx-auto flex w-[calc(100%-32px)] max-w-[1400px] justify-between border-t border-white/[.08] py-6 text-[8px] tracking-[.25em] text-white/20 md:w-[calc(100%-64px)]">

        <span>
          CHALO GHUMTE HAI
        </span>

        <span>
          PLAN LESS. EXPERIENCE MORE.
        </span>

      </footer>

    </main>
  );
}