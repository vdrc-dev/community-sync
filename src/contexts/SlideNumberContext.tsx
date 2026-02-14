import { createContext, useContext, ReactNode } from 'react';

interface SlideNumberInfo {
  current: number;
  total: number;
}

const SlideNumberContext = createContext<SlideNumberInfo | null>(null);

export function SlideNumberProvider({
  current,
  total,
  children,
}: {
  current: number;
  total: number;
  children: ReactNode;
}) {
  return (
    <SlideNumberContext.Provider value={{ current, total }}>
      {children}
    </SlideNumberContext.Provider>
  );
}

/**
 * Returns { current, total } slide numbers from PresentationLayout context.
 * Returns null if not inside a PresentationLayout (e.g. standalone render).
 */
export function useSlideNumber(): SlideNumberInfo | null {
  return useContext(SlideNumberContext);
}
