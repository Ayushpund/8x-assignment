/**
 * Design tokens extracted from higgsfield.ai reference screenshots.
 *
 * ASSUMPTIONS (not pixel-measurable from screenshots):
 * - Exact lime hex sampled as #d4ff00 (screenshots vary #bfff00–#dfff00).
 * - Input/active pill background #1f1f1f (between base and card).
 * - Sidebar width 260px (reference assets gallery).
 * - Content max-width 1440px for marketing pages; studio uses full width.
 * - No heavy drop shadows — elevation via border + slight surface lift.
 */

export const tokens = {
  colors: {
    /** Page canvas — near-black */
    background: "#0a0a0a",
    /** Nav / sidebar same family as base, separated by border */
    backgroundElevated: "#0a0a0a",
    /** Cards, mega-menu panels, dropdown surfaces */
    surface: "#1a1a1a",
    /** Search inputs, active nav pills */
    surfaceInput: "#1f1f1f",
    /** Slightly lighter hover on interactive rows */
    surfaceHover: "#252525",
    /** Primary brand — promo banner, active nav, primary CTA (sign up on reference) */
    brand: "#d4ff00",
    brandForeground: "#0a0a0a",
    /** Discount / TOP badges */
    accentPink: "#ff2e7e",
    /** NEW badges (lime variant on dark) */
    badgeNew: "#d4ff00",
    text: {
      primary: "#ffffff",
      secondary: "#a1a1a1",
      muted: "#8e8e8e",
      disabled: "#5c5c5c",
    },
    border: {
      default: "#2a2a2a",
      subtle: "#1f1f1f",
      focus: "#d4ff00",
    },
  },
  typography: {
    fontSans:
      'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    h1: {
      size: "2.25rem",
      weight: 700,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      size: "1.5rem",
      weight: 600,
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
    },
    body: {
      size: "0.9375rem",
      weight: 400,
      lineHeight: 1.5,
    },
    label: {
      size: "0.8125rem",
      weight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },
    nav: {
      size: "0.875rem",
      weight: 500,
    },
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    card: "16px",
    button: "9999px",
    input: "10px",
  },
  spacing: {
    sectionY: "4rem",
    sectionYLg: "6rem",
    cardPadding: "1rem",
    cardPaddingLg: "1.25rem",
    gutter: "1rem",
    gutterLg: "1.5rem",
    navHeight: "3.5rem",
    promoHeight: "2.5rem",
  },
  layout: {
    sidebarWidth: "260px",
    contentMaxWidth: "1440px",
    studioPanelWidth: "380px",
  },
  shadow: {
    /** Reference uses flat UI; subtle glow only on hover cards */
    cardHover: "0 0 0 1px rgba(212, 255, 0, 0.15)",
    none: "none",
  },
} as const;

export type DesignTokens = typeof tokens;
