# SPEC.md — Build Plan: CompagnyChatGPT "Projet" Prototype

This is the authoritative build plan. It assumes the reader has [build-context.md](build-context.md) (objectives, screen inventory, happy-path flow tables, tech stack, Figma links) and [design.md](design.md) (color/type/spacing/radius tokens, composition patterns) open as references — this file does not repeat their content, only the decisions layered on top of them.

## 1. Scope boundary

- **In scope**: all three happy-path journeys in build-context.md §8, in full — every screen, dialog, and pin/unpin/preview state listed there, for both desktop and mobile.
- **App shell outside the three journeys is static chrome, not built out.** The sidebar's "Bibliothèque de prompts" and top-level "Discussions"/"Épinglés" sections, the header search icon, and the account-menu icon render visually (per Home's Figma screen) but are **not clickable** — the only functional sidebar entry point is **"Projets"**, which starts Journey 1.
- **No login/auth screen.** The app loads already "authenticated" as the fixed mock user shown in the profile chip ("Hubert Jeanne (Safran)"). There is no auth flow to build.
- **No real backend.** All data lives in a client-side mock data module + `localStorage`. No API routes, no database.
- Chat reaction icons (Like/Dislike/Reset) render on messages for visual fidelity but are **non-interactive** — no "AI got it wrong" flow is built.
- No functional search, no error/validation states, no upload-failure handling — see §5 (States) for the full list of what's deliberately excluded.

## 2. Routing (Next.js App Router, real routes)

| Route | Screen | Notes |
|---|---|---|
| `/` | Home | Static shell: sidebar + header + (non-functional) composer, matching the Home Figma screen. Entry point for Journey 1. |
| `/projects` | Liste des projets | Card grid. Entry point for Journeys 2 & 3 (clicking "Dashboard de suivi de projet"). |
| `/projects/[projectId]` | Projet → **Chat tab** (default) | |
| `/projects/[projectId]/sources` | Projet → **Sources tab** | |

Every dialog/popup in build-context.md's tables (Créer/Modifier/Supprimer un projet, Supprimer un chat, Ajouter des fichiers sources, Supprimer un fichier sources, Aperçu du fichier) is a **client-side overlay** (Radix Dialog/Popover) on top of one of the four routes above — **not** a separate route. The mobile Nav drawer is likewise an overlay, triggered by the burger button, not a route.

Pin/unpin and rename (from a card's or chat's "…" menu) execute **immediately from the context menu** with no confirmation dialog — this matches the Figma ContextMenu component, which lists "Épingler"/"Désépingler"/"Renommer" as plain one-click options. Only **Supprimer** (delete) — for both projects and chats — opens a confirmation dialog first.

## 3. Screen-by-screen states

Only the states listed below are in scope. Anything not listed (error states, form validation, upload failure, skeleton/initial-load states, empty sources, empty pinned sections) is **explicitly out of scope** — build only the happy path for those.

| Screen | Default | Other required states |
|---|---|---|
| Home | ✅ static shell | — |
| Liste des projets | ✅ populated grid (5 seeded cards, §4) | **Zero-projects empty state** — if all projects are deleted during the demo, show an empty-state message + the "+ Projet" CTA still visible. (Not in Figma — see §6 gap note.) |
| Projet → Chat | ✅ populated chat list + composer | **Zero-chats empty state** — "Vous n'avez pas de chat pour ce projet" (this one *is* in the Figma reference screenshots, already captured) |
| Chat conversation (after sending the scripted prompt) | ✅ scripted exchange | **AI "thinking" loading state** — a brief typing/loading indicator (~800–1500ms) between sending the prompt and the scripted answer appearing. This is the *only* loading state in the whole prototype. |
| Projet → Sources | ✅ populated table (6 seeded files) | — |
| All dialogs (create/edit/delete/upload/preview) | ✅ happy path only | No validation errors, no upload failure — every action in these dialogs always succeeds. |

## 4. Mock data

One mock data module (e.g. `lib/mock-data.ts`) is the single source of truth, matching build-context.md §5's requirement that component data be mocked in a file, not hardcoded inline. Seed exactly what the Figma reference screenshots show:

**Projects (Liste des projets), pre-seeded:**
1. **Dashboard de suivi de projet** — the working project for Journeys 2 & 3 (Sources + Chat). Description: Lorem-ipsum placeholder text as shown in Figma. Date: "Aujourd'hui".
2. Projet Secured — used for the pin/unpin demo in Journey 1 step 9–12. Date: "20 août".
3. Site e-commerce de pièces de revente vélo — date "3 août".
4. POC Salesforce — date "20 août".
5. Migration cloud AZURE vers AWS — date "13 mars".

**Journey 1 (Gérer un projet) is scripted to create, rename, then delete its own project — do not confuse this with the 5 pre-seeded projects above:**
- Create → named **"Voyage à Copenhague"**
- Edit → renamed to **"Copenhague"**
- Delete → removed

**Sources, pre-seeded inside "Dashboard de suivi de projet"** (7 files — see gap note below):
1. Quarterly June-July 2026 analysis.xls — Excel, 12 août
2. Analyse de marché sur les LLM 2026 — PDF, 10 août
3. Gartner adoption graph.jpg — Image, 9 août (the one file with a real image preview — see §5 file-preview rule)
4. Product requirement Dashboard de suivi.docx — Docx, 14 juillet
5. Fichier partagé - étude de faisabilité.md — Md, 10 juillet
6. Dataset.json — JSON, 8 juillet
7. **1.2_AI_Fluency_Summary_16x9.pdf** — added so the citation badge in the scripted chat answer (below) resolves to a real row in this table; build-context.md's flow cites this filename but never lists it as a pre-existing source, so it's added here to keep the demo internally consistent.

**Chat, pre-seeded inside "Dashboard de suivi de projet"** — sidebar/tab shows a small history list (e.g. "Propose un plan pour implémenter le projet à partir du PRD", "Créer un kanban à partir des user stories…") plus one **pinned** entry, matching the pin/unpin affordance from Journey 3.

**The one scripted chat exchange** (Journey 3, step 12–14):
- User sends: *"Quelles sont les 4 catégories du 4D Frameworks ?"*
- After the loading state, assistant replies with a scripted answer that includes a clickable source-citation badge: **"1.2_AI_Fluency_Summary_16x9.pdf"**. Clicking the badge opens the same file-preview dialog used in Sources (generic placeholder, since it's a PDF — see §5).
- **Any other user input**: sendable, but gets one generic canned reply with no citation. No other prompt/response pairs need to be scripted.

## 5. Mocked vs. real — explicit rules

| Behavior | Rule |
|---|---|
| Chat responses | Fully scripted (§4). No real LLM call. |
| File upload | Fully mocked — clicking "Charger des fichiers depuis l'appareil" always inserts one fixed mock file into the Sources table. No real OS file picker. |
| File preview | Same dialog for every file type. The one `.jpg` renders as an actual image; every other type (`.xls`, `.pdf`, `.docx`, `.json`, `.md`) shows a generic file-type icon + filename — no real document rendering. |
| Persistence | All mutations (create/edit/delete/pin project or chat, uploaded sources, sent messages) write to `localStorage`, seeded from the mock module on first load. A refresh preserves demo state. |
| Reactions (Like/Dislike/Reset) | Rendered, not wired to any handler. |
| Non-Projet shell (search, account menu, Bibliothèque de prompts, top-level Discussions) | Rendered, not wired to any handler — see §1. |

## 6. Gaps carried over from design.md — resolved here, not re-litigated

- No destructive/error color exists in the design system (design.md §Gaps). Since error states are out of scope entirely (§3), this doesn't block anything — the only destructive UI is the delete-confirmation button, which per design.md correctly reuses the orange accent + trash icon.
- The "zero projects" empty state is **not** present anywhere in the Figma references. Build it as a simple, on-brand message (using existing type/color tokens from design.md — muted `--gris-clair_lm` text, `--orange` "+ Projet" CTA) rather than inventing new visual language.

## 7. Verification checklist

- [ ] All 3 journeys from build-context.md §8 are clickable end-to-end, desktop **and** mobile, exactly matching each flow table's steps
- [ ] Every screen/dialog listed in build-context.md §7.3 exists, styled per design.md tokens (no invented hex values, no invented spacing/radius off the documented scales)
- [ ] Routes match §2 exactly; browser back/forward and refresh all work correctly on `/`, `/projects`, `/projects/[id]`, `/projects/[id]/sources`
- [ ] Pin/unpin/rename fire immediately from the "…" menu with no confirmation dialog; delete (project or chat) always shows a confirmation dialog first
- [ ] Liste des projets is seeded with the 5 projects in §4; deleting all of them reveals the zero-projects empty state with a working "+ Projet" CTA
- [ ] The Journey-1 create → rename → delete script uses "Voyage à Copenhague" → "Copenhague" → deleted, and never touches the 5 pre-seeded projects
- [ ] "Dashboard de suivi de projet" Sources tab lists exactly the 7 files in §4, including `1.2_AI_Fluency_Summary_16x9.pdf`
- [ ] Sending the exact prompt "Quelles sont les 4 catégories du 4D Frameworks ?" triggers: loading indicator → scripted answer → clickable citation badge → file-preview dialog for `1.2_AI_Fluency_Summary_16x9.pdf`
- [ ] Any other typed message still sends and gets a generic canned reply (no citation, no error)
- [ ] Clicking the `.jpg` source shows a real image in the preview dialog; every other file type shows the generic placeholder version of the same dialog
- [ ] Upload dialog always succeeds and inserts a fixed mock file — no real file picker, no failure case
- [ ] All state (projects, sources, chats, pins) persists across a page refresh via `localStorage`
- [ ] Sidebar items outside "Projets" (Bibliothèque de prompts, Discussions, Épinglés, search icon, account menu) render but are inert — clicking them does nothing
- [ ] Chat reaction icons render but are inert
- [ ] No login screen exists anywhere in the app
- [ ] No error, validation, or upload-failure state exists anywhere in the app
- [ ] Every screen passes a WCAG AA spot-check (contrast, focus-visible, keyboard reachability) per build-context.md §5
