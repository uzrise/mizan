'use client';

/**
 * AnimationWrapper - A wrapper component for future scroll-based animations
 * 
 * This component is structured to easily add animations later using libraries like:
 * - framer-motion
 * - react-spring
 * - Intersection Observer API
 * 
 * Usage:
 * <AnimationWrapper animation="fadeIn" delay={0}>
 *   <YourComponent />
 * </AnimationWrapper>
 */

export default function AnimationWrapper({ 
  children, 
  animation = 'fadeIn', 
  delay = 0,
  className = '' 
}) {
  // Currently just renders children - animation logic will be added later
  // This structure allows for easy integration of animation libraries
  
  return (
    <div 
      className={className}
      data-animation={animation}
      data-delay={delay}
    >
      {children}
    </div>
  );
}

