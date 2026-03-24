<!--
  SYNC IMPACT REPORT
  ==================
  Version change: 0.0.0 (template) → 1.0.0
  Modified principles: N/A — initial ratification from blank template.

  Added sections:
  - Core Principles (5 principles defined)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance

  Removed sections: N/A (template placeholders replaced)

  Templates reviewed:
  - .specify/templates/plan-template.md  ✅ No changes required (generic template; compatible)
  - .specify/templates/spec-template.md  ✅ No changes required (generic template; compatible)
  - .specify/templates/tasks-template.md ✅ No changes required (generic template; compatible)

  Follow-up TODOs: None. All placeholders resolved.
-->

# ShoeSell Constitution

## Core Principles

### I. Component-First Architecture

Every UI feature MUST be built as a standalone Angular 20 component. Specifically:

- **Self-contained**: each component owns its template, scoped styles (ViewEncapsulation), and
  local state via Angular Signals. No reliance on globally mutated state.
- **Lazy-loaded**: feature areas (catalog, cart, checkout, user account) MUST be lazy-loaded
  routes to minimise the initial JS bundle.
- **Reusable**: shared UI elements (product card, price badge, size selector) MUST live in
  `src/app/shared/components/` and MUST NOT be duplicated across feature folders.

**Rationale**: Angular 20 standalone components remove NgModule boilerplate; enforcing this
principle keeps the dependency graph clean and prevents legacy module-based patterns.

### II. Bootstrap-Driven UI (NON-NEGOTIABLE)

All visual presentation MUST use Bootstrap 5 utility classes and built-in components. Custom CSS
is permitted only for:

- Brand color and spacing tokens declared as CSS custom properties in `src/styles.css`.
- Component-specific overrides that cannot be expressed with Bootstrap utilities.

Introducing any additional third-party UI component library (e.g., Angular Material, PrimeNG)
is PROHIBITED without a formal constitution amendment.

**Rationale**: A single styling system eliminates design inconsistency, reduces CSS bundle size,
and allows any contributor to modify any screen without context-switching to a second design
system.

### III. Test-First Development (NON-NEGOTIABLE)

Unit tests MUST be written before implementation code. The mandatory cycle is:

1. Write a failing test (Karma + Jasmine).
2. Obtain peer approval on test expectations.
3. Implement the minimum code to make the test pass.
4. Refactor while keeping tests green.

E2E tests for critical purchase flows (product search → add-to-cart → checkout →
order confirmation) MUST be maintained with Cypress or Playwright and executed in CI on
every pull request.

**Rationale**: Regressions in an e-commerce checkout flow have direct revenue impact;
test-first discipline is the primary safeguard against shipping broken purchase paths.

### IV. E-Commerce Security & Data Integrity

All transactional operations MUST enforce:

- Input validation on the client (Angular Reactive Forms with built-in validators) AND on the
  server API — never trust client-side data alone.
- No pricing, discount, or inventory logic on the client; these values MUST originate from
  server responses only.
- HTTPS-only communication; payment card data and personal information MUST NOT be stored in
  `localStorage` or `sessionStorage`.
- CSRF protection on all state-mutating API calls.
- `npm audit` MUST pass with zero critical vulnerabilities before merging to `main`.

**Rationale**: OWASP Top 10 risks — broken access control, injection, and cryptographic
failures — are especially severe in retail applications handling payments and personal data.

### V. Performance & Accessibility

Every public-facing page MUST satisfy:

- **Core Web Vitals**: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on a simulated 4G device (Lighthouse
  CI check in pull requests).
- **Accessibility**: WCAG 2.1 Level AA — all Bootstrap interactive components MUST carry correct
  ARIA roles, labels, and keyboard navigation.
- **SSR**: Angular Server-Side Rendering MUST be enabled for product catalog and product detail
  pages to guarantee search-engine indexability and first-contentful-paint performance.

**Rationale**: A 1-second delay in page load time reduces conversions by ~7%; accessibility is
also a legal requirement for public retail sites in most jurisdictions.

## Technology Stack & Constraints

- **Framework**: Angular 20 (standalone components, Signals-based reactivity, SSR via Angular
  Universal / `@angular/ssr`).
- **Styling**: Bootstrap 5. No other CSS framework may be introduced.
- **Language**: TypeScript 5.x with strict mode enforced (`"strict": true` in `tsconfig.json`).
- **Testing**: Karma + Jasmine for unit tests; Cypress or Playwright for E2E.
- **Build toolchain**: Angular CLI (`ng build`); production builds MUST enable build optimization
  and MUST NOT include source maps.
- **Package manager**: npm. `package-lock.json` MUST be committed to version control.
- **Node.js**: Active LTS release compatible with Angular 20 requirements.
- **Browser support**: Last 2 major versions of Chrome, Firefox, Safari, and Edge.

## Development Workflow

- **Branching**: Feature branches named `[###-feature-name]` branched from `main`; pull
  requests are required before merging.
- **Code review**: Every PR MUST receive at least one peer approval and MUST pass all CI checks
  (ESLint, unit tests, E2E smoke suite) before merge.
- **Linting**: ESLint with `@angular-eslint` ruleset MUST pass with zero errors; Prettier
  enforces consistent formatting.
- **Commit convention**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- **Environments**: `environment.ts`, `environment.staging.ts`, and `environment.production.ts`
  MUST be maintained; development-only values MUST NOT appear in staging or production builds.

## Governance

This constitution supersedes all informal conventions and verbal agreements. Compliance MUST be
verified during pull request reviews and at each sprint retrospective.

**Amendment procedure**:

1. Raise a GitHub Issue tagged `constitution-amendment` describing the proposed change and its
   rationale.
2. Minimum discussion window: 3 business days.
3. Approval: majority sign-off from active contributors.
4. Update this file, increment the version following the policy below, and record the
   `Last Amended` date.
5. Propagate changes to `.specify/templates/` files as required and note them in the Sync
   Impact Report prepended to this file.

**Versioning policy**:

- MAJOR: removal or redefinition of a principle, or any backward-incompatible governance change.
- MINOR: new principle or section added, or materially expanded guidance.
- PATCH: clarifications, wording improvements, or typo fixes.

**Compliance review**: Constitution compliance MUST be confirmed at the start of every sprint
retrospective and during every PR review.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
