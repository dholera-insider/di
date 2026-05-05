You are working on a NextJs 15 App Router project.

Project stack:
NextJs 15
JSX
TailwindCSS
styled JSX
global CSS
Sanity CMS
Portable Text
SEO focused real estate website

Main rules:
1. Never rewrite a full component without asking first.
2. Before editing, explain the exact files you want to change.
3. Preserve all existing Tailwind utility classes unless there is a clear reason.
4. Do not remove or rename existing className values.
5. Do not change global CSS, layout.jsx, config files, or Sanity schema unless directly asked.
6. Do not create dynamic Tailwind class strings.
7. Keep responsive design intact.
8. Keep mobile first layout.
9. Preserve SEO tags, schema files, and Sanity data mapping.
10. After editing, run a build check and explain what changed.

Before code changes:
1. Inspect the related component.
2. Inspect global CSS if styling may be affected.
3. Inspect the parent page file.
4. Ask whether this should be a small edit or full rewrite.

Definition of done:
1. Page should keep the same styling system.
2. Tailwind classes should compile.
3. Styled JSX should not override Tailwind by mistake.
4. Mobile view should remain clean.
5. No build errors.
6. No unused imports.
7. No broken Sanity portable text rendering.

You are working on a NextJs 15 App Router project using JSX, TailwindCSS, styled JSX, global CSS, Sanity CMS, and Portable Text.

Main behavior:
1. Act as both senior reviewer and code writer.
2. Review first, edit only after approval.
3. Never rewrite a full file without asking first.
4. Before editing, mention exact files you want to change.
5. Keep changes small unless a full rewrite is approved.
6. After editing, show a clear diff summary.
7. Do not touch unrelated files.

Styling rules:
1. Preserve existing Tailwind classes.
2. Keep Tailwind class names static.
3. Do not create class names using variables.
4. Do not remove wrapper structure without approval.
5. Do not add broad styled JSX rules for section, div, h1, p, or button.
6. Keep styled JSX scoped to unique class names.
7. Do not edit globals.css unless approved.
8. Do not edit layout.jsx unless approved.
9. Always check mobile layout.

NextJs rules:
1. Respect App Router structure.
2. Do not add use client unless hooks, browser APIs, or event handlers need it.
3. Preserve metadata logic.
4. Preserve schema markup.
5. Preserve performance and image optimization.
6. Run lint or build check after edits when possible.

Sanity rules:
1. Do not rename schema fields without approval.
2. Do not change slug logic without approval.
3. Do not change Portable Text rendering without checking existing content.
4. Preserve GROQ query fields.
5. Mention data impact before schema changes.
6. If a schema field must change, explain migration risk.

Slug page rules:
1. Preserve dynamic route behavior.
2. Preserve generateMetadata if present.
3. Preserve generateStaticParams if present.
4. Do not break Sanity slug mapping.
5. Do not change canonical URL logic unless approved.
6. Keep SEO headings clean.

Form and API safety rules:
1. Never print environment variable values.
2. Never open or display .env.local unless explicitly approved.
3. Never paste API keys into code.
4. Never move private keys into client components.
5. Never use NEXT_PUBLIC for private secrets.
6. Do not log form submissions with phone numbers or emails.
7. Do not expose CRM, email, Sanity write, or webhook secrets in browser code.

Before editing any file, ask:
1. Should this be a small edit or full rewrite?
2. Which files are approved for changes?
3. Should I only review first?