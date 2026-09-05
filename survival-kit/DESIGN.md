# DESIGN.md — The PromptWars Apple Minimalist Design System

## 1. Palette Tokens
- **Action Blue**: `#0066cc` (Primary interactive color)
- **Focus Blue**: `#0071e3` (Focus rings and active hover state)
- **Sky Link Blue**: `#2997ff` (Contrast accent on dark tiles)
- **Ink Primary**: `#1d1d1f` (Headers and primary text)
- **Ink Secondary**: `#555555` (WCAG AAA compliant secondary text > 6.8:1)
- **Hairline Border**: `#e0e0e0` (Subtle 1px border on light cards)
- **Divider Soft**: `#f0f0f0` (Section and header dividers)

## 2. Full-Bleed Tile Structure
Sections must alternate to create natural visual cadence:
1. `White Canvas` (`#ffffff`) — Hero and primary interactive forms
2. `Parchment Canvas` (`#f5f5f7`) — Secondary grids, workflows, and tool benches
3. `Near-Black Tile` (`#272729`) — High-contrast capabilities matrices, dark terminal zones

## 3. Geometric Rules
- **Utility Cards**: `rounded-[18px]` with 1px border.
- **Buttons**: `rounded-full` with `transform: scale(0.95)` on press.
- **Inner Insets**: `rounded-[11px]` or `rounded-[8px]`.
- **Resting Shadow**: Exactly one drop-shadow permitted:
  `box-shadow: 3px 5px 30px 0 rgba(0, 0, 0, 0.22);`

## 4. Typography Ladder (SF Pro / Inter)
- Display Headlines: `clamp(28px, 4vw, 40px)` font-weight 600, letter-spacing `0px`
- Subheadings: `clamp(20px, 3vw, 24px)` font-weight 600
- Body: `17px` font-weight 400, line-height 1.47, letter-spacing `-0.374px`
- Secondary / Captions: `13px - 14px` font-weight 500, color `#555555`
