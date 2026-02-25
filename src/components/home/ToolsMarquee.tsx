import { motion } from 'framer-motion';
import { useState } from 'react';

const tools = [
  { name: 'ChatGPT', emoji: '🤖', hue: 160 },
  { name: 'Claude', emoji: '🧠', hue: 263 },
  { name: 'Perplexity', emoji: '🔍', hue: 200 },
  { name: 'Gemini', emoji: '✨', hue: 45 },
  { name: 'Manus', emoji: '🤝', hue: 340 },
  { name: 'Lovable', emoji: '💜', hue: 280 },
  { name: 'Supabase', emoji: '🗄️', hue: 160 },
  { name: 'GitHub', emoji: '🐙', hue: 200 },
  { name: 'Cursor', emoji: '💻', hue: 263 },
  { name: 'Claude Code', emoji: '⌨️', hue: 45 },
  { name: 'Codex', emoji: '🔧', hue: 120 },
  { name: 'Gamma', emoji: '📊', hue: 340 },
  { name: 'Beautiful.ai', emoji: '🎯', hue: 200 },
  { name: 'Napkin', emoji: '🗒️', hue: 160 },
  { name: 'Canva', emoji: '🖼️', hue: 263 },
  { name: 'Colors', emoji: '🎨', hue: 340 },
  { name: 'Font Joy', emoji: '🔤', hue: 45 },
  { name: 'Airtable', emoji: '📋', hue: 200 },
  { name: 'Excel Labs', emoji: '📈', hue: 160 },
  { name: 'Notebook LM', emoji: '📓', hue: 263 },
  { name: 'Zapier', emoji: '⚡', hue: 45 },
  { name: 'App Script', emoji: '📜', hue: 120 },
  { name: 'Bitwarden', emoji: '🔐', hue: 200 },
  { name: 'Granola', emoji: '🎙️', hue: 340 },
  { name: 'Faces App', emoji: '🏠', hue: 160 },
  { name: 'HubSpot', emoji: '📇', hue: 45 },
  { name: 'Mapbox', emoji: '🗺️', hue: 200 },
  { name: 'Vercel', emoji: '▲', hue: 263 },
  { name: 'Mistral AI', emoji: '🌀', hue: 340 },
  { name: 'Read.ai', emoji: '👂', hue: 160 },
  { name: 'Miro', emoji: '🧩', hue: 45 },
  { name: 'Coolors', emoji: '🎨', hue: 340 },
  { name: 'Nivo Charts', emoji: '📊', hue: 200 },
  { name: 'Resend', emoji: '📨', hue: 263 },
  { name: 'React PDF', emoji: '📄', hue: 160 },
  { name: 'Power Apps', emoji: '⚡', hue: 45 },
  { name: 'Opus Clip', emoji: '🎬', hue: 340 },
  { name: 'Crea AI', emoji: '🖌️', hue: 263 },
  { name: 'Bolt', emoji: '⚡', hue: 45 },
  { name: 'Plotly', emoji: '📉', hue: 200 },
  { name: 'Playwright', emoji: '🎭', hue: 160 },
  { name: 'Clean Email', emoji: '🧹', hue: 120 },
  { name: 'Notion', emoji: '📝', hue: 263 },
  { name: 'Figma', emoji: '🎨', hue: 340 },
  { name: 'Krea.ai', emoji: '🖼️', hue: 200 },
  { name: 'Fontjoy', emoji: '🔤', hue: 45 },
  { name: 'Realtime Colors', emoji: '🎨', hue: 160 },
];

const doubledTools = [...tools, ...tools];

export function ToolsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="py-16 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Atmospheric depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-card/30 to-background" />
      <div className="absolute inset-0 constellation-dots opacity-30" />

      {/* Top + bottom holographic borders */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(152 70% 55% / 0.15), hsl(263 60% 55% / 0.12), hsl(340 60% 55% / 0.1), transparent)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(340 60% 55% / 0.1), hsl(174 60% 50% / 0.12), hsl(152 70% 55% / 0.15), transparent)' }}
      />

      <div className="container mx-auto px-4 relative mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-primary/60 bg-primary/5 border border-primary/10 mb-3">
            STACK COMPLETO
          </span>
          <p className="text-[11px] font-mono text-muted-foreground/40 tracking-[0.15em]">
            +35 herramientas cubiertas desde Gen 003 — cada una tiene su rol
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-3 sm:gap-4 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ x: { duration: 40, repeat: Infinity, ease: 'linear' } }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {doubledTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl glass-pill hover:bg-white/[0.06] transition-all duration-300 shrink-0 relative overflow-hidden"
              style={{ borderColor: `hsl(${tool.hue} 70% 55% / 0.08)` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 20px hsl(${tool.hue} 70% 55% / 0.06), 0 0 12px hsl(${tool.hue} 70% 55% / 0.08)` }}
              />
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">{tool.emoji}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div className="relative mt-3 sm:mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-3 sm:gap-4 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ x: { duration: 45, repeat: Infinity, ease: 'linear' } }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {[...doubledTools].reverse().map((tool, i) => (
            <div
              key={`rev-${tool.name}-${i}`}
              className="group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl glass-pill hover:bg-white/[0.06] transition-all duration-300 shrink-0 relative overflow-hidden"
              style={{ borderColor: `hsl(${tool.hue} 70% 55% / 0.08)` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 20px hsl(${tool.hue} 70% 55% / 0.06), 0 0 12px hsl(${tool.hue} 70% 55% / 0.08)` }}
              />
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">{tool.emoji}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Counter stat at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 relative mt-6"
      >
        <div className="flex items-center justify-center gap-6 text-center">
          {[
            { value: '47', label: 'Herramientas', hue: 160 },
            { value: '$0-25', label: 'USD/mes', hue: 45 },
            { value: '11', label: 'Generaciones', hue: 263 },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="stat-serif text-lg" style={{ color: `hsl(${stat.hue} 70% 55%)` }}>{stat.value}</span>
              <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
