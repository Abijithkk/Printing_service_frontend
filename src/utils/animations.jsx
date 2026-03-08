/**
 * Professional Animation Variants and Configurations
 * Following industry best practices for smooth, accessible animations
 */

// Default easing curves for smooth animations
export const EASE_STANDARD = [0.4, 0, 0.2, 1]; // Material Design standard easing
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94]; // Cubic bezier smooth
export const EASE_SPRING = { type: 'spring', damping: 25, stiffness: 120 };

// Animation Timing
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.5;
export const DURATION_SLOW = 0.8;

/**
 * Fade In Animation - For elements appearing on page
 * Professional entrance with subtle opacity change
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Scale Fade In - For cards and interactive elements
 * Combines opacity with subtle scale for depth
 */
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_SMOOTH,
    },
  },
};

/**
 * Slide Up Animation - For content that enters from bottom
 * Used for text, headlines, and important content
 */
export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Slide Right Animation - For content entering from left
 * Creates directional flow in layouts
 */
export const slideRightVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Slide Down Animation - For content entering from top
 */
export const slideDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Stagger Container - For animating multiple children
 * Creates professional cascading effect
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Hover Scale - For interactive elements
 * Provides tactile feedback on hover
 */
export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_SMOOTH,
    },
  },
  tap: {
    scale: 0.98,
  },
};

/**
 * Bounce Animation - For attention-grabbing elements
 * Follows iOS/Material Design patterns
 */
export const bounceVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

/**
 * Glow Animation - For highlights and CTAs
 * Creates visual emphasis with shadow effects
 */
export const glowVariants = {
  initial: { boxShadow: '0 0 20px rgba(142, 216, 0, 0.3)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(142, 216, 0, 0.3)',
      '0 0 40px rgba(142, 216, 0, 0.5)',
      '0 0 20px rgba(142, 216, 0, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse Animation - For loading states and active indicators
 */
export const pulseVariants = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Rotation Animation - For loading spinners
 */
export const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Staggered List Items
 * For animating list items with cascading effect
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Page Transition - For route changes
 * Smooth fade and slight scale
 */
export const pageTransitionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_STANDARD,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_STANDARD,
    },
  },
};

/**
 * Button Animation - Professional button interactions
 */
export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 24px rgba(142, 216, 0, 0.3)',
    transition: {
      duration: DURATION_FAST,
      ease: EASE_SMOOTH,
    },
  },
  tap: {
    scale: 0.98,
  },
};

/**
 * Modal/Dialog Animation
 * Backdrop fade with content slide
 */
export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_FAST,
    },
  },
};

export const modalContentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_SMOOTH,
    },
  },
};

/**
 * Text Animation - For hero headlines
 * Combines slide and fade for impact
 */
export const headlineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_SMOOTH,
    },
  },
};

/**
 * Utility function to create viewport animation config
 * Ensures animations trigger when element comes into view (accessibility + performance)
 */
export const getViewportConfig = () => ({
  once: true,
  margin: '0px 0px -100px 0px',
});

/**
 * Transitions for smooth navigation
 */
export const layoutTransition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};
