import { createContext, useContext, ReactNode } from 'react';

interface ExportContextType {
  isExporting: boolean;
}

const ExportContext = createContext<ExportContextType>({ isExporting: false });

export function ExportProvider({
  children,
  isExporting,
}: {
  children: ReactNode;
  isExporting: boolean;
}) {
  return (
    <ExportContext.Provider value={{ isExporting }}>
      {children}
    </ExportContext.Provider>
  );
}

export function useExportContext() {
  return useContext(ExportContext);
}
