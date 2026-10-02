# Design System — CompagnyChatGPT "Projet"

Extracted directly from the Figma file's variables, styles and real component instances (not invented). Source: [Composants](https://www.figma.com/design/y2tzDX5ow3xUx8CeVHc17c/CompagnyChatGPT---Maquettes--Pototype--?node-id=61-3262) (tokens/atoms) and the screen flows referenced in [build-context.md](build-context.md).

Every value below is quoted as `var(--figma-variable-name, resolved-hex-or-px)` where the file binds a Figma Variable, or as a raw value where the file uses one directly (no variable). Where the file itself is inconsistent or incomplete, that is called out explicitly in **Gaps & inconsistencies** rather than papered over.

---

## 1. Color tokens

All colors below are the **Light Mode** values — this is the only mode actually wired into real screens and components in the file (see Gaps).

### Backgrounds
| Token | Value | Used for |
|---|---|---|
| `--colors/semantic/body/background-light` | `#FFFFFF` | App/page body background (desktop Nav background) |
| *(page wash, no variable)* | white base + a decorative raster PNG layered at **25% opacity** | The soft peach/white gradient wash visible behind cards on every screen. This is an **image asset**, not a flat/gradient color — don't recreate it as a CSS gradient; export and reuse the source PNG (`Background / Desktop / LightMode`, node `61:3738`) or ask design for the gradient stops. |

### Surfaces
| Token | Value | Used for |
|---|---|---|
| `--blanc_lm` | `#FFFFFF` (white) | Solid card/dialog/popover/context-menu surfaces, hovered project cards, input backgrounds |
| *(raw, no variable)* | `rgba(255,255,255,0.5)` | "Glass" translucent surface — default (non-hover) project cards, the prompt-composer card, the table container. Used consistently but never bound to a named variable in the file — treat as a literal, not a token, until design names it. |

### Text
| Token | Value | Used for |
|---|---|---|
| `--title_lm` | `#3A3A3A` | Headings only (H1–H4 page/section titles) |
| `--gris-foncé_lm` | `#5B5B5B` | Primary body text, form labels, button labels, nav item labels, card titles |
| `--gris-clair_lm` | `#717171` | Secondary/muted text — placeholders, supporting text, table-row subtext, captions, badge text |
| `--blanc_lm` | `#FFFFFF` | Text/icons on filled orange surfaces (primary buttons, selected nav item, selected chat) |

### Borders
| Token | Value | Used for |
|---|---|---|
| `--separateurs_lm` | `#E8E8E8` | The one universal border/divider color: input borders, table row dividers, card borders, disabled button border/fill |

### Accents
| Token | Value | Used for |
|---|---|---|
| `--orange` | `#EA8C3C` | Brand accent — primary button fill, selected nav/chat state, active tab, focus/selected badges |
| `--boutonprimairehover_lm` | `#B5733A` | Hover state of the orange accent (primary button hover) |

### States
| State | Composition | Notes |
|---|---|---|
| Disabled | bg/border `--separateurs_lm` (#E8E8E8), text `--gris-foncé_lm` (#5B5B5B) | Same treatment for primary and secondary buttons |
| Hover (list/menu rows, secondary buttons) | bg `--separateurs_lm` (#E8E8E8) | No color-family change, just a neutral gray fill |
| Selected (nav item, chat item, badge) | bg `--orange`, text `--blanc_lm` | |
| Focus (input) | border-width goes from 1px to 2px, **same** `--separateurs_lm` color | No distinct focus color/ring — only a width change. Worth confirming this meets your WCAG AA focus-visible bar before relying on it. |
| Destructive / error / success | **No token exists.** | See Gaps — flagged, not guessed. |

### Dark Mode primitives (defined but unused)
Documented on a "COLORS" foundation page but **not wired into any real screen or component** in this file — every ATOMES/MOLECULES/ORGANISMES instance sampled is Light Mode only:

| Token | Value | Label in file |
|---|---|---|
| `--black` | `#000000` | Black |
| `--noir-1_dm` | `#181818` | Noir 1 (Dark Mode) |
| `--noir-2_dm` | `#212121` | Noir 2 (Dark Mode) |
| `--stroke_dm` | `#242424` | Stroke (Dark Mode) |
| `--noir-3_dm` | `#303030` | Noir 3 (Dark Mode) |
| `--gris-foncé_dm` | `#4E4E4E` | Gris foncé (Dark Mode) |

Treat these as reference-only until a dark-mode screen actually appears in the Figma flows.

---

## 2. Type scale

**Families:** Inter (all UI/body text — Regular 400, Medium 500, SemiBold 600) and Onest (SemiBold — seen only on the Input field's "Label" text, via `var(--title_txt, 'Onest:SemiBold')`; its scope elsewhere in the file is unclear — see Gaps).

| Role | Size | Token | Weight | Line height | Color |
|---|---|---|---|---|---|
| H1 (desktop page title, e.g. "Projets") | 40px | — (raw) | SemiBold | normal | `--title_lm` |
| H2 (desktop section title, e.g. project name) | 32px | — (raw) | SemiBold | normal | `--title_lm` |
| H3 (mobile page title) | 28px | — (raw) | SemiBold | normal | `--title_lm` |
| H4 | 24px | `--h4_desktop` | SemiBold | normal | `--title_lm` |
| Body — desktop | 16px | `--body_desktop` | Regular / Medium / SemiBold (by context) | normal (labels) / 1.5 (paragraphs, inputs) | `--gris-foncé_lm` or `--gris-clair_lm` |
| Body — mobile | 14px | `--body_mobile` | Regular / SemiBold | normal / 1.5 | `--gris-foncé_lm` |
| Caption — desktop | 14px | `--caption_desktop` | Regular | normal | `--gris-clair_lm` |
| Caption — mobile / universal small print | 12px | `--caption_mobile` | Regular | normal | `--gris-clair_lm` |

Notes on the caption tokens: `--caption_desktop` (14px) only appears once, on the Input's "supporting text." Everywhere else that needs small print — table-row subtext, badges, card dates, mobile context-menu labels — uses `--caption_mobile` (12px) **regardless of whether the screen is desktop or mobile**. Treat 12px as the de facto universal caption size and 14px as an Input-specific exception, not a strict desktop/mobile split.

No explicit numeric line-height or letter-spacing tokens exist in the file — everything is either the browser default (`normal`) or a literal `1.5` multiplier on paragraph-style text. Don't invent px line-heights beyond that.

---

## 3. Spacing tokens

Named scale (`var(--layout/spacing/*)`), confirmed from real component instances:

| Token | Value |
|---|---|
| `--layout/spacing/x-small` | 4px |
| `--layout/spacing/small` | 8px |
| `--layout/spacing/medium` | 12px |
| `--layout/spacing/large` | 16px |

Nothing above 16px is a named token — larger gaps seen in the file (e.g. 32px header side-padding, 24px section gaps) are raw pixel values, not tied to a spacing variable. Extend the Tailwind scale from these four values rather than guessing a 5th named step.

## 4. Radius tokens

Named scale (`var(--layout/radius/*)`):

| Token | Value | Used for |
|---|---|---|
| `--layout/radius/small` | 8px | Icon buttons, image/file thumbnails, badge close-button |
| `--layout/radius/medium` | 12px | Cards, active nav pill, table/composer container, context menus, badges |
| `--layout/radius/large` | 16px | Sidebar/profile chip, mobile nav drawer |

Bespoke radii used repeatedly but **not** wired to a layout/radius token:
- **9px** — hardcoded directly on Button and Input components (not the 8/12/16 scale). Treat as a control-specific radius, distinct from the layout scale.
- **Fully round** — avatars and the mobile profile chip use Figma's "huge number" trick (`rounded-[934px]`, `rounded-[73928px]`); implement as `border-radius: 9999px` / Tailwind `rounded-full`.

## 5. Elevation (shadows)

No named shadow tokens exist — every shadow is a literal value, repeated consistently by role:

| Elevation | Value | Used for |
|---|---|---|
| Rest | `0px 5px 25px 0px rgba(0,0,0,0.05)` | Default project cards, profile chip |
| Hover | `0px 5px 12.5px 0px rgba(0,0,0,0.05)` | Hovered project card, mobile nav drawer |
| Menu/popover | `0px 4px 8px 0px rgba(0,0,0,0.1)` | Context menus, dropdowns |
| Floating icon button | `0px 4px 16px 0px rgba(0,0,0,0.1)` | Mobile burger-menu button |

---

## 6. How screens compose their UI

### Page shell
White base with a decorative raster texture at 25% opacity behind everything (see Backgrounds above — it's an image, not a token). Two-column app frame: a fixed-width sidebar (`Nav`, ~300px desktop) plus a fluid main content area. On mobile the sidebar becomes a slide-over drawer (~320px) triggered by a burger button in a small top bar (burger + wordmark, profile avatar at the far right).

### Sidebar (`Nav`)
Top-to-bottom: a ghost "+ Nouvelle discussion" CTA (orange text/icon, no fill) → two flat nav items ("Bibliothèque de prompts", "Projets"; the active item gets a solid `--orange` pill at `--layout/radius/medium`) → two collapsible groups ("Épinglés", "Discussions"), each a header row (label + chevron) followed by `NavSubItem` rows. Sub-item states: plain text at rest, `--separateurs_lm` background on hover, `--orange` background + white text when selected. A floating white "profile chip" (avatar + name + chevron, `--layout/radius/large`, rest-elevation shadow) sits outside the sidebar, anchored to the top-right of the viewport.

### Record/list view (e.g. "Liste des projets")
Header row: H1 title (flexes) + primary "+ Projet" button pinned right. Below it, a responsive card grid (2 columns desktop, 1 column mobile). Each **record card**: folder icon + bold title + "…" menu button on one row, 2–3 lines of muted description, a small caption date at the bottom. Card states: translucent glass surface + rest-elevation shadow at rest; solid white surface + `--orange` border + hover-elevation shadow on hover (color of the surface changes on hover, not just the shadow — reuse this exact pattern for any other card-grid view).

### Record detail / workspace view (e.g. "Projet > Sources")
H2 title + "…" menu row, then a persistent prompt-composer card (textarea + toolbar: attach icon, a "Rapide/Avancé" segmented pill toggle, a library icon, a filled-orange circular mic button), then a horizontal tab bar (`Chats` | `Sources`, active tab = orange text + underline), then a primary "+ Source" action button, then a data table.

### Tables / DataGrid
No visible outer border — just a container. Each row is 52px tall on mobile / 56px on desktop, 8px internal padding, and separated only by a **bottom** 1px `--separateurs_lm` rule (no vertical rules, no zebra striping). Row anatomy: leading icon/thumbnail (24/32px, `--layout/radius/small`) → two-line text stack (body-weight title + caption subtext) → trailing "…" icon-button column. This exact structure is reused for both the Sources table and the Chat-history table — it's the app's general list/table pattern, not something specific to sources.

### Dialogs
Centered modal on a translucent dark scrim: white surface, title, body copy, then a right-aligned action row (secondary text-only "Annuler" + a primary filled button). **Destructive actions (e.g. "Supprimer un projet") reuse the same `--orange` fill as any other primary action, distinguished only by a leading trash icon — there is no red/danger color anywhere in this file.** Confirmed by inspecting the delete-project confirmation screen directly.

### Context menus / "…" popovers
White card, `--layout/radius/medium`, popover-elevation shadow, stacked `Option` rows (icon + label, `--layout/radius/medium`, 12/8px padding depending on density), no dividers between options. Same as dialogs: the "Supprimer" option here uses the identical neutral text color as every other option — no destructive-color differentiation at the menu level either.

### Spacing/type rhythm, desktop vs. mobile
Nearly every token is paired as an explicit Large/Small or `_desktop`/`_mobile` variant rather than left to a CSS breakpoint alone: 16px body → 14px on mobile, 40/32px headings → 28/24px, 12px component padding → 8px, 56px row height → 52px. Build shared components with an explicit size prop (driven by breakpoint) rather than relying purely on responsive CSS for type/spacing — that's how the source file itself is structured.

---

## Gaps & inconsistencies flagged (not guessed)

- **No error/destructive/success color exists anywhere in the file.** Verified directly on the "Supprimer le projet" confirmation dialog and the file's context-menu "Supprimer" options — both reuse the standard `--orange` accent with only an icon (trash) to signal destructiveness. If the WCAG-AA, non-color-reliant requirement in build-context.md needs a dedicated danger color, that has to be defined net-new — it is not in this Figma file.
- **The documented "COLORS" foundation swatch page (node `1518:39838`) is internally inconsistent** with how components actually use variables:
  - Its "Gris clair (Light Mode)" swatch is bound to `var(--gris-clair_dm, #979797)` — a *dark-mode-suffixed* variable with a different value than the `#717171` (`--gris-clair_lm`) used consistently in every real component (Input, Badge, DataGridCell, Projet card, Discussion, Nav, etc.). I trusted the real component usage (`#717171`) as source of truth for the "Gris clair" role.
  - Its "Blanc (Light Mode)" swatch is likewise bound to `var(--blanc_dm, white)` instead of `--blanc_lm`. Value happens to match (white), so no functional gap here, just a naming inconsistency worth cleaning up in Figma.
- **One instance of `var(--layout/radius/small, 8px)` is used as a flex `gap` value** (in a `NavSubItem` variant), not as a `border-radius`. Almost certainly an authoring slip in Figma rather than an intentional pattern — flagging rather than treating "radius tokens can also mean spacing" as a real rule.
- **No dedicated Typography or Spacing/Radius specimen page exists** in the Composants file (there is a "COLORS" foundation page but no equivalent for type/spacing/radius). Every typography, spacing and radius value above was reconstructed by sampling real component instances (Button, Input, Badge, Nav, DataGridCell, Header, SubHeader, Tableau, Projet card, ContextMenu), not read off a single canonical spec frame — if design later adds one, re-verify against it.
- **No numeric line-height or letter-spacing tokens are defined** — only `normal` (browser default) and a literal `1.5` multiplier appear in the file.
- **The page background wash is a raster image asset (25% opacity over white), not a flat or gradient color token** — there are no hex stops to extract. Reuse the source asset (`Background / Desktop / LightMode`, node `61:3738`) rather than approximating it with a CSS gradient.
- **Onest is used in exactly one place** (the Input field's Label, via `--title_txt`) — its intended scope (just form labels, or all headings/emphasis text) isn't clear from the sampled components, since headings use Inter SemiBold instead. Confirm with design before deciding whether Onest belongs in the Tailwind font stack beyond form labels.
