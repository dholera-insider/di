# Website Audit Summary

Overall status: **HIGH RISK — not ready for an unqualified production sign-off.**

Audited on 14 September 2026. Scope: 174 JavaScript/JSX source files inventoried, 33 page routes, all five APIs, all eight investor pages, 14 form implementations, and first-party lead/WhatsApp/phone tracking. Detailed inspection focused on live lead paths, their imports, APIs, CMS rendering, routing, configuration, and dependencies. Static inspection is not an exhaustive runtime test of every page.

No AGENTS.md was found in the repository or its applicable parent paths. The supplied audit instructions and `C:/Users/vikas/Downloads/brain.md` were read. The project is Next.js 15.1.9 App Router, React 19, JavaScript, npm, Tailwind, Sanity CMS/Studio, TeleCRM, Google reCAPTCHA, GTM and Clarity. No SQL database, custom authentication/session system, payment handler, upload API, or email-sending integration was found. Sanity Studio authentication is provided by Sanity, not by a custom public API here.

Evidence labels: **CONFIRMED** means supported by source or local tests; **LIKELY** means impact still depends on runtime conditions; **NEEDS MANUAL VERIFICATION** identifies unavailable deployment/account/browser information. Locations below refer to current functions; pre-fix evidence is described explicitly and remains in Git HEAD for comparison. No production requests, real lead submissions, external attack traffic, credential rotation, or deployment were performed.

## Critical

No P0 compromise or immediately exploitable production outage was confirmed. npm reports critical package advisories; their applicability is differentiated below rather than presented as proof of exploitation.

## High Priority

### H1 — Browser-exposed CRM credential and bypassed server verification

- **Severity / category:** P1, security/forms. **Evidence:** CONFIRMED. **Confidence:** High.
- **File / location:** The 11 CRM forms listed under Forms, formerly their `onRecaptchaSuccess` functions; now `src/app/api/lead/route.js`, `POST`, and `src/lib/lead-client.js`, `submitLead`.
- **Problem:** Every implementation previously sent a bearer token from `NEXT_PUBLIC_TELECRM_API_KEY` directly to TeleCRM. The local environment has that variable configured. Several form payloads omitted the CAPTCHA token; none used the existing server verification route.
- **Impact:** Anyone with the built frontend could reuse the credential outside the forms. Browser validation/localStorage limits did not protect the upstream CRM.
- **Fix:** All 11 implementations now use `/api/lead`; CAPTCHA verification, bounded validation, source/field mapping, and the bearer header run on the server. Existing contact email/country/message/project fields and brochure source/tags are preserved.
- **Status:** Code fixed; credential rotation and redeployment **outstanding**. The server temporarily accepts the old variable name as a fallback to avoid breaking the current environment. Configure a newly rotated `TELECRM_API_KEY`, remove the public variable, redeploy and invalidate old assets. Removing client references does not revoke a credential already distributed.

### H2 — Vulnerable dependency versions

- **Severity / category:** P1 production risk; dependency advisories include critical severity. **Evidence:** CONFIRMED package versions/advisories; exploit applicability varies. **Confidence:** High for versions, Medium for deployment impact.
- **File / location:** `package.json`, `package-lock.json`, `audit/dependencies.json`; installed Next.js **15.1.9**, jsPDF **3.0.0**.
- **Problem / impact:** npm reports **73 advisories: 5 critical, 28 high, 35 moderate, 5 low**, including transitive and development packages. App Router/RSC and image-optimizer advisories merit priority. This is not a count of 73 independently exploitable website flaws.
- **Fix:** Upgrade Next.js within a supported, patched 15.x release and align its ESLint package; review the other direct dependencies and rerun build/tests/audit. The official August release identifies **15.5.24** as the patched 15.x baseline for that release: [Next.js security release](https://nextjs.org/blog/august-2026-security-release). Recheck current advisories before deployment.
- **Status:** Unresolved; no blind dependency upgrades made. The Windows RCE advisory requires both Pages Router and App Router; this repository has no `src/pages` router (`src/app/pages` is an ordinary component folder), so that prerequisite was not established. AVIF optimizer risk depends on serving attacker-controlled AVIF through the deployed optimizer. jsPDF is imported by an apparently unused cost-sheet component; its server file-inclusion advisory is not evidence of a live server file-read endpoint here.

### H3 — Public contact-write API lacked validation and abuse protection

- **Severity / category:** P1, API/data integrity. **Evidence:** CONFIRMED. **Confidence:** High.
- **File / location:** `src/app/api/contact/route.js`, `POST`.
- **Problem:** The original endpoint copied arbitrary `name/email/subject/message` values directly into `client.create`. It had no size limits, CAPTCHA, rate limit, or duplicate guard; malformed JSON returned 500.
- **Impact:** Anonymous callers could attempt to flood the contact collection and create malformed records wherever the configured Sanity token permits writes.
- **Fix:** Added streaming 16 KiB body limit, string/length/email validation, origin guard, server CAPTCHA, bounded local throttling, write-token selection, sanitized errors, no-store responses, a 15-second Sanity timeout and no automatic retries. `createIfNotExists` uses a deterministic ID for identical enquiries within a UTC day, avoiding concurrent duplicate writes across workers.
- **Status:** Fixed locally. No in-repository caller was found; any external caller must now supply `recaptchaToken`. This endpoint stores records; it does **not** send email. Identical enquiries on separate UTC days remain separate; no all-time deduplication is claimed.

### H4 — Production-wide spam/duplicate guarantees remain incomplete

- **Severity / category:** P1, reliability/abuse protection. **Evidence:** CONFIRMED design limit. **Confidence:** High.
- **File / location:** `src/lib/form-security.js`, `guardRequest` / `reserveSubmission`; `src/app/api/lead/route.js`, `POST`.
- **Problem / impact:** The new limiter and CRM reservation map are process-local. Restarts or multiple workers can bypass shared quotas/reservations. A CRM timeout can mean the lead was accepted even when no response arrived. CAPTCHA alone does not stop sustained solved-CAPTCHA abuse.
- **Fix:** Current protection: 120 requests/minute per process; optional 10/minute per trusted-IP header; bounded maps; five-minute same-phone CRM reservation; no automatic CRM retry; visible ambiguous-outcome messages. Deploy a shared/edge rate limiter and durable idempotency/outcome store, preferably backed by an upstream idempotency contract.
- **Status:** Partially fixed. Never configure `FORM_TRUSTED_IP_HEADER` to trust an arbitrary client-supplied header. Tune quotas to real traffic and proxy topology. Body-stream timeouts, connection limits and maximum ingress body size also need deployment enforcement.

## Medium Priority

### M1 — Duplicate submission, CAPTCHA lifecycle and error handling

- **Severity / category:** P2, forms/reliability. **Evidence:** CONFIRMED. **Confidence:** High for static/local checks.
- **File / location:** All 11 CRM form handlers; `src/lib/lead-client.js`.
- **Problem:** Independent script loaders raced; several resets used a DOM element or omitted the widget ID; checkbox retries called `execute`; some loader failures were marked loaded; callbacks could retain stale form values. State-only loading indicators did not synchronously block repeated callbacks. Browser storage errors could turn successful submissions into apparent failures.
- **Impact:** Wrong form reset, duplicate request attempts, stale data, stuck/loading failures, or misleading errors after success.
- **Fix / status:** Fixed with a shared explicit loader, compact v2 widgets, widget ownership, ref locks, current callbacks, expiry/error feedback, bounded fetches, safe storage, and cleanup of success timers. A real `<form>` replaces `CommonForm`'s former `<div onSubmit>` and button click handler, restoring native validation and Enter submission. Legacy client-side daily limits remain UX hints, not security controls. Live Google key/domain configuration remains unverified.
- **Reference:** [Google display/widget documentation](https://developers.google.com/recaptcha/docs/display), [server token verification](https://developers.google.com/recaptcha/docs/verify).

### M2 — Conversion crash and incomplete CTA tracking

- **Severity / category:** P2, analytics/reliability. **Evidence:** CONFIRMED first-party source; GTM configuration unavailable. **Confidence:** High.
- **File / location:** `about-dholera-sir/LeadForm.jsx` and `dholera-sir-updates/LeadForm.jsx`, former `page_name: project`; `src/app/components/LeadClickTracking.jsx`; `src/app/layout.js`.
- **Problem / impact:** An undefined `project` reference threw after a successful CRM write. Most WhatsApp/phone links had no first-party event handler, while direct dataLayer calls could throw. Inline Next Script blocks had no stable IDs.
- **Fix / status:** First-party fixes complete: one shared successful `lead_form` push; guarded analytics; one delegated `whatsapp` or `phone_click` event per normal anchor click, with viewport-based device label and pathname; drag-suppressed clicks are ignored; stable GTM/Clarity script IDs. No lead name, email or phone input is included in these events.
- **Remaining:** GTM click triggers, custom HTML tags and GA4 conversion mappings can still double-count independently of this code. Verify in GTM Preview/GA4 DebugView; `phone_click` needs a container mapping. No claim of end-to-end GA4 deduplication is made.

### M3 — Timed popup and mobile/modal usability

- **Severity / category:** P2, frontend/accessibility. **Evidence:** CONFIRMED source defects; browser outcomes need verification. **Confidence:** High for source, Medium for visual impact.
- **File / location:** `TimedContactForm.jsx`, `Contactform.jsx`, `BrochureDownload.jsx`, `PopUpScroll.jsx`, `SlugPageForm.jsx`, `Pop.jsx`, `header.jsx`, `whatsapp.jsx`, `investor/dubai/page.jsx`.
- **Problem:** The current timer was 5 seconds despite the requested 10. Brochure/scroll dialogs and the mobile menu lacked the selectors used to detect open modals. Contact/brochure content could exceed a short viewport. Dubai's fixed bottom bar lacked safe-area padding/end-of-document clearance.
- **Fix / status:** Restored 10 seconds; kept pathname-keyed cancellation and exact non-investor route scope; added modal markers, mutual scroll-popup checks, scrollable short-screen forms, contact/brochure focus handling and scroll lock, and Dubai safe-area clearance. Corrected the floating CTA's assumption that Saudi Arabia still has a mobile action bar. Contact heading/phone IDs are instance-specific.
- **Remaining:** A timer suppressed by an already-open dialog is intentionally skipped for that visit. Keyboard traversal through Google's external challenge iframe, all other modal focus behavior, dragged WhatsApp placement, virtual-keyboard overlap, and all specified viewport sizes need browser verification. No browser is connected in this session.

### M4 — Unsanitized CMS HTML

- **Severity / category:** P2, stored-XSS boundary; potentially higher if low-trust authors/importers can publish. **Evidence:** CONFIRMED unsafe sink; author permissions need verification. **Confidence:** High for sink.
- **File / location:** `src/app/{about-dholera-sir,dholera-sir-blogs,dholera-sir-updates}/[slug]/page.js`, `htmlTableBlock`, `dangerouslySetInnerHTML={{ __html: value.html }}`.
- **Problem / impact:** CMS table HTML reaches the DOM without an allowlist sanitizer, allowing active HTML when a publisher/importer supplies it. No anonymous write path into this HTML field was established.
- **Fix:** Define permitted table markup and sanitize with a maintained server-side sanitizer. Review CMS publication permissions and restrict embedded URLs.
- **Status:** Raw HTML unresolved; unsafe regex sanitization was not introduced. The three CMS JSON-LD components **were fixed** to escape `<`, preventing text from terminating their JSON script element.

### M5 — Brochure CTA without an asset

- **Severity / category:** P2, lead fulfilment. **Evidence:** CONFIRMED. **Confidence:** High.
- **File / location:** `src/app/dholera-sir-blogs/FormComponent.jsx`, `BrochureDownload` call; `src/app/components/BrochureDownload.jsx`, `downloadPDF`.
- **Problem / impact:** The blog CTA does not supply `link`; `pdfUrl` therefore becomes undefined, so a successful lead can be followed by a broken download/navigation. Async synthetic downloads can also be blocked by browsers.
- **Fix / status:** Unresolved: supply the intended brochure URL and present an explicit download link after success. The correct asset should be chosen by the content owner; no unrelated project brochure was substituted.

### M6 — SEO status and route inconsistencies

- **Severity / category:** P2, SEO/routing. **Evidence:** CONFIRMED source; search indexing outcome unverified. **Confidence:** High.
- **File / location:** Three article `[slug]/page.js` components, `src/sanity/lib/api.js:getPostBySlug`, `src/app/investor/layout.jsx`, `robots.js`, `sitemap.js`, `next.config.mjs`.
- **Problem / impact:** Missing posts render an ordinary “not found” view instead of a framework 404; post lookup is not category-scoped, allowing the same slug under multiple article sections. `getPostBySlug` omits `noIndex`, while about-SIR metadata explicitly indexes posts. All investor pages inherit `index:false`; this may be an intentional campaign decision.
- **Fix / status:** Removed the invalid `/policies` sitemap URL and `/_next/` robots block; repaired two nonexistent fallback URLs; moved the specific ABCD redirect ahead of its wildcard. Remaining: proper 404/error boundaries, category-correct canonical/metadata/noIndex handling, and business confirmation of investor indexing. Investor noindex was preserved.

### M7 — Build/lint gate fails

- **Severity / category:** P2, deployment/configuration. **Evidence:** CONFIRMED execution. **Confidence:** High.
- **File / location:** `eslint.config.mjs`, `package.json`, affected existing source recorded in `audit/lint.json` and `audit/build.log`.
- **Problem:** The old FlatCompat configuration crashed with “Converting circular structure to JSON.” The installed config package is 16.x while Next is 15.x. After loading its flat configuration correctly, lint reports **239 errors and 30 warnings**, including 180 `react-hooks/error-boundaries` reports, 45 unescaped-text errors, and existing component/ref/effect issues.
- **Fix / status:** Fixed the lint command/configuration without disabling rules. Production compilation succeeds, but the complete build fails at lint; no production artifact is certified. A comparison of 28 changed source files against HEAD found no increases in error counts per rule (134 before, 125 after). Fix existing errors and align supported tool versions before deployment.

## Low Priority

### L1 — Unused legacy forms and duplicated business logic

- **Severity / category:** P3, maintainability. **Evidence:** CONFIRMED source/import inventory. **Confidence:** High for explicit import graph.
- **File / location:** `components/form.jsx`, `pages/Contact.js`, `components/costSheet.jsx`, `components/Pop.jsx`, `HomePopupController.jsx`; the 11 CRM form copies.
- **Problem / impact:** Two legacy forms log data and display success without persisting it; several imports are absent from package.json. They are not reachable through the current route import graph, so this is not reported as live lead loss. Re-enabling them would be unsafe. `Pop` and its old controller are also currently unused. Most markup and client counters remain duplicated.
- **Fix / status:** Unresolved: retire or repair legacy forms before reuse and gradually consolidate lifecycle logic. Networking/CAPTCHA helpers were shared in this pass; no broad redesign/refactor or deletion of legacy components was performed.

## Security

H1/H3/H4 cover public form exposure. M4 covers CMS HTML. No hardcoded private-key/AWS-key matches were found in the targeted source scan; no secret values are included in this report. `.env.local` is not Git-tracked. Server-only Sanity environment variables are imported through a shared CMS client, but no evidence was found that their values are inlined into client bundles. Review actual bundle output after rotating/redeploying.

**NEEDS MANUAL VERIFICATION:** Sanity dataset visibility and role scopes. Contact PII is stored in the same configured dataset used for public website content; if that dataset is publicly readable, frontend query filtering does not protect contact records. Verify dataset/API access controls without exporting lead records. Also inspect production CSP, HSTS, framing restrictions and trusted-proxy settings: the repository defines no security-header policy, but a CDN/proxy may provide one. Revalidation uses a secret query parameter; migrate callers to a header to reduce URL-log exposure. No authentication bypass was established.

## APIs

| Endpoint | Purpose | Audit result |
|---|---|---|
| `POST /api/lead` | CAPTCHA verification then TeleCRM | Server validation, timed requests, sanitized errors and same-process duplicate guard added; distributed guarantees outstanding. |
| `POST /api/contact` | Sanity contact document | Validation/CAPTCHA/throttling/write token/idempotent same-day insert added; external callers must send CAPTCHA. No email is sent. |
| `GET /api/country` | Header-based phone default | Two-letter syntax validation added; no-store preserved. No external geolocation lookup occurs. |
| `GET /api/redirects` | CMS redirect listing | Read-only. CMS failures have no local try/catch/fallback and may produce a framework 500. Confirm whether the deployment consumes this listing; `next.config.mjs` does not use it. |
| `POST /api/revalidate` | Secret-gated cache invalidation | Existing secret comparison reviewed. Query-string credential/log hygiene and cache-tag alignment need deployment review. Not an unauthenticated mutation endpoint. |

No email submission API, webhook mail sender, server action, file upload or payment endpoint was found.

## Frontend

Reviewed modal composition, route transitions, input handlers, close timers, brochure fulfilment, anchor-based phone/WhatsApp navigation and fixed UI. M1–M3/M5 contain findings. Source-level API failures are now visible and analytics failures are isolated. Real hydration, browser console, layout, pointer and keyboard tests could not run because browser discovery returned **“No browser is available.”**

## Backend

The application proxies CRM writes and writes contact documents into Sanity. External fetches in the new lead path have no automatic retries. The incoming body is byte-limited while streaming. CAPTCHA/CRM have 10/15-second deadlines; client submission has a 30-second deadline. No SQL/command/file-upload injection surface was found in the API inventory. Sanity query values use query parameters for slugs. Remaining guarantees depend on H4 and dataset/proxy configuration.

## Forms

| Implementation | Current path / reachability | Result |
|---|---|---|
| `components/Contactform.jsx` | Header, CTA and timed popup, including all investor routes | Migrated and hardened; modal sizing/focus/IDs improved. |
| `components/CommonForm.jsx` | Shared landing/project forms | Migrated; real form semantics restored. |
| `components/HomePageForm.jsx` | Home | Migrated; token is now sent to the server. |
| `homecomponents/HeroLeadForm.jsx` | Home hero | Migrated; per-widget verification/reset. |
| `contact/ContactPageClient.jsx` | `/contact` | Migrated; optional rich contact fields preserved; one lead conversion event added via helper. |
| `about-dholera-sir/LeadForm.jsx` | Article/section imports | Migrated; undefined analytics variable removed. |
| `dholera-sir-updates/LeadForm.jsx` | Updates article | Migrated; undefined analytics variable removed. |
| `components/BrochureDownload.jsx` | Project pages and investor document CTAs | Migrated; source/tags preserved; missing blog asset remains M5. |
| `components/PopUpScroll.jsx` | Project pages | Migrated; modal conflict and scroll-threshold handling improved. |
| `components/SlugPageForm.jsx` | Blog detail popup | Migrated; modal conflict and API error handling improved. |
| `components/Pop.jsx` | No active import path found | Also migrated to avoid retaining a browser credential if reused. |
| `components/form.jsx`, `pages/Contact.js` | No active import path found | Legacy fake-success forms; do not enable without repair. |
| `components/costSheet.jsx` | No active import path found | Local PDF utility, not a persisted CRM/email form. |

Investor route coverage: **bahrain, dubai, hong-kong, kuwait, oman, qatar, saudi-arabia, singapore**. Inspected their route components, shared/imported lead widgets, ordinary WhatsApp/phone anchors and mobile bars. The timed controller covers every `/investor/*` path and only the six specified non-investor routes. Active Dubai/Qatar/Kuwait brochure call sites provide their document URLs; commented-out bars were not counted as live mobile obstructions.

## Performance

Fixed repeated `/api/country` requests on phone-value changes in both phone-input implementations and consolidated reCAPTCHA loading. The timed controller uses a dynamic import, but the header still imports ContactForm, so no full-bundle saving is claimed. Shared CMS queries frequently use `cache:'no-store'`; repeated article/metadata queries and eager header/form dependencies merit profiling. No Lighthouse/Core Web Vitals or load-test result was obtained. No speculative rendering rewrite was made.

## SEO

M6 records confirmed route/indexing issues. The static AST route/asset inventory has **zero unmatched literal internal links after fixes**; it does not prove that every CMS slug, template URL, external link or runtime redirect works. Investor noindex is a business decision requiring confirmation. Missing article 404 handling, category aliases, X/Twitter metadata naming, and robots consistency remain follow-up work.

## Accessibility

Added accessible names for lead-name/phone inputs, error alerts where missing, native shared-form semantics, dialog markers, and contact/brochure focus handling. Compact CAPTCHA and scrollable dialogs address the obvious small-screen width/height risks. Other reusable forms still have repeated literal IDs in some compositions; full focus trapping across cross-origin CAPTCHA frames and background inertness are not certified.

## Configuration

Use `.env.example` as a **name-only template**, not as a replacement for real configuration. Required deployment follow-up: rotated `TELECRM_API_KEY`, valid server CAPTCHA secret/site-key pairing, exact `RECAPTCHA_ALLOWED_HOSTNAMES`, least-privilege `SANITY_API_WRITE_TOKEN`, and a correctly configured trusted proxy/shared limiter. Existing real `.env.local` values were not changed. CAPTCHA hostname restrictions and trusted-IP configuration were absent from the inspected local variable names; production values were not accessed.

## Dependencies

Raw npm result: `audit/dependencies.json`. Direct affected packages reported include Next.js, jsPDF, next-sanity, Sanity, @sanity/vision, sanity-plugin-mux-input, styled-components, postcss and eslint. The audit includes dev dependencies and does not establish reachability. No `npm audit fix`, major upgrade, or lockfile change was performed.

## Testing / Verification

The original project had no test script or test suite. Added `tests/lead-audit.test.cjs` using Node's test runner and the already-installed Babel tooling for module loading. All outbound fetches and Sanity writes are replaced by test doubles. Tests cover rejected input, oversized/malformed requests, origin rejection, rich-field preservation, empty upstream success responses, concurrency, CAPTCHA failures, error sanitization, ambiguous retries, contact deduplication, rate limits, storage/analytics exceptions and widget ID zero/null cleanup.

**Still required on an authorized staging build:** desktop and mobile submission with real test credentials; Google widget render/retry/expiry; two simultaneous forms; double-click/Enter; API 400/409/429/502/504 states; close/navigate during a pending request; timed entry/exit across investor routes; existing-dialog suppression; WhatsApp drag versus tap; phone clicks; explicit brochure download; keyboard/screen reader use; GTM Preview/GA4 DebugView. Check widths **320, 375, 430, 768, 1024, 1280, 1440 and 1920**, short landscape heights and an open mobile keyboard. These are pending tests, not claimed passes.

## Changes Made

- All 11 CRM implementation files listed in Forms: server submission, token forwarding, locks, CAPTCHA ownership, safe storage, error feedback, callback/timer handling and accessible text. Existing visual layouts and CRM field/source/tag distinctions were preserved apart from stated usability fixes.
- `src/lib/lead-client.js`, `src/lib/form-security.js`: shared browser and server safeguards.
- `src/app/api/{lead,contact,country}/route.js`: protected writes and country input validation.
- `src/app/components/{TimedContactForm,LeadClickTracking,InternationalPhoneInput,HomePageFormInput,header,whatsapp}.jsx` and `src/app/components/useLeadDialog.js`: timing, tracking, dialog behavior, phone lookup and floating UI fixes.
- `src/app/investor/dubai/page.jsx`: safe-area bottom-bar padding.
- `src/app/layout.js`: shared CTA tracker and stable analytics script IDs.
- Three CMS schema markup files: safe JSON script escaping.
- `about-dholera-sir/[slug]/page.js`, `dholera-sir-updates/[slug]/page.js`: corrected fallback link targets only.
- `src/app/robots.js`, `src/app/sitemap.js`, `next.config.mjs`: resource crawling, invalid sitemap URL and redirect ordering fixes.
- `eslint.config.mjs`, `package.json`: working flat lint configuration/command; no rules disabled.
- `.env.example`, its `.gitignore` exception, `tests/lead-audit.test.cjs`, `scripts/audit-inventory.cjs`, and this `audit/` directory: configuration template, local tests, repeatable source inventory and evidence. Real environment files remain ignored.

## Verification

| Executed check | Result |
|---|---|
| `node --test tests/lead-audit.test.cjs` | **11 passed**, 0 failed after correcting the null-widget cleanup caught by the first run. |
| Focused `npx.cmd eslint` on new helpers, lead/contact APIs, Contactform, timed controller, CTA tracker and dialog hook | **Passed**, 0 errors, one existing Contactform hook-dependency warning. |
| `npm.cmd run lint -- --format json --output-file audit-lint.json` | **Failed:** 239 errors, 30 warnings; results retained in `audit/lint.json`. |
| ESLint comparison of changed source with Git HEAD | No increases in error counts per rule across 28 compared source files; `audit/lint-comparison.json`. |
| `npm.cmd run build` | Sandbox attempt hit font network restrictions; unrestricted retry compiled successfully, then **failed at lint**. Final build log retained. No lint/type checks bypassed. |
| `npm.cmd audit --json` | Initial network-restricted attempt failed; permitted retry completed with exit 1 and **73 advisories**. |
| `node scripts/audit-inventory.cjs` | Passed; 174 files parsed/inventoried, 33 page routes, 5 APIs, zero unmatched static literal internal links after fixes. |
| `git diff --check` | Passed. |
| `21st review src/app/components --json` | Unavailable: `21st` CLI not installed. UI/UX local guidance search ran; manual source inspection used. |
| Browser discovery / local browser selection | Blocked: no browser available. No desktop/mobile visual or end-to-end success claim. |

## Remaining Risks

Previously exposed credential still requires rotation/redeployment; vulnerable dependencies remain; CRM quotas/reservations are not distributed; Sanity dataset privacy and token scopes are unverified; CMS raw HTML remains unsanitized; the complete production build still fails lint; one brochure CTA lacks its asset; browser/mobile/real-CAPTCHA checks and GTM/GA4 configuration remain unverified; article status/canonical/indexing issues remain.

## Top 10 Actions

1. Rotate the exposed CRM credential, configure the server-only replacement, remove the public variable, and redeploy/purge old assets.
2. Upgrade Next.js to a currently patched supported 15.x release and triage the remaining dependency advisories with regression checks.
3. Deploy shared/edge abuse limits and durable CRM idempotency/outcome handling.
4. Verify CAPTCHA key/secret pairing, production/staging hostnames and failure recovery using non-production test leads.
5. Confirm Sanity contact-record privacy and least-privilege write-token access.
6. Sanitize CMS HTML with an agreed table allowlist and review publication permissions.
7. Resolve the existing lint/build failures and align framework/lint package versions.
8. Run desktop/mobile/keyboard staging QA and supply the missing brochure URL with explicit download fallback.
9. Verify one conversion per action in GTM Preview/GA4 DebugView and map `phone_click` appropriately.
10. Repair article 404/category/canonical/noIndex handling and confirm the intended investor indexing policy.
