import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import StatsStrip from '../components/landing/StatsStrip'
import HowItWorks from '../components/landing/HowItWorks'
import Pricing from '../components/landing/Pricing'
import CTA from '../components/landing/CTA'
import ScrollProgress from '../components/fx/ScrollProgress'
import Spotlight from '../components/fx/Spotlight'
import Marquee from '../components/fx/Marquee'
import VideoBackground from '../components/fx/VideoBackground'

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI nutrition engine',
    description:
      'Evidence-based recovery rules turn workout type, intensity and fatigue into exact protein, carb and fluid targets.',
  },
  {
    icon: '💧',
    title: 'Hydration intelligence',
    description:
      'Dynamic fluid and electrolyte calculations tuned to session length, sweat load and recovery state.',
  },
  {
    icon: '📍',
    title: 'Nearby stores',
    description:
      'Real products at Lidl, Aldi and Rewe near you — matched to your macros and filtered by your actual budget.',
  },
  {
    icon: '💬',
    title: 'AI recovery coach',
    description:
      'Ask anything about your plan. Answers grounded in peer-reviewed sports nutrition, not TikTok trends.',
  },
  {
    icon: '📈',
    title: 'Recovery analytics',
    description:
      'See fatigue, intake and progress trends over time, so every training week gets smarter than the last.',
  },
  {
    icon: '🔒',
    title: 'Privacy by design',
    description:
      'GDPR-first architecture with explicit consent and EU hosting. Your health data stays yours.',
  },
]

export default function Home() {
  return (
    <main className="noise relative bg-[#07070f] text-white overflow-hidden">
      <VideoBackground opacity={0.5} />
      <div className="light-beam" />
      <div className="light-beam delay" />
      <ScrollProgress />
      <Spotlight />
      <Navbar />
      <Hero />
      <Marquee />
      <StatsStrip />
      <HowItWorks />

      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-2xl mb-16">
          <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Everything between
            <br />
            <span className="text-slate-500">the gym and the fridge.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      <Pricing />
      <CTA />
    </main>
  )
}
