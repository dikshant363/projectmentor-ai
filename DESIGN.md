# DESIGN.md — Apple Minimalist Design Contract
### ProjectMentor AI • Single Source of Truth for Visual Design & UI Architecture

---

## 1. Core Philosophy: Functional Apple Minimalism

ProjectMentor AI follows the strict visual aesthetics of Apple developer tools and product presentation pages. Every interface element must feel intentional, quiet, spacious, and mathematically calibrated.

- **Zero Clutter**: No neon glow effects, no heavy multi-stop rainbow gradients, no distracting glassmorphic blurs over content.
- **Content-First**: High contrast, crisp typography, and restrained interactive accents.
- **Tactile Feedback**: Subtle active-press micro-interactions (`transform: scale(0.95)` / `scale(0.98)`).

---

## 2. Color Palette & Semantic Tokens

### Interactive Accents
| Token | Hex Value | Usage |
|---|---|---|
| `--color-primary` | `#0066cc` | Primary Action Blue for all buttons, links, active indicators |
| `--color-primary-focus`| `#0071e3` | Keyboard focus ring & active focus outline |
| `--color-primary-on-dark`| `#2997ff` | Sky Link Blue for dark tiles & terminal surfaces |

### Surface Tiles & Backgrounds (Alternating Full-Bleed)
| Surface | Hex Value | Semantic Usage |
|---|---|---|
| White Canvas | `#ffffff` | Primary content panels, hero white bands |
| Parchment Canvas | `#f5f5f7` | Secondary utility bands, structured grids, profile cards |
| Pearl Surface | `#fafafc` | Sub-card insets, code blocks, quote containers |
| Near-Black Tile | `#272729` | Capabilities matrix, terminal displays, dark hero contrast |
| Deep Black | `#000000` | GlobalNav top navigation (44px fixed height) |

### Typography & Ink
| Ink Token | Hex Value | WCAG Contrast | Usage |
|---|---|---|---|
| `--color-ink` | `#1d1d1f` | > 14:1 on white | Primary display titles, headers, primary body text |
| `--color-ink-muted-80`| `#333333` | > 9:1 on white | High-contrast secondary text & card labels |
| `--color-ink-muted-48`| `#555555` | > 6.8:1 on white | Calibrated secondary body text (WCAG AA/AAA compliant) |
| Hairline Border | `#e0e0e0` | Subtle | 1px border on all 18px utility cards |
| Divider Soft | `#f0f0f0` | Subtle | Section dividers and card header separators |

---

## 3. Shape & Geometry Rules

- **Pill CTAs**: Primary action buttons must use `rounded-full` (`9999px` border radius).
- **Utility Cards**: Container cards must strictly use `rounded-[18px]` (`var(--radius-lg)`).
- **Sub-Items & Insets**: Inset boxes, chips, and code panels use `rounded-[11px]` (`var(--radius-md)`) or `rounded-[8px]` (`var(--radius-sm)`).
- **Hairline Borders**: Standard card styling is `border border-[#e0e0e0]` or `border border-[#f0f0f0]`.

---

## 4. Shadows & Depth

- **Resting Product Shadow**: Exactly one drop shadow is permitted in the entire project:
  ```css
  box-shadow: 3px 5px 30px 0 rgba(0, 0, 0, 0.22);
  ```
- **Utility Cards**: Flattish appearance with hairline borders. Never use dense, fuzzy multi-layer shadows on interactive cards.

---

## 5. Typography Scale (SF Pro / Inter Ladder)

| Class | Font Size / Weight | Line Height | Tracking |
|---|---|---|---|
| `.font-hero-display` | `clamp(32px, 5vw, 56px)` / 600 | 1.07 | `-0.28px` |
| `.font-display-lg` | `clamp(28px, 4vw, 40px)` / 600 | 1.10 | `0px` |
| `.font-display-md` | `clamp(24px, 3.5vw, 34px)` / 600 | 1.47 | `-0.374px` |
| `.font-lead` | `clamp(19px, 2.5vw, 28px)` / 400 | 1.21 | `0px` |
| Body Text | `17px` / 400 | 1.47 | `-0.374px` |
| Caption / Meta | `12px - 14px` / 500 | 1.40 | `+0.2px` |

---

## 6. Accessibility & Compliance Contract

1. **Contrast**: All body and caption text must exceed 4.5:1 (WCAG AA) and target 7:1 (WCAG AAA).
2. **Touch Targets**: All interactive controls must measure at least `44px × 44px` or contain sufficient padding.
3. **Focus States**: Every button and link must expose an explicit `focus-visible:ring-2 focus-visible:ring-[#0071e3]`.
4. **Icons**: Decorative Lucide icons must be designated with `aria-hidden="true"`.
5. **No Layout Shifts**: Containers with dynamic content must reserve vertical space to prevent CLS > 0.05.
