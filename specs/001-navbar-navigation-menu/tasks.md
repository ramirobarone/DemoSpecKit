---
description: "Task list for Navbar de Navegación feature implementation"
---

# Tasks: Navbar de Navegación

**Feature Branch**: `001-navbar-navigation-menu`  
**Input**: Design documents from `specs/001-navbar-navigation-menu/`  
**Prerequisites**: spec.md ✅  |  plan.md ✗ (tasks derived from spec.md + constitution)  
**Tests**: Not included (not explicitly requested in spec.md)

**Stack**: Angular 20 standalone · Bootstrap 5 · TypeScript 5 strict · `DemoApp/` project root

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to ([US1], [US2], [US3])

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install Bootstrap 5, create the directory structure required by the constitution, and
wire the brand stylesheet tokens before any component work begins.

- [X] T001 Install Bootstrap 5 npm package and add Bootstrap CSS to styles array in `DemoApp/angular.json`
- [X] T002 Add Bootstrap JS bundle to scripts array in `DemoApp/angular.json` (required for navbar collapse JS)
- [X] T003 [P] Declare brand CSS custom properties (`--shoesell-primary`, `--shoesell-secondary`, spacing tokens) in `DemoApp/src/styles.css`
- [X] T004 [P] Create shared components directory `DemoApp/src/app/shared/components/navbar/` (empty placeholder files: `navbar.component.ts`, `navbar.component.html`, `navbar.component.css`)

**Checkpoint**: Bootstrap 5 available globally; shared components scaffold ready — component authoring can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the Angular Router configuration with the three required routes before routing
directives are added to the navbar, and register the router outlet in `AppComponent`.

**⚠️ CRITICAL**: No user-story work can begin until this component shell and routes are declared.

- [X] T005 Create stub `HomeComponent` (standalone, single `<h1>` placeholder) in `DemoApp/src/app/features/home/home.component.ts`
- [X] T006 [P] Create stub `ProductosComponent` (standalone, single `<h1>` placeholder) in `DemoApp/src/app/features/productos/productos.component.ts`
- [X] T007 [P] Create stub `AcercaDeComponent` (standalone, single `<h1>` placeholder) in `DemoApp/src/app/features/acerca-de/acerca-de.component.ts`
- [X] T008 Register lazy-loaded routes (`/` → HomeComponent, `/productos` → ProductosComponent, `/acerca-de` → AcercaDeComponent) in `DemoApp/src/app/app.routes.ts`

**Checkpoint**: Router module has all three routes declared — `routerLink` bindings in the navbar can now resolve.

---

## Phase 3: User Story 1 — Navegación principal visible (P1) 🎯 MVP

**Goal**: A persistent Bootstrap navbar component renders at the top of every page displaying the
brand name and the three menu items ("Home", "Productos", "Acerca de").

**Independent Test**: Run `ng serve`, open the browser, navigate to `http://localhost:4200`; the
navbar must be visible with exactly three labelled items and the brand text "ShoeSell" before any
route navigation is attempted.

### Implementation for User Story 1

- [X] T009 [P] [US1] Implement `NavbarComponent` class (standalone, imports: `RouterLink`, `RouterLinkActive`, `NgClass`) with an Angular Signal `isMenuOpen = signal(false)` in `DemoApp/src/app/shared/components/navbar/navbar.component.ts`
- [X] T010 [P] [US1] Author Bootstrap `<nav class="navbar navbar-expand-lg">` template with brand link ("ShoeSell → `/`") and the three nav-link items ("Home", "Productos", "Acerca de") in `DemoApp/src/app/shared/components/navbar/navbar.component.html`
- [X] T011 [US1] Add all required ARIA attributes: `role="navigation"`, `aria-label="Navegación principal"` on `<nav>`, `aria-current="page"` on the active link, `aria-label="Inicio"` on brand link — in `DemoApp/src/app/shared/components/navbar/navbar.component.html`
- [X] T012 [US1] Import `NavbarComponent` into `App` imports array and insert `<app-navbar>` above `<router-outlet>` in `DemoApp/src/app/app.ts` and `DemoApp/src/app/app.html`

**Checkpoint**: US1 independently testable — navbar with three labelled items renders at the top of every view without any interaction needed.

---

## Phase 4: User Story 2 — Navegación funcional entre secciones (P2)

**Goal**: Each of the three navbar items navigates to its registered route via Angular Router and the
active item is highlighted automatically.

**Independent Test**: Click each of the three nav items in sequence; the URL must update to `/`,
`/productos`, and `/acerca-de` respectively, and the clicked item must show Bootstrap's `active` CSS
class; no full-page reload must occur.

### Implementation for User Story 2

- [X] T013 [US2] Bind `routerLink` directives (`/`, `/productos`, `/acerca-de`) and `routerLinkActive="active"` with `[routerLinkActiveOptions]="{ exact: true }"` on each nav-link in `DemoApp/src/app/shared/components/navbar/navbar.component.html`
- [X] T014 [US2] Bind `[attr.aria-current]` to `"page"` conditionally using `routerLinkActive` reference variable on each nav item in `DemoApp/src/app/shared/components/navbar/navbar.component.html`
- [X] T015 [US2] Verify that `provideRouter(routes)` and `withComponentInputBinding()` are present in `DemoApp/src/app/app.config.ts`; add `withComponentInputBinding()` if missing

**Checkpoint**: US2 independently testable — all three nav items route correctly with zero page reloads and the active state reflects the current URL on direct URL load and after navigation events.

---

## Phase 5: User Story 3 — Navbar responsivo (P3)

**Goal**: On viewports ≤ 992 px a hamburger toggler button appears; tapping it expands/collapses the
menu; selecting a menu item closes the menu automatically.

**Independent Test**: Open DevTools; set viewport to 375 px wide; the hamburger button must appear,
the menu must be hidden; press the button — the three items expand; click any item — the menu
collapses and the route changes.

### Implementation for User Story 3

- [X] T016 [US3] Add Bootstrap collapse markup: `<button class="navbar-toggler">` with `aria-expanded` binding and `aria-controls="navbarMenu"`, plus `<div id="navbarMenu" class="collapse navbar-collapse" [class.show]="isMenuOpen()">` in `DemoApp/src/app/shared/components/navbar/navbar.component.html`
- [X] T017 [US3] Implement hamburger toggle handler: `toggleMenu()` method mutates `isMenuOpen` Signal; bind `(click)="toggleMenu()"` on the toggler button in `DemoApp/src/app/shared/components/navbar/navbar.component.ts`
- [X] T018 [US3] Inject `Router` and subscribe to `NavigationEnd` events (via Angular's `takeUntilDestroyed`) to set `isMenuOpen` to `false` after any successful navigation in `DemoApp/src/app/shared/components/navbar/navbar.component.ts`
- [X] T019 [US3] Bind `[attr.aria-expanded]="isMenuOpen()"` on the toggler button so screen-readers announce the current collapsed/expanded state in `DemoApp/src/app/shared/components/navbar/navbar.component.html`

**Checkpoint**: US3 independently testable — hamburger toggle works at 375 px and menu auto-closes on navigation; all three user stories are now fully functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify linting, accessibility, and build health across all stories.

- [X] T020 [P] Run `ng lint` inside `DemoApp/` and fix all ESLint / angular-eslint errors — target: zero warnings
- [X] T021 [P] Run `ng build --configuration production` inside `DemoApp/` and confirm zero compilation errors and no `any` type leaks (TypeScript strict mode)
- [ ] T022 Run Lighthouse DevTools audit on `http://localhost:4200`; confirm Accessibility score ≥ 95 and CLS = 0 during navbar toggle (SC-004, SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion (Bootstrap must be installed before routes stub components are built)
- **User Story 1 (Phase 3)**: Depends on Phase 2 (routes must exist for `routerLink` not to produce compilation warning)
- **User Story 2 (Phase 4)**: Depends on Phase 3 (NavbarComponent must exist before bindings are added)
- **User Story 3 (Phase 5)**: Depends on Phase 4 (collapse markup extends the navbar built in Phase 3)
- **Polish (Phase 6)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational — no dependency on other user stories
- **US2 (P2)**: Starts after US1 is testable — extends the NavbarComponent with routing directives
- **US3 (P3)**: Starts after US2 — extends the same component with responsive collapse logic

### Within Each User Story

- Component `.ts` and `.html` tasks marked `[P]` can be worked in parallel (different files)
- Stub feature components (T005, T006, T007) can be worked in parallel after T004
- ARIA attribute tasks depend on the base template being authored first

---

## Parallel Execution Examples

### Phase 1 — Setup (all parallelizable after T001/T002)

```
T001 → T002 → T003 ┐
                    ├─ all complete → Phase 2 begins
              T004 ─┘
```

### Phase 3 — User Story 1 (T009 and T010 are parallel)

```
T009 (component class) ─┐
                         ├─ T011 (ARIA) → T012 (register in AppComponent)
T010 (HTML template) ───┘
```

### Phase 2 — Foundational stub components (T006 and T007 parallel)

```
T005 (Home) ─────┐
T006 (Productos) ─┼─ T008 (register routes)
T007 (AcercaDe) ─┘
```

---

## Implementation Strategy

**MVP = Phase 1 + Phase 2 + Phase 3** (T001–T012)

After T012 is complete, a reviewer can run `ng serve` and manually confirm US1 acceptance scenarios
without any further tasks. This represents the minimum shippable increment.

**Increment 2 = Phase 4** (T013–T015) — adds real routing and active-link feedback.

**Increment 3 = Phase 5** (T016–T019) — makes the navbar fully responsive on mobile.

**Final = Phase 6** (T020–T022) — code quality, build verification and Lighthouse audit gate.
