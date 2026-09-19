import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "/api";

const scenes = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=90",
    place: "THE HIMALAYAS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=2400&q=90",
    place: "ITALY",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90",
    place: "BALI",
  },
];

export default function Signup() {
  const navigate = useNavigate();

  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* -----------------------------------------
     CHANGE BACKGROUND
  ----------------------------------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setScene((prev) => (prev + 1) % scenes.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  /* -----------------------------------------
     HANDLE INPUT
  ----------------------------------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* -----------------------------------------
     STEP 1
  ----------------------------------------- */

  const handleContinue = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      setError("Please complete all fields.");
      return;
    }

    setError("");
    setStep(2);
  };

  /* -----------------------------------------
     STEP 2
  ----------------------------------------- */

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    axios
      .post(`${apiUrl}/signup`, form)
      .then(() => navigate("/home"))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
            "Unable to create your account. Please try again.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      {scenes.map((item, index) => (
        <div
          key={item.place}
          className={`
            absolute inset-0
            bg-cover bg-center
            transition-all duration-[1800ms]
            ease-in-out
            ${
              index === scene
                ? "scale-100 opacity-100"
                : "scale-110 opacity-0"
            }
          `}
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        />
      ))}

      {/* Cinematic overlays */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <span className="text-lg">
            ✦
          </span>

          <span className="text-[11px] font-medium tracking-[0.35em] sm:text-xs">
            GHUMAKKAD
          </span>
        </Link>

        <Link
          to="/login"
          className="text-[9px] tracking-[0.2em] text-white/70 transition hover:text-white sm:text-[10px]"
        >
          SIGN IN
        </Link>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="relative z-20 flex h-full w-full items-center justify-center px-4 sm:px-6">

        <div className="w-full max-w-[460px]">

          {/* =================================================
              HEADING
          ================================================= */}

          <div
            className="
              mb-5
              text-center
              sm:mb-6
            "
          >

            {error && (
              <p className="mb-4 text-center text-[10px] text-red-200">
                {error}
              </p>
            )}

            <div className="mb-2 flex items-center justify-center gap-3">

              <span className="h-px w-7 bg-white/50" />

              <span className="text-[8px] tracking-[0.4em] text-white/60">
                {scenes[scene].place}
              </span>

              <span className="h-px w-7 bg-white/50" />

            </div>


            <div className="relative h-[55px] overflow-hidden">

              {/* STEP 1 TITLE */}

              <h1
                className={`
                  absolute inset-x-0
                  font-serif
                  text-[38px]
                  leading-none
                  tracking-[-1.5px]
                  transition-all
                  duration-500
                  ${
                    step === 1
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-8 opacity-0"
                  }
                `}
              >
                Start your journey
                <span className="text-[#e7bd69]">
                  .
                </span>
              </h1>


              {/* STEP 2 TITLE */}

              <h1
                className={`
                  absolute inset-x-0
                  font-serif
                  text-[38px]
                  leading-none
                  tracking-[-1.5px]
                  transition-all
                  duration-500
                  ${
                    step === 2
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
              >
                Almost there
                <span className="text-[#e7bd69]">
                  .
                </span>
              </h1>

            </div>

          </div>


          {/* =================================================
              CARD
          ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[3px]
              border
              border-white/25
              bg-black/25
              px-6
              py-6
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              backdrop-blur-[20px]
              sm:px-9
              sm:py-7
            "
          >

            {/* Top glow line */}

            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />


            {/* =================================================
                STEP 1
            ================================================= */}

            <div
              className={`
                transition-all
                duration-500
                ${
                  step === 1
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0 pointer-events-none absolute inset-x-6 top-6 sm:inset-x-9 sm:top-7"
                }
              `}
            >

              <form
                onSubmit={handleContinue}
                className="space-y-4"
              >

                {/* NAME */}

                <div>

                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="Your name"
                    className="
                      h-11
                      w-full
                      rounded-sm
                      border
                      border-white/15
                      bg-white/[0.07]
                      px-4
                      text-[13px]
                      text-white
                      outline-none
                      placeholder:text-white/30
                      transition
                      focus:border-white/50
                      focus:bg-white/[0.10]
                    "
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Email
                  </label>

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="
                      h-11
                      w-full
                      rounded-sm
                      border
                      border-white/15
                      bg-white/[0.07]
                      px-4
                      text-[13px]
                      text-white
                      outline-none
                      placeholder:text-white/30
                      transition
                      focus:border-white/50
                      focus:bg-white/[0.10]
                    "
                  />

                </div>


                {/* ADDRESS */}

                <div>

                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Address
                  </label>

                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="Your address"
                    className="
                      h-11
                      w-full
                      rounded-sm
                      border
                      border-white/15
                      bg-white/[0.07]
                      px-4
                      text-[13px]
                      text-white
                      outline-none
                      placeholder:text-white/30
                      transition
                      focus:border-white/50
                      focus:bg-white/[0.10]
                    "
                  />

                </div>


                {/* CONTINUE */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    mt-2
                    flex
                    h-12
                    w-full
                    items-center
                    justify-between
                    rounded-sm
                    bg-white
                    px-5
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#e7bd69]
                    disabled:cursor-not-allowed disabled:opacity-60
                  "
                >

                  <span className="text-[9px] font-medium tracking-[0.3em]">
                    CONTINUE
                  </span>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </button>

              </form>

            </div>


            {/* =================================================
                STEP 2
            ================================================= */}

            <div
              className={`
                transition-all
                duration-500
                ${
                  step === 2
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0 pointer-events-none absolute inset-x-6 top-6 sm:inset-x-9 sm:top-7"
                }
              `}
            >

              <form
                onSubmit={handleCreateAccount}
                className="space-y-4"
              >

                {/* EMAIL */}

                <div>

                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Email
                  </label>

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="
                      h-11
                      w-full
                      rounded-sm
                      border
                      border-white/15
                      bg-white/[0.07]
                      px-4
                      text-[13px]
                      text-white
                      outline-none
                      placeholder:text-white/30
                      transition
                      focus:border-white/50
                      focus:bg-white/[0.10]
                    "
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <label className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="
                        h-11
                        w-full
                        rounded-sm
                        border
                        border-white/15
                        bg-white/[0.07]
                        px-4
                        pr-16
                        text-[13px]
                        text-white
                        outline-none
                        placeholder:text-white/30
                        transition
                        focus:border-white/50
                        focus:bg-white/[0.10]
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[8px]
                        uppercase
                        tracking-widest
                        text-white/40
                        hover:text-white
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* CREATE */}

                <button
                  type="submit"
                  className="
                    group
                    mt-2
                    flex
                    h-12
                    w-full
                    items-center
                    justify-between
                    rounded-sm
                    bg-white
                    px-5
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#e7bd69]
                  "
                >

                  <span className="text-[9px] font-medium tracking-[0.3em]">
                    {isSubmitting ? "CREATING ACCOUNT..." : "ENTER THE JOURNEY"}
                  </span>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </button>


                {/* BACK */}

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="
                    mx-auto
                    block
                    text-[8px]
                    tracking-[0.25em]
                    text-white/40
                    transition
                    hover:text-white
                  "
                >
                  ← BACK
                </button>

              </form>

            </div>


            {/* Terms */}

            <p className="mt-4 text-center text-[8px] text-white/30">
              By continuing, you agree to our terms.
            </p>

          </div>


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="mt-5 flex items-center justify-center gap-2">

            <span
              className={`
                h-[2px]
                transition-all
                duration-500
                ${step === 1 ? "w-8 bg-white" : "w-2 bg-white/30"}
              `}
            />

            <span
              className={`
                h-[2px]
                transition-all
                duration-500
                ${step === 2 ? "w-8 bg-white" : "w-2 bg-white/30"}
              `}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CORNER DETAILS
      ===================================================== */}

      <div className="absolute bottom-5 left-5 z-20 hidden text-[8px] tracking-[0.3em] text-white/35 sm:block">
        28.6139° N · 77.2090° E
      </div>

      <div className="absolute bottom-5 right-5 z-20 hidden text-[8px] tracking-[0.3em] text-white/35 sm:block">
        THE WORLD IS WAITING
      </div>

    </main>
  );
}