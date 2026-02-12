import { motion } from 'framer-motion';

const tools = [
  { name: 'ChatGPT', emoji: '🤖' },
  { name: 'Claude', emoji: '🧠' },
  { name: 'Midjourney', emoji: '🎨' },
  { name: 'Cursor', emoji: '💻' },
  { name: 'Notion AI', emoji: '📝' },
  { name: 'Perplexity', emoji: '🔍' },
  { name: 'Gemini', emoji: '✨' },
  { name: 'Copilot', emoji: '🚀' },
  { name: 'Lovable', emoji: '💜' },
  { name: 'v0', emoji: '⚡' },
  { name: 'Gamma', emoji: '📊' },
  { name: 'Runway', emoji: '🎬' },
  { name: 'ElevenLabs', emoji: '🎙️' },
  { name: 'Zapier', emoji: '🔗' },
  { name: 'Make', emoji: '⚙️' },
  { name: 'Bolt', emoji: '🔩' },
];

const doubledTools = [...tools, ...tools];

export function ToolsMarquee() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/20">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-mono text-muted-foreground uppercase tracking-widest"
        >
          Herramientas que dominarás
        </motion.p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { duration: 40, repeat: Infinity, ease: 'linear' },
          }}
        >
          {doubledTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/40 border border-border/30 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shrink-0"
            >
              <span className="text-xl">{tool.emoji}</span>
              <span className="text-sm font-medium text-foreground/80">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: { duration: 45, repeat: Infinity, ease: 'linear' },
          }}
        >
          {[...doubledTools].reverse().map((tool, i) => (
            <div
              key={`rev-${tool.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/40 border border-border/30 backdrop-blur-sm hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shrink-0"
            >
              <span className="text-xl">{tool.emoji}</span>
              <span className="text-sm font-medium text-foreground/80">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
