import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Heart, Database, GitBranch, Code, Search, Layers, Zap, Send, FileCode, LayoutDashboard, Settings, Plus, Filter, MoreVertical, Play, Check, Clock, Users, TrendingUp, BarChart3, PieChart, Table2, ChevronDown, Star, Bell, MessageSquare, Folder, File, Terminal, Cpu, Globe, RefreshCw, Palette, Wand2, Eye, Download, Share2 } from 'lucide-react';

type Platform = 'gemini' | 'lovable' | 'cursor' | 'supabase' | 'github';

interface PlatformScreenshotProps {
  platform: Platform;
  variant?: 'full' | 'compact' | 'annotated';
  annotation?: string;
  className?: string;
  glowOnHover?: boolean;
  screenshotUrl?: string;
}

const platformConfig: Record<Platform, {
  name: string;
  icon: typeof Sparkles;
  color: string;
  bgGradient: string;
  borderColor: string;
}> = {
  gemini: {
    name: 'Gemini',
    icon: Sparkles,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 via-indigo-500/10 to-violet-500/20',
    borderColor: 'border-blue-500/30',
  },
  lovable: {
    name: 'Lovable',
    icon: Heart,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
    borderColor: 'border-pink-500/30',
  },
  supabase: {
    name: 'Supabase',
    icon: Database,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
  },
  github: {
    name: 'GitHub',
    icon: GitBranch,
    color: 'text-gray-300',
    bgGradient: 'from-gray-500/20 via-slate-500/10 to-zinc-500/20',
    borderColor: 'border-gray-500/30',
  },
  cursor: {
    name: 'Cursor',
    icon: Code,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
    borderColor: 'border-orange-500/30',
  },
};

// Dense Gemini mockup - ULTRA DENSE VERSION
function GeminiMockup() {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Search bar - compact */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[hsl(222_25%_12%)] border border-blue-500/20 shrink-0">
        <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
        <div className="flex-1 text-[10px] text-muted-foreground truncate">
          Diseña un dashboard de inventario con tabla, filtros y gráficos...
        </div>
        <div className="flex items-center gap-1">
          <div className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[8px] text-blue-400">Canvas</div>
          <Send className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>
      
      {/* Canvas output - FILLS ALL SPACE */}
      <div className="flex-1 rounded-lg bg-[hsl(222_25%_7%)] border border-blue-500/25 flex flex-col overflow-hidden min-h-0">
        {/* Canvas header */}
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/[0.08] bg-blue-500/[0.05] shrink-0">
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-semibold text-blue-400">Canvas Preview</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[8px] text-emerald-400">Live</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center">
              <Eye className="w-3 h-3 text-muted-foreground/60" />
            </div>
            <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center">
              <Download className="w-3 h-3 text-muted-foreground/60" />
            </div>
            <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center">
              <Share2 className="w-3 h-3 text-muted-foreground/60" />
            </div>
          </div>
        </div>
        
        {/* Preview content - DENSE UI ELEMENTS */}
        <div className="flex-1 p-2.5 flex flex-col gap-2 min-h-0 overflow-hidden">
          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-1.5 shrink-0">
            {[
              { label: 'Productos', value: '1,847', icon: BarChart3, iconClass: 'text-foreground/80' },
              { label: 'Ventas', value: '$12.4k', icon: TrendingUp, iconClass: 'text-foreground/80' },
              { label: 'Pedidos', value: '284', icon: Clock, iconClass: 'text-foreground/80' },
              { label: 'Usuarios', value: '3.2k', icon: Users, iconClass: 'text-foreground/80' },
            ].map((m, i) => (
              <div key={i} className="p-1.5 rounded bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-1 mb-0.5">
                  <m.icon className={cn('w-2.5 h-2.5', m.iconClass)} />
                  <span className="text-[7px] text-muted-foreground/70">{m.label}</span>
                </div>
                <span className="text-[10px] font-bold">{m.value}</span>
              </div>
            ))}
          </div>
          
          {/* Main content grid - FILLS REMAINING */}
          <div className="flex-1 grid grid-cols-3 gap-1.5 min-h-0">
            {/* Chart area */}
            <div className="col-span-2 rounded bg-white/[0.03] border border-white/[0.08] p-2 flex flex-col">
              <div className="flex items-center justify-between mb-1.5 shrink-0">
                <span className="text-[8px] font-semibold text-muted-foreground">Ventas Mensuales</span>
                <div className="flex gap-0.5">
                  {['1D', '1S', '1M'].map((t, i) => (
                    <span key={t} className={`px-1 py-0.5 rounded text-[6px] ${i === 2 ? 'bg-blue-500/20 text-blue-400' : 'text-muted-foreground/50'}`}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Chart bars - fill height */}
              <div className="flex-1 flex items-end gap-0.5 min-h-0">
                {[45, 72, 58, 85, 62, 78, 90, 68, 82, 95, 70, 88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500/60 to-blue-400/30" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            
            {/* Side panels */}
            <div className="flex flex-col gap-1.5">
              {/* Pie chart */}
              <div className="flex-1 rounded bg-white/[0.03] border border-white/[0.08] p-1.5 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500/40 border-t-emerald-400 border-r-blue-400 border-b-amber-400 mb-1" />
                <span className="text-[7px] text-muted-foreground">Por categoría</span>
              </div>
              {/* Activity */}
              <div className="flex-1 rounded bg-white/[0.03] border border-white/[0.08] p-1.5 flex flex-col">
                <span className="text-[7px] font-semibold text-muted-foreground mb-1 shrink-0">Actividad</span>
                <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                  {['Ana', 'Luis', 'María'].map((name, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className={cn(
                        'w-3 h-3 rounded text-[6px] font-bold flex items-center justify-center',
                        'bg-white/[0.10] border border-white/[0.10] text-foreground/80'
                      )}>
                        {name[0]}
                      </div>
                      <span className="text-[7px] text-muted-foreground/70 truncate flex-1">{name}</span>
                      <span className="text-[6px] text-muted-foreground/50">{['5m', '12m', '1h'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Table preview */}
          <div className="rounded bg-white/[0.03] border border-white/[0.08] shrink-0 overflow-hidden">
            <div className="grid grid-cols-4 text-[7px] font-semibold text-muted-foreground/70 bg-white/[0.03]">
              <div className="px-1.5 py-1">Producto</div>
              <div className="px-1.5 py-1">Stock</div>
              <div className="px-1.5 py-1">Precio</div>
              <div className="px-1.5 py-1">Estado</div>
            </div>
            {[
              { name: 'Laptop Pro', stock: '24', price: '$1,299', status: 'active' },
              { name: 'Monitor 4K', stock: '5', price: '$599', status: 'low' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 text-[7px] border-t border-white/[0.05]">
                <div className="px-1.5 py-0.5 truncate">{row.name}</div>
                <div className={`px-1.5 py-0.5 ${row.status === 'low' ? 'text-amber-400' : 'text-emerald-400'}`}>{row.stock}</div>
                <div className="px-1.5 py-0.5">{row.price}</div>
                <div className="px-1.5 py-0.5">
                  <span className={`w-1 h-1 rounded-full inline-block ${row.status === 'low' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dense Lovable mockup
function LovableMockup() {
  return (
    <div className="h-full grid grid-cols-2 gap-2">
      {/* Chat panel */}
      <div className="rounded-lg bg-[hsl(222_25%_9%)] border border-white/[0.1] flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-white/[0.08] bg-pink-500/[0.05] shrink-0">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-[10px] font-semibold text-pink-400">Chat</span>
          <span className="ml-auto px-1.5 py-0.5 rounded bg-white/[0.06] text-[8px] text-muted-foreground">v2.1</span>
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1.5 min-h-0 overflow-hidden">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/25 text-[9px] shrink-0">
            <span className="text-primary font-medium">Tú:</span> Crea filtros para la tabla de productos
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[9px] text-muted-foreground shrink-0">
            <span className="text-pink-400 font-medium">Lovable:</span> Agregando componentes de filtro...
          </div>
          <div className="flex-1 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[8px] font-mono text-muted-foreground/60 overflow-hidden">
            <div className="text-pink-400">import</div>
            <div className="pl-2">{'{ Input } from "@/ui"'}</div>
            <div className="mt-1 text-emerald-400">// Filter logic</div>
          </div>
        </div>
      </div>
      
      {/* Preview panel */}
      <div className="rounded-lg bg-[hsl(222_25%_7%)] border border-pink-500/25 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-white/[0.08] bg-pink-500/[0.05] shrink-0">
          <Globe className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-[10px] font-semibold text-pink-400">Preview</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[8px] text-emerald-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1.5 min-h-0">
          {/* Filter bar */}
          <div className="flex gap-1.5 shrink-0">
            <div className="flex-1 h-6 rounded bg-white/[0.06] border border-white/[0.08] flex items-center px-2 gap-1">
              <Search className="w-2.5 h-2.5 text-muted-foreground/50" />
              <span className="text-[8px] text-muted-foreground/50">Buscar...</span>
            </div>
            <div className="h-6 px-2 rounded bg-pink-500/20 border border-pink-500/30 flex items-center gap-1">
              <Filter className="w-2.5 h-2.5 text-pink-400" />
              <span className="text-[8px] text-pink-400">Filtrar</span>
            </div>
          </div>
          {/* Table */}
          <div className="flex-1 rounded bg-white/[0.03] border border-white/[0.08] flex flex-col min-h-0 overflow-hidden">
            <div className="grid grid-cols-3 text-[7px] font-semibold text-muted-foreground/70 bg-white/[0.04] shrink-0">
              <div className="px-1.5 py-1">Nombre</div>
              <div className="px-1.5 py-1">Stock</div>
              <div className="px-1.5 py-1">Precio</div>
            </div>
            <div className="flex-1 flex flex-col">
              {['Laptop Pro', 'Monitor 4K', 'Teclado RGB', 'Mouse'].map((item, i) => (
                <div key={i} className="grid grid-cols-3 text-[7px] border-t border-white/[0.05] flex-1">
                  <div className="px-1.5 py-1 truncate">{item}</div>
                  <div className="px-1.5 py-1 text-emerald-400">{[24, 5, 42, 18][i]}</div>
                  <div className="px-1.5 py-1">${[1299, 599, 149, 79][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dense Supabase mockup
function SupabaseMockup() {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">productos</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] text-emerald-400">127 rows</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-[9px] text-blue-400 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" /> Realtime
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="px-2 py-1 rounded bg-white/[0.06] text-[9px] border border-white/[0.1] flex items-center gap-1">
            <Filter className="w-3 h-3 text-muted-foreground/60" />
            Filtrar
          </div>
          <div className="px-2 py-1 rounded bg-emerald-500/20 text-[9px] text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Insertar
          </div>
        </div>
      </div>
      
      {/* Table - FILLS ALL SPACE */}
      <div className="flex-1 rounded-lg overflow-hidden border border-emerald-500/25 flex flex-col min-h-0">
        {/* Header */}
        <div className="grid grid-cols-5 text-[9px] font-semibold bg-emerald-500/[0.08] border-b border-emerald-500/20 shrink-0">
          <div className="px-2.5 py-2 text-emerald-400/80">id (uuid)</div>
          <div className="px-2.5 py-2 text-emerald-400/80">nombre</div>
          <div className="px-2.5 py-2 text-emerald-400/80">stock</div>
          <div className="px-2.5 py-2 text-emerald-400/80">precio</div>
          <div className="px-2.5 py-2 text-emerald-400/80">status</div>
        </div>
        {/* Rows - fill remaining */}
        <div className="flex-1 flex flex-col divide-y divide-emerald-500/10">
          {[
            { id: 'a1b2', name: 'Laptop Pro 15"', stock: 24, price: 1299, status: 'active' },
            { id: 'c3d4', name: 'Monitor 4K UHD', stock: 5, price: 599, status: 'low' },
            { id: 'e5f6', name: 'Teclado Mecánico', stock: 42, price: 149, status: 'active' },
            { id: 'g7h8', name: 'Mouse Gaming Pro', stock: 18, price: 79, status: 'active' },
            { id: 'i9j0', name: 'Webcam HD 1080p', stock: 0, price: 89, status: 'out' },
            { id: 'k1l2', name: 'Audífonos BT', stock: 31, price: 199, status: 'active' },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-5 text-[9px] flex-1 ${i % 2 === 0 ? 'bg-[hsl(222_25%_7%)]' : 'bg-[hsl(222_25%_9%)]'} hover:bg-emerald-500/[0.04] transition-colors`}>
              <div className="px-2.5 py-2 font-mono text-muted-foreground/60 truncate">{row.id}...</div>
              <div className="px-2.5 py-2 text-foreground/90 truncate">{row.name}</div>
              <div className={`px-2.5 py-2 font-semibold ${row.status === 'out' ? 'text-red-400' : row.status === 'low' ? 'text-amber-400' : 'text-emerald-400'}`}>{row.stock}</div>
              <div className="px-2.5 py-2 text-foreground/80">${row.price}</div>
              <div className="px-2.5 py-2">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-semibold ${
                  row.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 
                  row.status === 'low' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    row.status === 'active' ? 'bg-emerald-400' : row.status === 'low' ? 'bg-amber-400' : 'bg-red-400'
                  }`} />
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dense GitHub mockup
function GitHubMockup() {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Repo header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold">mi-app-inventario</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] text-emerald-400">Public</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.06] border border-white/[0.1] text-[9px]">
            <Star className="w-3 h-3 text-amber-400" />
            <span>12</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.06] border border-white/[0.1] text-[9px]">
            <GitBranch className="w-3 h-3" />
            <span>3</span>
          </div>
        </div>
      </div>
      
      {/* Commits - FILLS ALL SPACE */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">
        {[
          { msg: 'feat: Add advanced filters to products table', time: '2h ago', hash: 'a3f2c1d', color: '#10B981', files: 4 },
          { msg: 'fix: Connect Supabase backend with realtime', time: '5h ago', hash: 'b7e4d2f', color: '#3B82F6', files: 2 },
          { msg: 'feat: Implement dashboard charts and metrics', time: '8h ago', hash: 'c9a8f3e', color: '#F59E0B', files: 6 },
          { msg: 'style: Update UI components to match design', time: '1d ago', hash: 'd1b2e4c', color: '#EC4899', files: 8 },
          { msg: 'chore: Initial commit with project structure', time: '2d ago', hash: 'e5f6a7b', color: '#6B7280', files: 15 },
        ].map((commit, i) => (
          <div key={i} className="flex-1 flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.05] transition-colors">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: commit.color }} />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-foreground/90 truncate block">{commit.msg}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] font-mono text-muted-foreground/50">{commit.hash}</span>
                <span className="text-[8px] text-muted-foreground/40">• {commit.files} files</span>
              </div>
            </div>
            <span className="text-[9px] text-muted-foreground/60 shrink-0">{commit.time}</span>
            <Check className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Dense Cursor mockup
function CursorMockup() {
  return (
    <div className="h-full grid grid-cols-5 gap-1.5">
      {/* File tree - 1 col */}
      <div className="rounded-lg bg-[hsl(222_25%_7%)] border border-white/[0.1] flex flex-col overflow-hidden">
        <div className="px-2 py-1.5 border-b border-white/[0.08] shrink-0">
          <span className="text-[8px] font-semibold text-muted-foreground/70">EXPLORER</span>
        </div>
        <div className="flex-1 p-1.5 text-[8px] space-y-0.5 overflow-hidden">
          <div className="flex items-center gap-1 text-muted-foreground/70">
            <Folder className="w-2.5 h-2.5 text-amber-400/70" /> src
          </div>
          <div className="pl-2 space-y-0.5">
            <div className="flex items-center gap-1 text-orange-400">
              <File className="w-2.5 h-2.5" /> Dashboard.tsx
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <File className="w-2.5 h-2.5" /> App.tsx
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <File className="w-2.5 h-2.5" /> utils.ts
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <Folder className="w-2.5 h-2.5 text-amber-400/60" /> hooks/
            </div>
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <Folder className="w-2.5 h-2.5 text-amber-400/60" /> components/
            </div>
          </div>
        </div>
      </div>
      
      {/* Editor - 3 cols */}
      <div className="col-span-3 rounded-lg bg-[hsl(222_25%_5%)] border border-orange-500/25 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/[0.08] bg-orange-500/[0.05] shrink-0">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[9px] font-medium text-orange-400">Dashboard.tsx</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-orange-400" />
            <span className="text-[8px] text-orange-400">AI Ready</span>
          </div>
        </div>
        <div className="flex-1 p-2.5 font-mono text-[8px] leading-relaxed overflow-hidden">
          <div><span className="text-pink-400">import</span> {'{ useState }'} <span className="text-pink-400">from</span> <span className="text-emerald-400">"react"</span>;</div>
          <div><span className="text-pink-400">import</span> {'{ useQuery }'} <span className="text-pink-400">from</span> <span className="text-emerald-400">"@tanstack/react-query"</span>;</div>
          <div className="mt-1.5"><span className="text-pink-400">export function</span> <span className="text-blue-400">Dashboard</span>() {'{'}</div>
          <div className="pl-2"><span className="text-blue-400">const</span> [filters, setFilters] = useState({'{}'});</div>
          <div className="pl-2"><span className="text-blue-400">const</span> {'{ data }'} = useQuery({'{...}'});</div>
          <div className="mt-1 pl-2 bg-orange-500/10 border-l-2 border-orange-400 -ml-0.5 pl-2 py-0.5">
            <span className="text-orange-400/80">// AI: Implementar filtros avanzados</span>
          </div>
          <div className="pl-2 mt-1"><span className="text-pink-400">return</span> (</div>
          <div className="pl-4">{'<'}<span className="text-blue-400">div</span> className=<span className="text-emerald-400">"p-4"</span>{'>'}</div>
          <div className="pl-6">{'<'}<span className="text-amber-400">FilterBar</span> {'/>'}</div>
          <div className="pl-6">{'<'}<span className="text-amber-400">DataTable</span> data={'{data}'} {'/>'}</div>
          <div className="pl-4">{'</'}<span className="text-blue-400">div</span>{'>'}</div>
          <div className="pl-2">);</div>
          <div>{'}'}</div>
        </div>
      </div>
      
      {/* AI Panel - 1 col */}
      <div className="rounded-lg bg-[hsl(222_25%_7%)] border border-orange-500/20 flex flex-col overflow-hidden">
        <div className="px-2 py-1.5 border-b border-white/[0.08] bg-orange-500/[0.05] shrink-0">
          <div className="flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-orange-400" />
            <span className="text-[8px] font-semibold text-orange-400">AI Chat</span>
          </div>
        </div>
        <div className="flex-1 p-1.5 flex flex-col gap-1 text-[7px] overflow-hidden">
          <div className="p-1.5 rounded bg-orange-500/10 border border-orange-500/20">
            <span className="text-orange-400">Tú:</span> Add filters
          </div>
          <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] text-muted-foreground/80">
            <span className="text-blue-400">Claude:</span> Adding filter components with state...
          </div>
          <div className="mt-auto p-1.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center gap-1">
            <Terminal className="w-2.5 h-2.5 text-muted-foreground/40" />
            <span className="text-muted-foreground/50">Ask AI...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups: Record<Platform, React.FC> = {
  gemini: GeminiMockup,
  lovable: LovableMockup,
  supabase: SupabaseMockup,
  github: GitHubMockup,
  cursor: CursorMockup,
};

export function PlatformScreenshot({
  platform,
  variant = 'full',
  annotation,
  className,
  glowOnHover = true,
  screenshotUrl,
}: PlatformScreenshotProps) {
  const config = platformConfig[platform];
  const MockupComponent = mockups[platform];
  const Icon = config.icon;

  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden h-full w-full flex flex-col',
        'bg-gradient-to-br',
        config.bgGradient,
        'border',
        config.borderColor,
        glowOnHover && 'transition-shadow duration-300 hover:shadow-lg',
        className
      )}
      whileHover={glowOnHover ? { scale: 1.005 } : undefined}
    >
      {/* Header - compact */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(222_25%_10%)]/90 border-b border-white/[0.1] shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex items-center gap-1.5">
          <Icon className={cn('w-3.5 h-3.5', config.color)} />
          <span className={cn('text-xs font-semibold', config.color)}>{config.name}</span>
        </div>
      </div>

      {/* Content - fills remaining space */}
      <div className={cn('flex-1 p-2.5 min-h-0', variant === 'compact' && 'p-1.5')}>
        {screenshotUrl ? (
          <img 
            src={screenshotUrl} 
            alt={`${config.name} screenshot`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <MockupComponent />
        )}
      </div>

      {/* Annotation */}
      {annotation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-background/95 border border-white/[0.15] text-[10px] font-semibold shadow-lg"
        >
          {annotation}
        </motion.div>
      )}
    </motion.div>
  );
}
