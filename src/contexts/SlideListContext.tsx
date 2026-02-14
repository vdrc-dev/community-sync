import { createContext, useContext, ReactNode } from 'react';

export interface SlideListItem {
  componentName: string;
  slideNumber: number;
}

const SlideListContext = createContext<SlideListItem[]>([]);

export function SlideListProvider({
  slides,
  children,
}: {
  slides: SlideListItem[];
  children: ReactNode;
}) {
  return (
    <SlideListContext.Provider value={slides}>
      {children}
    </SlideListContext.Provider>
  );
}

/**
 * Returns the list of slides with their component names and positions.
 * Returns empty array if not inside a provider.
 */
export function useSlideList(): SlideListItem[] {
  return useContext(SlideListContext);
}
