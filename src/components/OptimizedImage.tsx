import { useState, useRef, useEffect, ImgHTMLAttributes, CSSProperties } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  /** Fade-in duration in ms */
  fadeDuration?: number;
  /** Show a blurred low-res placeholder effect */
  blurPlaceholder?: boolean;
  /** Background color while loading */
  placeholderColor?: string;
}

/**
 * Optimized image component with:
 * - IntersectionObserver-based lazy loading
 * - Smooth fade-in on load
 * - Optional blur-up placeholder effect
 * - GPU-accelerated transitions
 */
export function OptimizedImage({
  src,
  alt = '',
  className = '',
  style,
  fadeDuration = 400,
  blurPlaceholder = true,
  placeholderColor = 'hsl(0 0% 8%)',
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const containerStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor,
    ...style,
  };

  const imgStyle: CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    filter: isLoaded ? 'none' : (blurPlaceholder ? 'blur(20px)' : 'none'),
    transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
    transition: `opacity ${fadeDuration}ms ease, filter ${fadeDuration}ms ease, transform ${fadeDuration * 1.2}ms ease`,
    willChange: 'opacity, filter, transform',
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={imgStyle}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          {...rest}
        />
      )}
    </div>
  );
}
