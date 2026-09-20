import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Cloud,
  CloudSun,
  Sun,
  Navigation,
  Clock3,
  Sparkles,
  Plane,
  Train,
  Bus,
  Car,
  Hotel,
  Utensils,
  Camera,
  Compass,
  Route,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const transportIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
  car: Car,
  taxi: Car,
};

export default function TripResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const trip = state?.trip;

  const [openDay, setOpenDay] = useState(0);

  // ------------------------------------------
  // SAFETY: Prevent undefined/null crashes
  // ------------------------------------------

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Compass className="mx-auto mb-5 h-14 w-14 text-orange-400" />

          <h1 className="text-3xl font-bold mb-3">
            No trip found
          </h1>

          <p className="text-white/50 mb-7">
            Your trip information isn't available anymore. Create a new
            journey to continue.
          </p>

          <button
            onClick={() => navigate("/plan-trip")}
            className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 transition font-semibold"
          >
            Plan a new trip
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // NORMALIZE BACKEND DATA
  // ------------------------------------------

  const destination =
    trip.destination ||
    trip.city ||
    trip.location ||
    "Your Destination";

  const startingPoint =
    trip.starting_point ||
    trip.startingPoint ||
    trip.from ||
    "Your Starting Point";

  const days =
    Number(trip.days) ||
    Number(trip.duration) ||
    trip.itinerary?.length ||
    1;

  const travelers =
    Number(trip.travelers) ||
    Number(trip.people) ||
    1;

  const budget =
    trip.budget ||
    trip.estimated_budget ||
    trip.total_budget ||
    "—";

  const weather = trip.weather || {};

  const temperature =
    weather.temperature ??
    weather.temp ??
    weather.temperature_c ??
    weather.current_temperature ??
    "—";

  const weatherCondition =
    weather.condition ??
    weather.description ??
    weather.weather ??
    "Weather information unavailable";

  const weatherIcon =
    String(weatherCondition).toLowerCase().includes("rain")
      ? CloudSun
      : String(weatherCondition).toLowerCase().includes("sun")
      ? Sun
      : Cloud;

  const WeatherIcon = weatherIcon;

  const route = trip.route || trip.travel_route || {};

  const recommendedTransport =
    route.recommended_transport ||
    route.recommendedTransport ||
    route.transport ||
    trip.transport ||
    "Flexible";

  const routeDistance =
    route.distance ||
    route.total_distance ||
    route.km ||
    "—";

  const routeDuration =
    route.duration ||
    route.travel_time ||
    route.time ||
    "—";

  const itinerary = Array.isArray(trip.itinerary)
    ? trip.itinerary
    : Array.isArray(trip.days)
    ? trip.days
    : [];

  // ------------------------------------------
  // HELPER
  // ------------------------------------------

  const getTransportIcon = () => {
    const value = String(recommendedTransport).toLowerCase();

    if (value.includes("flight") || value.includes("plane")) {
      return Plane;
    }

    if (value.includes("train")) {
      return Train;
    }

    if (value.includes("bus")) {
      return Bus;
    }

    return Car;
  };

  const TransportIcon = getTransportIcon();

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-300px] left-[-200px] w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full" />

        <div className="absolute top-[30%] right-[-250px] w-[600px] h-[600px] bg-purple-500/10 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-300px] left-[20%] w-[700px] h-[500px] bg-blue-500/5 blur-[160px] rounded-full" />
      </div>

      {/* ========================================
          NAVBAR
      ======================================== */}

      <nav className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">

          <button
            onClick={() => navigate("/plan-trip")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={19} />
            <span className="hidden sm:block">
              Plan another trip
            </span>
          </button>

          <div className="font-bold tracking-tight text-lg">
            CHALO <span className="text-orange-400">GHUMTE HAI</span>
          </div>

          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Sparkles size={16} />
            AI Trip
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">

        {/* ========================================
            HERO
        ======================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 md:p-12"
        >

          {/* Decorative circles */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10" />

          <div className="relative">

            <div className="flex items-center gap-2 text-orange-400 text-sm font-medium mb-5">
              <Sparkles size={16} />
              YOUR AI-GENERATED JOURNEY
            </div>

            <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[0.95] max-w-4xl">
              Let's go to{" "}
              <span className="text-orange-400">
                {destination}
              </span>
              .
            </h1>

            <p className="mt-6 text-white/50 max-w-2xl text-base md:text-lg leading-relaxed">
              Your personalized journey is ready. We've organized
              your route, weather, budget and day-by-day experiences
              into one simple travel plan.
            </p>

            {/* Trip quick information */}

            <div className="flex flex-wrap gap-3 mt-9">

              <InfoPill
                icon={CalendarDays}
                text={`${days} ${days === 1 ? "Day" : "Days"}`}
              />

              <InfoPill
                icon={Users}
                text={`${travelers} ${
                  travelers === 1 ? "Traveler" : "Travelers"
                }`}
              />

              <InfoPill
                icon={Wallet}
                text={
                  typeof budget === "number"
                    ? `₹${budget.toLocaleString("en-IN")}`
                    : String(budget)
                }
              />

            </div>
          </div>
        </motion.section>

        {/* ========================================
            STATS
        ======================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
        >

          {/* Weather */}

          <InfoCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm">
                  Weather
                </p>

                <p className="text-2xl font-semibold mt-2">
                  {temperature}
                </p>

                <p className="text-white/50 text-sm mt-1 capitalize">
                  {weatherCondition}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-400/10 flex items-center justify-center">
                <WeatherIcon
                  size={27}
                  className="text-blue-300"
                />
              </div>
            </div>
          </InfoCard>

          {/* Route */}

          <InfoCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm">
                  Recommended Route
                </p>

                <p className="text-xl font-semibold mt-2 capitalize">
                  {String(recommendedTransport)}
                </p>

                <p className="text-white/50 text-sm mt-1">
                  {routeDistance !== "—"
                    ? `${routeDistance}`
                    : "Route details available"}
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-400/10 flex items-center justify-center">
                <TransportIcon
                  size={27}
                  className="text-orange-300"
                />
              </div>
            </div>
          </InfoCard>

          {/* Travel Time */}

          <InfoCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm">
                  Travel Time
                </p>

                <p className="text-2xl font-semibold mt-2">
                  {routeDuration}
                </p>

                <p className="text-white/50 text-sm mt-1">
                  Estimated journey
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center">
                <Clock3
                  size={27}
                  className="text-purple-300"
                />
              </div>
            </div>
          </InfoCard>

        </motion.section>

        {/* ========================================
            ROUTE
        ======================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-5 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-6 md:p-8"
        >

          <div className="flex items-center gap-3 mb-7">

            <div className="w-11 h-11 rounded-xl bg-orange-400/10 flex items-center justify-center">
              <Route
                size={20}
                className="text-orange-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Your Route
              </h2>

              <p className="text-sm text-white/40">
                How your journey begins
              </p>
            </div>

          </div>

          <div className="flex items-center">

            <div className="flex items-center gap-4 min-w-0">

              <div className="w-3 h-3 rounded-full bg-white shrink-0" />

              <div>
                <p className="text-xs text-white/40">
                  STARTING FROM
                </p>

                <p className="font-medium truncate">
                  {startingPoint}
                </p>
              </div>

            </div>

            <div className="flex-1 mx-5 relative">

              <div className="border-t border-dashed border-white/20" />

              <Navigation
                size={17}
                className="absolute left-1/2 -translate-x-1/2 -top-2.5 text-orange-400"
              />

            </div>

            <div className="flex items-center gap-4 min-w-0">

              <MapPin
                size={20}
                className="text-orange-400 shrink-0"
              />

              <div>
                <p className="text-xs text-white/40">
                  DESTINATION
                </p>

                <p className="font-medium truncate">
                  {destination}
                </p>
              </div>

            </div>

          </div>
        </motion.section>

        {/* ========================================
            ITINERARY
        ======================================== */}

        <section className="mt-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-orange-400 text-sm font-medium mb-3">
              THE ADVENTURE
            </p>

            <h2 className="text-4xl md:text-5xl font-serif">
              Your journey,
              <br />
              <span className="text-white/40">
                day by day.
              </span>
            </h2>
          </motion.div>

          <div className="mt-8 space-y-4">

            {itinerary.length > 0 ? (

              itinerary.map((day, index) => {

                const dayNumber =
                  day.day ||
                  day.day_number ||
                  index + 1;

                const title =
                  day.title ||
                  day.name ||
                  day.theme ||
                  `Day ${dayNumber}`;

                const activities =
                  Array.isArray(day.activities)
                    ? day.activities
                    : Array.isArray(day.places)
                    ? day.places
                    : Array.isArray(day.plan)
                    ? day.plan
                    : [];

                const description =
                  day.description ||
                  day.summary ||
                  "";

                const isOpen = openDay === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="border border-white/10 rounded-[1.5rem] overflow-hidden bg-white/[0.025]"
                  >

                    {/* DAY HEADER */}

                    <button
                      onClick={() =>
                        setOpenDay(
                          isOpen ? -1 : index
                        )
                      }
                      className="w-full p-5 md:p-6 flex items-center gap-5 text-left hover:bg-white/[0.035] transition"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-orange-400/10 flex items-center justify-center shrink-0">

                        <span className="text-orange-400 font-bold">
                          {String(dayNumber).padStart(
                            2,
                            "0"
                          )}
                        </span>

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="text-xs text-orange-400 uppercase tracking-wider">
                          Day {dayNumber}
                        </p>

                        <h3 className="text-lg md:text-xl font-semibold mt-1 truncate">
                          {title}
                        </h3>

                      </div>

                      <motion.div
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                      >
                        <ChevronDown
                          size={20}
                          className="text-white/40"
                        />
                      </motion.div>

                    </button>

                    {/* DAY CONTENT */}

                    {isOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="px-5 md:px-6 pb-6"
                      >

                        {description && (
                          <p className="text-white/50 leading-relaxed mb-6 max-w-3xl">
                            {description}
                          </p>
                        )}

                        {activities.length > 0 ? (

                          <div className="space-y-3">

                            {activities.map(
                              (activity, activityIndex) => {

                                const activityText =
                                  typeof activity ===
                                  "string"
                                    ? activity
                                    : activity?.name ||
                                      activity?.activity ||
                                      activity?.place ||
                                      activity?.description ||
                                      "Explore this place";

                                const time =
                                  typeof activity ===
                                  "object"
                                    ? activity?.time ||
                                      activity?.timing ||
                                      ""
                                    : "";

                                return (
                                  <div
                                    key={
                                      activityIndex
                                    }
                                    className="flex gap-4 p-4 rounded-xl bg-black/30 border border-white/5"
                                  >

                                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                      {activityIndex ===
                                      0 ? (
                                        <Camera
                                          size={17}
                                          className="text-orange-300"
                                        />
                                      ) : activityIndex ===
                                        1 ? (
                                        <Utensils
                                          size={17}
                                          className="text-orange-300"
                                        />
                                      ) : (
                                        <MapPin
                                          size={17}
                                          className="text-orange-300"
                                        />
                                      )}
                                    </div>

                                    <div className="flex-1">

                                      <p className="text-white/80">
                                        {activityText}
                                      </p>

                                      {time && (
                                        <p className="text-xs text-white/35 mt-1">
                                          {time}
                                        </p>
                                      )}

                                    </div>

                                  </div>
                                );
                              }
                            )}

                          </div>

                        ) : (

                          <div className="p-5 rounded-xl bg-black/20 text-white/40">
                            Explore {destination} and
                            enjoy your day.
                          </div>

                        )}

                      </motion.div>
                    )}

                  </motion.div>
                );
              })

            ) : (

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 text-center">

                <Compass
                  size={35}
                  className="mx-auto text-orange-400 mb-4"
                />

                <h3 className="text-xl font-semibold">
                  Your itinerary is being prepared
                </h3>

                <p className="text-white/40 mt-2">
                  The destination details were received,
                  but no day-by-day itinerary was returned.
                </p>

              </div>

            )}

          </div>
        </section>

        {/* ========================================
            FINAL CTA
        ======================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-14 rounded-[2rem] border border-orange-400/20 bg-gradient-to-br from-orange-400/10 via-white/[0.03] to-transparent p-8 md:p-12 text-center"
        >

          <Sparkles
            className="mx-auto text-orange-400 mb-5"
            size={28}
          />

          <h2 className="text-3xl md:text-4xl font-serif">
            Ready to make this trip real?
          </h2>

          <p className="text-white/40 mt-3 max-w-lg mx-auto">
            Pack your bags. The destination is waiting.
          </p>

          <button
            onClick={() => navigate("/plan-trip")}
            className="mt-7 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-semibold transition-all hover:scale-105"
          >
            Plan another adventure
          </button>

        </motion.section>

      </main>
    </div>
  );
}

/* ==========================================
   SMALL COMPONENTS
========================================== */

function InfoPill({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/30 border border-white/10 text-sm text-white/70">
      <Icon
        size={16}
        className="text-orange-400"
      />
      {text}
    </div>
  );
}

function InfoCard({ children }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
      {children}
    </div>
  );
}