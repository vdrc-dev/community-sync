import { memo, useCallback, useMemo } from 'react';

type AnyFunction = (...args: any[]) => any;

/**
 * Creates a stable callback that won't cause re-renders
 */
export function useStableCallback<T extends AnyFunction>(callback: T): T {
  return useCallback(callback, []);
}

/**
 * Higher-order component for performance optimization
 * Wraps component with React.memo and display name
 */
export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
) {
  const MemoizedComponent = memo(Component);
  MemoizedComponent.displayName = displayName || Component.displayName || Component.name;
  return MemoizedComponent;
}

/**
 * Debounce hook for expensive operations
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

import React from 'react';

/**
 * Throttle hook for rate-limited operations
 */
export function useThrottle<T extends AnyFunction>(
  callback: T,
  delay: number
): T {
  const lastRan = React.useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Deferred value for non-urgent updates
 */
export function useDeferredUpdate<T>(value: T): T {
  const [isPending, startTransition] = React.useTransition();
  const [deferredValue, setDeferredValue] = React.useState(value);

  React.useEffect(() => {
    startTransition(() => {
      setDeferredValue(value);
    });
  }, [value]);

  return deferredValue;
}
