// src/pages/Home.jsx
// Needs: react-router-dom, framer-motion, Tailwind CSS.
// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght,wdth@12..96,400..800,75..100&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const C = { mint: "#dcebe3", pine: "#0c3b38", sun: "#f4b73a", coral: "#ee6a5f", ink: "#10201e" };
const display = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" };

// Dummy data (move to src/data later)
const destinations = [
  { id: 1, name: "Hunza Valley", country: "Pakistan", cat: "Mountains", blurb: "Apricot orchards under 7,000 m peaks.", bg: C.pine, fg: C.mint },
  { id: 2, name: "Santorini", country: "Greece", cat: "Beach", blurb: "White cliffs, blue domes, slow sunsets.", bg: C.sun, fg: C.ink },
  { id: 3, name: "Kyoto", country: "Japan", cat: "Historical", blurb: "Temples, tea houses and lantern lanes.", bg: C.coral, fg: C.ink },
  { id: 4, name: "Cusco", country: "Peru", cat: "Adventure", blurb: "The gateway to Machu Picchu.", bg: C.ink, fg: C.sun },
];
const packages = [
  { id: 1, name: "Karakoram Weekender", where: "Hunza Valley", days: 5, price: 420 },
  { id: 2, name: "Aegean Sunset Escape", where: "Santorini", days: 7, price: 980 },
  { id: 3, name: "Old Capital Walks", where: "Kyoto", days: 6, price: 1150 },
];
const highlights = [
  ["Save what you love", "Tap the heart on any destination. Your list stays on this device."],
  ["Compare before you book", "Search tours, then narrow them by price and category."],
  ["Plan with real steps", "Each package lists a day-by-day plan and what is included."],
];
const tips = [
  ["Safety", "Share your itinerary with someone at home."],
  ["Packing", "Roll clothes and carry one layer for cold evenings."],
  ["Budget", "Travel in shoulder season for cheaper stays."],
];

// Fades a section in once as it enters the viewport
const Reveal = ({ children, className = "" }) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

const Button = ({ to, children, dark }) => (
  <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="inline-block">
    <Link
      to={to}
      className="inline-block rounded-full px-7 py-3 font-semibold outline-offset-4 focus-visible:outline focus-visible:outline-2"
      style={{ background: dark ? C.pine : C.sun, color: dark ? C.mint : C.ink }}
    >
      {children}
    </Link>
  </motion.span>
);

export default function Home() {
  return (
    <main style={{ background: C.mint, color: C.ink, fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
      {/* HERO: a route that draws itself across the page */}
      <header className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-16 pt-14 md:pt-24">
        <motion.h1
          style={display}
          className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Pick a place.
          <br />
          We hand you the route.
        </motion.h1>
        <motion.p className="mt-6 max-w-md text-lg leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Browse destinations, compare tour packages and save the trips you can't stop thinking about.
        </motion.p>
        <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <Button to="/destinations">Explore destinations</Button>
          <Button to="/packages" dark>See tour packages</Button>
        </motion.div>

        <svg viewBox="0 0 900 200" className="mt-14 w-full" aria-hidden="true">
          <motion.path
            d="M10 150 C 150 20, 250 20, 330 110 S 520 200, 600 90 S 800 10, 890 60"
            fill="none" stroke={C.pine} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.8, ease: "easeInOut" }}
          />
          {[[10, 150, "Lahore"], [330, 110, "Hunza"], [600, 90, "Kyoto"], [890, 60, "Cusco"]].map(([x, y, t], i) => (
            <motion.g key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.7 }}>
              <circle cx={x} cy={y} r="9" fill={i === 0 ? C.coral : C.sun} stroke={C.pine} strokeWidth="3" />
              <text x={Math.min(x, 840)} y={y + 32} fill={C.ink} fontSize="15" fontWeight="600" style={display}>{t}</text>
            </motion.g>
          ))}
        </svg>
      </header>

      {/* FEATURED DESTINATIONS: postcards, each with its own colour */}
      <Reveal className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 style={display} className="text-4xl font-bold md:text-5xl">Where people are heading</h2>
          <Link to="/destinations" className="font-semibold underline underline-offset-4">All destinations</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <motion.div key={d.id} initial={{ rotate: i % 2 ? 1.5 : -1.5 }} whileHover={{ rotate: 0, y: -6 }}>
              <Link
                to={`/destinations/${d.id}`}
                className="flex h-72 flex-col justify-between p-5 outline-offset-4 focus-visible:outline focus-visible:outline-2"
                style={{ background: d.bg, color: d.fg, borderRadius: i % 2 ? "2rem 0.5rem 2rem 0.5rem" : "0.5rem 2rem 0.5rem 2rem" }}
              >
                <span className="self-start rounded-full border px-3 py-1 text-sm" style={{ borderColor: d.fg }}>{d.cat}</span>
                <div>
                  <h3 style={display} className="text-3xl font-bold leading-tight">{d.name}</h3>
                  <p className="text-sm font-semibold opacity-80">{d.country}</p>
                  <p className="mt-2 text-sm">{d.blurb}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* POPULAR PACKAGES: a plain ledger, not more cards */}
      <Reveal className="px-5 py-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] p-6 md:p-12" style={{ background: C.pine, color: C.mint }}>
          <h2 style={display} className="mb-8 text-4xl font-bold md:text-5xl">Tours that are ready to go</h2>
          <ul>
            {packages.map((p) => (
              <motion.li key={p.id} whileHover={{ x: 8 }} className="border-t" style={{ borderColor: "#dcebe355" }}>
                <Link to={`/packages/${p.id}`} className="grid grid-cols-[1fr_auto] items-center gap-2 py-5 md:grid-cols-[2fr_1fr_1fr_auto] md:gap-6">
                  <span style={display} className="text-2xl font-semibold">{p.name}</span>
                  <span className="order-3 text-sm opacity-80 md:order-none">{p.where} · {p.days} days</span>
                  <span className="order-4 font-semibold md:order-none" style={{ color: C.sun }}>From ${p.price}</span>
                  <span className="col-start-2 row-start-1 rounded-full px-4 py-2 text-sm font-semibold md:col-auto md:row-auto" style={{ background: C.sun, color: C.ink }}>View details</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* HIGHLIGHTS */}
      <Reveal className="mx-auto max-w-6xl px-5 py-16">
        <h2 style={display} className="mb-10 max-w-xl text-4xl font-bold md:text-5xl">Built around how you plan</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {highlights.map(([t, d]) => (
            <div key={t} className="border-l-4 pl-5" style={{ borderColor: C.coral }}>
              <h3 style={display} className="text-2xl font-semibold">{t}</h3>
              <p className="mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* TRAVEL TIPS PREVIEW */}
      <Reveal className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 style={display} className="text-4xl font-bold">Before you pack</h2>
            <Link to="/travel-tips" className="mt-4 inline-block font-semibold underline underline-offset-4">Read all travel tips</Link>
          </div>
          <dl className="divide-y divide-[#10201e33]">
            {tips.map(([t, d]) => (
              <div key={t} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt style={display} className="text-xl font-semibold">{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* CALL TO ACTION */}
      <Reveal className="px-5 pb-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] px-6 py-14 text-center md:py-20" style={{ background: C.sun }}>
          <h2 style={display} className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">Your next trip starts with one saved place.</h2>
          <div className="mt-8"><Button to="/destinations" dark>Start exploring</Button></div>
        </div>
      </Reveal>

      {/* FOOTER */}
      <footer className="px-5 py-10" style={{ background: C.ink, color: C.mint }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p style={display} className="text-2xl font-bold">Tripora</p>
            <p className="text-sm opacity-70">An Allied Axis intern project. Demo data only.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {[["Destinations", "/destinations"], ["Packages", "/packages"], ["Favorites", "/favorites"], ["My Trips", "/my-trips"], ["About", "/about"], ["Contact", "/contact"]].map(([l, to]) => (
              <Link key={to} to={to} className="hover:underline">{l}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
