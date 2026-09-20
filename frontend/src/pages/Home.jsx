import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const scenes = [
  { name: "Manali", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=90", line: "Mountains that make you slow down." },
  { name: "Varanasi", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=2400&q=90", line: "Where every evening feels timeless." },
  { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2400&q=90", line: "Salt in the air. Nothing on the clock." },
  { name: "Ladakh", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=2400&q=90", line: "Roads that disappear into the mountains." },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const timer = setInterval(() => setCurrent((value) => (value + 1) % scenes.length), 5500); return () => clearInterval(timer); }, []);

  return <main className="cinema-home text-white"><div className="absolute inset-0">{scenes.map((scene, index) => <div key={scene.name} className={`scene-image ${index === current ? "scene-image-active" : ""}`} style={{ backgroundImage: `url(${scene.image})` }} />)}<div className="scene-shade" /></div><header className="relative z-10 flex items-center justify-between px-6 py-7 md:px-14"><span className="brand-mark">✦ CHALO GHUMTE HAI</span><Link to="/plan-trip" className="quiet-link">Plan a trip ↗</Link></header><section className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col justify-center px-6 pb-24 md:px-[10vw]"><p className="eyebrow">Travel differently</p><h1 className="hero-title mt-7">चलो<br /><span>घूमते हैं<span className="text-[#e9c46a]">.</span></span></h1><p className="mt-8 max-w-sm text-base leading-7 text-white/65">You bring the destination. We build the journey around you.</p><Link to="/plan-trip" className="gold-button mt-9 w-fit">Plan my journey <span>↗</span></Link></section><footer className="absolute bottom-8 left-6 right-6 z-10 flex items-end justify-between md:left-14 md:right-14"><span className="hidden text-[10px] uppercase tracking-[.3em] text-white/45 sm:block">A journey, not a checklist</span><div className="text-right"><p className="eyebrow">Currently exploring</p><p className="mt-2 font-serif text-xl">{scenes[current].name}</p><p className="mt-1 text-sm text-white/50">{scenes[current].line}</p></div></footer></main>;
}
