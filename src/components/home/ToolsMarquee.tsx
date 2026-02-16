import { motion } from 'framer-motion';
import { useState } from 'react';

const tools = [
  // IA Core
  { name: 'ChatGPT', emoji: '🤖' },
  { name: 'Claude', emoji: '🧠' },
  { name: 'Perplexity', emoji: '🔍' },
  { name: 'Gemini', emoji: '✨' },
  { name: 'Manus', emoji: '🤝' },
  // Vibe Coding
  { name: 'Lovable', emoji: '💜' },
  { name: 'Supabase', emoji: '🗄️' },
  { name: 'GitHub', emoji: '🐙' },
  { name: 'Cursor', emoji: '💻' },
  { name: 'Claude Code', emoji: '⌨️' },
  { name: 'Codex', emoji: '🔧' },
  // Presentaciones & Diseño
  { name: 'Gama', emoji: '📊' },
  { name: 'Beautiful.ai', emoji: '🎯' },
  { name: 'Napkin', emoji: '🗒️' },
  { name: 'Canva', emoji: '🖼️' },
  { name: 'Colors', emoji: '🎨' },
  { name: 'Font Joy', emoji: '🔤' },
  // Datos & Bases
  { name: 'Airtable', emoji: '📋' },
  { name: 'Excel Labs', emoji: '📈' },
  { name: 'Notebook LM', emoji: '📓' },
  // Automatización
  { name: 'Zapier', emoji: '⚡' },
  { name: 'App Script', emoji: '📜' },
  // Productividad
  { name: 'Bitwarden', emoji: '🔐' },
  { name: 'Granola', emoji: '🎙️' },
  { name: 'Faces App', emoji: '🏠' },
  { name: 'HubSpot', emoji: '📇' },
  { name: 'Mapbox', emoji: '🗺️' },
  { name: 'Vercel', emoji: '▲' },
  { name: 'Mistral AI', emoji: '🌀' },
  { name: 'Read.ai', emoji: '👂' },
  { name: 'Miro', emoji: '🧩' },
  { name: 'Coolors', emoji: '🎨' },
  { name: 'Nivo Charts', emoji: '📊' },
  { name: 'Resend', emoji: '📨' },
  { name: 'React PDF', emoji: '📄' },
  { name: 'Power Apps', emoji: '⚡' },
  { name: 'Opus Clip', emoji: '🎬' },
  { name: 'Crea AI', emoji: '🖌️' },
  { name: 'Bolt', emoji: '⚡' },
  { name: 'Plotly', emoji: '📉' },
  { name: 'Playwright', emoji: '🎭' },
  { name: 'Clean Email', emoji: '🧹' },
  { name: 'Notion', emoji: '📝' },
  { name: 'Figma', emoji: '🎨' },
  { name: 'Krea.ai', emoji: '🖼️' },
  { name: 'Fontjoy', emoji: '🔤' },
  { name: 'Realtime Colors', emoji: '🎨' },
];

const doubledTools = [...tools, ...tools];

export function ToolsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="py-16 relative overflow-hidden border-y border-white/[0.04]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-mono text-muted-foreground uppercase tracking-widest"
        >
          +40 herramientas cubiertas desde Gen 003 — cada una tiene su rol, desde USD $0 hasta USD $25/mes
        </motion.p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-4 sm:gap-6 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { duration: 40, repeat: Infinity, ease: 'linear' },
          }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {doubledTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl glass-pill hover:border-primary/15 hover:bg-white/[0.06] transition-all duration-300 shrink-0"
            >
              <span className="text-lg sm:text-xl">{tool.emoji}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground/80">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div className="relative mt-3 sm:mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-4 sm:gap-6 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: { duration: 45, repeat: Infinity, ease: 'linear' },
          }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {[...doubledTools].reverse().map((tool, i) => (
            <div
              key={`rev-${tool.name}-${i}`}
              className="flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl glass-pill hover:border-accent/15 hover:bg-white/[0.06] transition-all duration-300 shrink-0"
            >
              <span className="text-lg sm:text-xl">{tool.emoji}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground/80">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
