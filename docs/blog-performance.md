# Blog performance verification

The blog listing now streams its hero before the CMS results. Its responsive, fingerprinted AVIF/WebP files bypass cold image optimization, and the AVIF preload matches the picture source. The original hero is 171,182 bytes; the 1500px AVIF is 50,178 bytes and the 768px AVIF is 19,165 bytes. Layout, headings, image alt text, metadata, CMS filtering, error handling and pagination are retained. A main landmark was added.

Header links on blog routes, blog cards and pagination no longer prefetch unrelated pages during initial loading. Tracking still loads automatically; forms and conversion logic were not changed. Card sizes now account for the tablet gutters, with image quality set to 70.

## Server change still required

The live response checked on 2 November 2026 served the 164,587-byte global stylesheet without Content-Encoding despite accepting gzip/Brotli. The same stylesheet compresses to 25,395 bytes with gzip. Versioned CSS already has a one-year immutable cache policy. The font and small animation stylesheets are also uncompressed.

Apply the existing [Nginx compression configuration](../ops/nginx/investor-delivery.conf.example) using the validation and reload steps in [the deployment handoff](investor-performance.md). It is a prepared example, not an active server change. Do not create duplicate gzip directives. The current live server configuration was not available in this workspace.

Deploy the application through the existing workflow, then run:

```sh
node scripts/check-blog-delivery.mjs https://www.dholerainsider.com
```

The check discovers the deployed asset hashes and verifies hero discovery, priority, preload matching, compression and immutable caching. It does not certify a performance score. Recheck page 2 and a blog article, mobile/desktop navigation, the contact modal and GTM page-view/conversion events.

## Validation limits

The repository's AGENT.md prohibits build/dev/lint commands. Focused source compilation, streamed server rendering, metadata/pagination checks, Tailwind compilation and image dimension checks can be run without those commands. A new production build and browser Lighthouse audits remain required after deployment; 100 performance has not been measured or guaranteed.

Do not remove Next.js compatibility code or defer tracking until interaction to hide audit findings. Browser targets affect supported users. GTM/Clarity cache policies are controlled by their providers; any duplicate tags inside the GTM container need a container audit. Existing first-party immutable caching should be retained.

References: [Chrome render-blocking guidance](https://developer.chrome.com/docs/performance/insights/render-blocking), [Nginx gzip module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html).
