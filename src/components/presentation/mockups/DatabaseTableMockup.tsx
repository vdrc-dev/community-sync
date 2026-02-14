import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, RefreshCw, Plus, Filter, Search, MoreVertical, Copy, Trash2, Edit3 } from 'lucide-react';
import { useExportContext } from '@/contexts/ExportContext';

interface TableRow {
  id: string;
  created: string;
  status: 'active' | 'pending' | 'inactive';
  email: string;
  role?: string;
  isNew?: boolean;
}

interface DatabaseTableMockupProps {
  tableName?: string;
  initialRows?: TableRow[];
  enableRealtime?: boolean;
  realtimeInterval?: number;
  className?: string;
}

const generateRandomId = () => Math.random().toString(36).substr(2, 8);
const generateRandomEmail = () => `user${Math.floor(Math.random() * 1000)}@email.com`;
const roles = ['admin', 'user', 'viewer', 'editor'];

export function DatabaseTableMockup({
  tableName = 'users',
  initialRows = [
    { id: 'a1b2c3d4', created: '10:00 AM', status: 'active', email: 'ana.garcia@empresa.com', role: 'admin' },
    { id: 'e5f6g7h8', created: '09:45 AM', status: 'active', email: 'luis.perez@empresa.com', role: 'user' },
    { id: 'i9j0k1l2', created: '09:30 AM', status: 'pending', email: 'maria.lopez@startup.io', role: 'viewer' },
    { id: 'm3n4o5p6', created: '09:15 AM', status: 'active', email: 'carlos.ruiz@tech.co', role: 'editor' },
    { id: 'q7r8s9t0', created: '09:00 AM', status: 'inactive', email: 'sofia.torres@mail.com', role: 'user' },
    { id: 'u1v2w3x4', created: '08:45 AM', status: 'active', email: 'pedro.sanchez@dev.io', role: 'admin' },
    { id: 'y5z6a7b8', created: '08:30 AM', status: 'active', email: 'carmen.diaz@corp.io', role: 'editor' },
    { id: 'c9d0e1f2', created: '08:15 AM', status: 'pending', email: 'jorge.vega@mail.com', role: 'user' },
  ],
  enableRealtime = true,
  realtimeInterval = 4000,
  className,
}: DatabaseTableMockupProps) {
  const { isExporting } = useExportContext();
  const [rows, setRows] = useState<TableRow[]>(initialRows);
  const [showPulse, setShowPulse] = useState(false);

  // Simulate incoming data (only when not exporting)
  useEffect(() => {
    if (isExporting || !enableRealtime) return;

    const interval = setInterval(() => {
      const newRow: TableRow = {
        id: generateRandomId(),
        created: 'Just now',
        status: 'active',
        email: generateRandomEmail(),
        role: roles[Math.floor(Math.random() * roles.length)],
        isNew: true,
      };

      setShowPulse(true);
      setRows(prev => {
        const updated = prev.map(r => ({ ...r, isNew: false }));
        return [newRow, ...updated.slice(0, 5)];
      });

      setTimeout(() => setShowPulse(false), 1000);
    }, realtimeInterval);

    return () => clearInterval(interval);
  }, [isExporting, enableRealtime, realtimeInterval]);

  return (
    <div className={`h-full flex flex-col rounded-xl overflow-hidden border border-emerald-500/30 bg-[hsl(220,18%,5%)] ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-emerald-500/20 bg-emerald-500/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono font-semibold text-emerald-400">
            {tableName}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] text-emerald-400 font-medium">
            {rows.length} rows
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-1.5"
            animate={showPulse && !isExporting ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={showPulse && !isExporting ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className="text-[9px] text-emerald-400/80 font-medium">Realtime</span>
          </motion.div>
          <div className="w-px h-4 bg-white/[0.1]" />
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.08] cursor-pointer">
              <Filter className="w-3 h-3 text-muted-foreground/60" />
            </div>
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/30 cursor-pointer">
              <Plus className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-3 py-1.5 border-b border-white/[0.06] bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08]">
          <Search className="w-3 h-3 text-muted-foreground/50" />
          <span className="text-[9px] text-muted-foreground/50">Buscar en {tableName}...</span>
        </div>
      </div>

      {/* Table Container - fills remaining */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_80px_70px_1.2fr_65px_50px] text-[8px] font-semibold bg-emerald-500/[0.08] border-b border-emerald-500/15 shrink-0">
          <div className="px-2 py-1.5 text-emerald-400/80 flex items-center gap-1">
            id <span className="text-[7px] text-muted-foreground/40">(uuid)</span>
          </div>
          <div className="px-2 py-1.5 text-emerald-400/80">created_at</div>
          <div className="px-2 py-1.5 text-emerald-400/80">status</div>
          <div className="px-2 py-1.5 text-emerald-400/80">email</div>
          <div className="px-2 py-1.5 text-emerald-400/80">role</div>
          <div className="px-2 py-1.5 text-emerald-400/80 text-center">•••</div>
        </div>

        {/* Table Body - fills space */}
        <div className="flex-1 flex flex-col divide-y divide-emerald-500/[0.08] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                layout
                initial={row.isNew && !isExporting ? { opacity: 0, x: -20, backgroundColor: 'hsl(158, 64%, 52%, 0.12)' } : {}}
                animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className={`grid grid-cols-[1fr_80px_70px_1.2fr_65px_50px] text-[8px] flex-1 min-h-[28px] group ${
                  i % 2 === 0 ? 'bg-[hsl(220,18%,6%)]' : 'bg-[hsl(220,18%,7%)]'
                } hover:bg-emerald-500/[0.05] transition-colors cursor-pointer`}
              >
                <div className="px-2 py-1.5 font-mono text-muted-foreground/60 truncate flex items-center text-[8px]">
                  {row.id}
                </div>
                <div className="px-2 py-1.5 text-muted-foreground/70 flex items-center text-[8px]">{row.created}</div>
                <div className="px-2 py-1.5 flex items-center">
                  <span className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[7px] font-semibold ${
                    row.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : row.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      row.status === 'active' ? 'bg-emerald-400' : row.status === 'pending' ? 'bg-amber-400' : 'bg-gray-400'
                    }`} />
                    {row.status}
                  </span>
                </div>
                <div className="px-2 py-1.5 text-foreground/85 truncate flex items-center text-[8px]">{row.email}</div>
                <div className="px-2 py-1.5 flex items-center">
                  <span className={`px-1 py-0.5 rounded text-[7px] font-medium ${
                    row.role === 'admin' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : row.role === 'editor'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-white/[0.06] text-muted-foreground/70'
                  }`}>
                    {row.role}
                  </span>
                </div>
                <div className="px-2 py-1.5 flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-4 h-4 rounded bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.1]">
                    <Edit3 className="w-2 h-2 text-muted-foreground/60" />
                  </div>
                  <div className="w-4 h-4 rounded bg-white/[0.06] flex items-center justify-center hover:bg-red-500/20">
                    <Trash2 className="w-2 h-2 text-muted-foreground/60" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-2 py-1.5 border-t border-emerald-500/15 bg-emerald-500/[0.04] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <Zap className="w-2.5 h-2.5 text-emerald-400/70" />
            <span className="text-[8px] text-emerald-400/70 font-medium">
              Realtime activo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[7px] text-muted-foreground/50">
              PostgreSQL 15 + Supabase
            </span>
            <RefreshCw className="w-2.5 h-2.5 text-muted-foreground/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
