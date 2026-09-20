import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const interestOptions = ["Mountains", "Adventure", "Food", "Photography", "History", "Culture", "Nature", "Nightlife"];
const plannerScenes = [
  { name: "Himalayan mornings", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85" },
  { name: "Desert light", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85" },
  { name: "Coastal afternoons", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" },
];

export default function Planner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", starting_point: "", days: 4, budget: 15000, travelers: 2, travel_type: "friends", interests: [] });
  const [planning, setPlanning] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const toggleInterest = (interest) => setForm((current) => ({ ...current, interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest] }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.destination.trim() || !form.starting_point.trim()) return setError("Add both your starting point and destination.");
    setError("");
    setPlanning(true);
    try {
      const response = await fetch("http://localhost:8000/plan-trip", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, days: Number(form.days), budget: Number(form.budget), travelers: Number(form.travelers) }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        // FastAPI sends the exact exception in `detail`; keep it visible while developing.
        throw new Error(payload.detail || `Request failed with status ${response.status}`);
      }
      navigate("/trip", { state: { trip: payload.trip } });
    } catch (requestError) {
      console.error("[plan-trip]", requestError);
      setError(requestError.message || "Unable to plan your trip.");
    } finally { setPlanning(false); }
  };

  return <main className="app-shell min-h-screen px-5 py-5 text-[#f5f0e7] md:px-10 md:py-8">
    <header className="mx-auto flex max-w-6xl items-center justify-between"><Link to="/home" className="brand-mark">✦ CHALO GHUMTE HAI</Link><Link to="/home" className="quiet-link">Exit planner</Link></header>
    <section className="mx-auto max-w-6xl px-1 pb-16 pt-16 md:pt-24"><div className="planner-intro"><div><p className="eyebrow">01 / The trip brief</p><h1 className="display-title mt-5 max-w-3xl">Give us the feeling. We&apos;ll find the route.</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/55">A few details are enough to build a considered journey around your pace, people and budget.</p></div><div className="planner-scenes" aria-hidden="true">{plannerScenes.map((scene, index) => <div key={scene.name} className={`planner-scene planner-scene-${index + 1}`} style={{ backgroundImage: `url(${scene.image})` }}><span>{scene.name}</span></div>)}</div></div>
      <form onSubmit={handleSubmit} className="planner-panel mt-14">
        <div className="planner-section-heading"><span>01</span><p>Where are we going?</p></div><div className="grid gap-8 border-b border-white/10 p-7 pt-2 md:grid-cols-2 md:p-10 md:pt-2"><label className="field-label">Starting from<input name="starting_point" value={form.starting_point} onChange={handleChange} placeholder="Delhi, Mumbai, Lucknow..." /></label><label className="field-label">Taking me to<input name="destination" value={form.destination} onChange={handleChange} placeholder="Manali, Goa, Jaipur..." /></label></div>
        <div className="planner-section-heading"><span>02</span><p>Shape the pace</p></div><div className="grid gap-8 border-b border-white/10 p-7 pt-2 md:grid-cols-4 md:p-10 md:pt-2"><label className="field-label">Days<input type="number" min="1" max="30" name="days" value={form.days} onChange={handleChange} /></label><label className="field-label">Budget (INR)<input type="number" min="1000" name="budget" value={form.budget} onChange={handleChange} /></label><label className="field-label">Travelers<input type="number" min="1" max="20" name="travelers" value={form.travelers} onChange={handleChange} /></label><label className="field-label">Travelling as<select name="travel_type" value={form.travel_type} onChange={handleChange}><option value="solo">Solo</option><option value="couple">Couple</option><option value="friends">Friends</option><option value="family">Family</option></select></label></div>
        <div className="planner-section-heading"><span>03</span><p>Choose the mood</p></div><div className="p-7 pt-2 md:p-10 md:pt-2"><div className="flex flex-wrap gap-2">{interestOptions.map((interest) => <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`interest-pill ${form.interests.includes(interest) ? "interest-pill-active" : ""}`}>{interest}</button>)}</div></div>
        {error && <div className="border-t border-red-400/30 bg-red-400/5 px-7 py-4 text-sm text-red-200 md:px-10">{error}</div>}
        <button type="submit" disabled={planning} className="planner-submit">{planning ? "Building your journey..." : "Build my journey"}<span>↗</span></button>
      </form>
    </section>
  </main>;
}
