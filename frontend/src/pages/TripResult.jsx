import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Plane,
  CloudSun,
  Sparkles,
  Bookmark,
  Compass,
  Clock3,
} from "lucide-react";

export default function TripResult() {
  const { state } = useLocation();
  const trip = state?.trip;

  if (!trip) {
    return (
      <main className="min-h-screen bg-[#061019] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#e8bd62] uppercase tracking-[0.3em] text-xs">
            No journey loaded
          </p>

          <h1 className="mt-5 font-serif text-5xl">
            Start with a destination.
          </h1>

          <Link
            to="/plan-trip"
            className="mt-8 inline-flex rounded-full bg-[#e9bd61] px-7 py-3 text-black"
          >
            Open planner
          </Link>
        </div>
      </main>
    );
  }

  const heroImage =
    trip.hero_image ||
    trip.image ||
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=90";

  return (
    <main className="min-h-screen overflow-hidden bg-[#061019] text-[#f7f2e8]">

      {/* atmospheric background */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#d89c45]/10 blur-[150px]" />
        <div className="absolute right-[-10%] top-[50%] h-[500px] w-[500px] rounded-full bg-[#315d73]/10 blur-[150px]" />
      </div>

      {/* NAVBAR */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">

          <Link
            to="/home"
            className="font-serif text-xl tracking-wide"
          >
            ✦ Chalo Ghumte Hai
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="hidden rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 backdrop-blur-md transition hover:bg-white/10 md:block"
            >
              Home
            </Link>

            <Link
              to="/plan-trip"
              className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white hover:text-black"
            >
              New journey
            </Link>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh]">

        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt={trip.destination}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061019] via-[#061019]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061019] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-end px-6 pb-20 md:px-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl"
          >

            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#e9bd61]">
              <Sparkles size={15} />
              Your journey is ready
            </div>

            <h1 className="font-serif text-7xl leading-[0.9] tracking-[-0.04em] md:text-[9rem]">
              {trip.destination}
            </h1>

            {trip.tagline && (
              <p className="mt-6 font-serif text-2xl italic text-[#e9bd61] md:text-3xl">
                {trip.tagline}
              </p>
            )}

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {trip.trip_summary}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-5 py-3 backdrop-blur-xl">
                <CalendarDays size={15} className="text-[#e9bd61]" />
                {trip.itinerary?.length || 0} Days
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-5 py-3 backdrop-blur-xl">
                <MapPin size={15} className="text-[#e9bd61]" />
                {trip.destination}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-5 py-3 backdrop-blur-xl">
                <Compass size={15} className="text-[#e9bd61]" />
                Custom Plan
              </div>

            </div>

          </motion.div>

        </div>

        <div className="absolute bottom-8 right-8 hidden text-xs uppercase tracking-[0.3em] text-white/40 md:block">
          Scroll to explore ↓
        </div>

      </section>

      {/* QUICK INFO */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 md:px-10">

        <div className="grid gap-3 md:grid-cols-3">

          <InfoCard
            icon={<CloudSun />}
            label="Weather"
            title={trip.weather?.temperature || "Current"}
            subtitle={trip.weather?.condition}
            description={trip.weather?.summary}
          />

          <InfoCard
            icon={<Plane />}
            label="Getting there"
            title={trip.route?.recommended_transport || "Explore"}
            subtitle="Recommended route"
            description={trip.route?.summary}
          />

          <InfoCard
            icon={<Sparkles />}
            label="Trip mood"
            title={trip.trip_type || "Adventure"}
            subtitle="Made around you"
            description={trip.trip_summary}
          />

        </div>

      </section>

      {/* ITINERARY */}
      <section className="mx-auto max-w-7xl px-5 py-32 md:px-10">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#e9bd61]">
              The journey
            </p>

            <h2 className="mt-4 font-serif text-5xl md:text-7xl">
              Take the long way.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            Every day is arranged around places worth remembering,
            not simply places worth checking off.
          </p>

        </div>

        <div className="relative mt-20">

          {/* timeline line */}
          <div className="absolute left-[25px] top-0 hidden h-full w-px bg-gradient-to-b from-[#e9bd61] via-white/10 to-transparent md:block" />

          <div className="space-y-8">

            {trip.itinerary?.map((day, index) => (

              <motion.article
                key={day.day}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="relative grid gap-6 md:grid-cols-[70px_1fr]"
              >

                {/* day number */}
                <div className="relative z-10 hidden md:block">

                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#e9bd61]/50 bg-[#061019] text-sm text-[#e9bd61]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                </div>

                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-xl transition duration-500 hover:border-[#e9bd61]/30">

                  <div className="p-7 md:p-10">

                    <div className="flex items-start justify-between gap-5">

                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#e9bd61]">
                          Day {String(day.day).padStart(2, "0")}
                        </p>

                        <h3 className="mt-3 font-serif text-3xl md:text-4xl">
                          {day.title}
                        </h3>
                      </div>

                      <ArrowUpRight className="text-white/30" />

                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2">

                      {day.activities?.map((activity, activityIndex) => (

                        <div
                          key={activityIndex}
                          className="group rounded-2xl border border-white/8 bg-black/20 p-5 transition hover:bg-white/[0.06]"
                        >

                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#e9bd61]">
                            <Clock3 size={13} />
                            {activity.time}
                          </div>

                          <h4 className="mt-4 font-serif text-xl">
                            {activity.place}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-white/40">
                            {activity.description}
                          </p>

                          <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
                            <MapPin size={12} />
                            {activity.location || trip.destination}
                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>

      {/* EXPERIENCES */}
      {trip.top_experiences?.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-32 md:px-10">

          <p className="text-xs uppercase tracking-[0.35em] text-[#e9bd61]">
            Don't miss these
          </p>

          <h2 className="mt-4 font-serif text-5xl md:text-7xl">
            Experiences worth the detour.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            {trip.top_experiences.map((experience, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group min-h-[260px] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-7"
              >

                <span className="text-sm text-[#e9bd61]">
                  0{index + 1}
                </span>

                <h3 className="mt-16 font-serif text-3xl">
                  {experience.name || experience}
                </h3>

                {experience.description && (
                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {experience.description}
                  </p>
                )}

                <ArrowRight className="mt-8 text-white/30 transition group-hover:translate-x-2 group-hover:text-[#e9bd61]" />

              </motion.div>

            ))}

          </div>

        </section>
      )}

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10">

        <div className="relative overflow-hidden rounded-[32px] border border-[#e9bd61]/20 bg-gradient-to-r from-[#211a10] to-[#101923] p-8 md:p-14">

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>
              <p className="font-serif text-3xl italic text-[#e9bd61]">
                Ready for your next adventure?
              </p>

              <p className="mt-3 text-white/45">
                Save this journey or start somewhere completely new.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button className="flex items-center gap-2 rounded-full bg-[#e9bd61] px-7 py-3 text-sm font-medium text-black transition hover:scale-105">
                <Bookmark size={15} />
                Save Trip
              </button>

              <Link
                to="/plan-trip"
                className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm transition hover:bg-white hover:text-black"
              >
                Plan Another Trip
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


function InfoCard({
  icon,
  label,
  title,
  subtitle,
  description,
}) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group min-h-[230px] rounded-[26px] border border-white/10 bg-[#0b1b27]/90 p-7 backdrop-blur-2xl transition hover:border-[#e9bd61]/30"
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
          <span className="text-[#e9bd61]">
            {icon}
          </span>
          {label}
        </div>

        <ArrowUpRight
          size={18}
          className="text-white/20 transition group-hover:text-[#e9bd61]"
        />

      </div>

      <h3 className="mt-9 font-serif text-3xl">
        {title}
      </h3>

      <p className="mt-2 text-sm text-white/60">
        {subtitle}
      </p>

      <p className="mt-5 text-sm leading-6 text-white/35">
        {description}
      </p>

    </motion.article>
  );
}