<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-space

Early-stage Next.js 16 App Router UI. `src/app/page.tsx` is still an empty placeholder; the README is untouched `create-next-app` boilerplate, so trust `package.json`, `next.config.ts`, and this file instead.

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000. It writes `.next/dev/lock`; if a server is already running, reuse it rather than starting a second one.
- `npm run build` / `npm run start` — production build and server.
- `npm run lint` — ESLint 9 flat config over the whole repo.
- `npx tsc --noEmit` — the only typecheck; there is no `typecheck` script and no test runner installed.
- Use npm; `package-lock.json` is the only lockfile. No CI, pre-commit, or env setup exists yet.

## Next.js 16 / toolchain quirks

- App Router lives in `src/app`; `@/*` maps to `src/*` (`tsconfig.json`).
- `next dev`/`next build` use Turbopack by default. CSS is handled by the `@tailwindcss/turbopack` loader configured in `next.config.ts`; don't add a `postcss.config.*` or webpack config unless you also replace that loader.
- Next 16 conventions: `params`/`searchParams` are Promises, and `proxy.ts` replaces `middleware.ts`. Check the bundled docs before reusing older Next patterns.
- `LayoutProps<"/">`, `PageProps`, and route types are generated into `.next/types`. On a clean checkout, run `next dev` or `next build` before `tsc` or those globals will be missing.
- React Compiler is enabled (`reactCompiler: true`). Write Rules-of-React-clean components instead of reaching for manual `useMemo`/`useCallback`.

## UI and styling

- `components.json` uses shadcn's `base-nova` style built on `@base-ui/react`, not Radix. Add components with `npx shadcn add <name>` (the CLI is a local dependency) so generated code matches the existing style.
- `cn` is the `cn` npm package (a `clsx` + `tailwind-merge` replacement), re-exported from `src/lib/utils.ts`. Import `{ cn }` from `@/lib/utils`; do not add `clsx`/`tailwind-merge` or rewrite `utils.ts`.
- Tailwind v4 is CSS-first: theme tokens live in `src/app/globals.css` (`@theme inline` plus CSS variables); there is no `tailwind.config.*`. Use semantic classes such as `bg-background`, `text-foreground`, and `border-border`, plus the `dark` variant.
- `src/components/ui/` contains shadcn-generated primitives; compose them rather than duplicating their markup.

## Repo notes

- The root layout loads Outfit via `next/font/google` and applies it on `<html>`; the README's Geist claim is stale.
- Keep the Next-managed block(s) in this file intact — `next dev` regenerates them. `experimental.agentFeedback` is enabled in `next.config.ts`, so a `nextjs-agent-feedback` block may be appended later; commit it with your work.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
