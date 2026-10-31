# Investor performance deployment fix

The live server serves large CSS/JS files without compression. A JSX redeploy alone does not fix this because Nginx serves /_next/static directly. The prepared configuration is inactive and must be merged by the server administrator.

The application fix in src/app/components/header.jsx disables header Link prefetching only on investor routes and gives the logo normal priority while keeping it eager. It also names the existing icon-only menu controls. Page content, design, hero images, metadata, schema, tracking and forms stay unchanged.

On 31 October 2026 the live mobile baseline was FCP 2.64–2.80 s, LCP 5.00–6.55 s, performance 71–73. A controlled compression-only model improved Bahrain/Dubai FCP from 1.96 s to 1.35 s and LCP from 5.49–5.65 s to 2.86–2.95 s. These are model results, not post-deployment scores.

Final local standalone results:

| Country | Mobile FCP | Mobile LCP | Mobile performance | Desktop performance |
| --- | ---: | ---: | ---: | ---: |
| bahrain | 1.37 s | 2.81 s | 94 | 100 |
| dubai | 1.36 s | 2.88 s | 94 | 100 |
| oman | 1.36 s | 2.81 s | 94 | 100 |
| kuwait | 1.36 s | 2.88 s | 93 | 100 |
| singapore | 1.36 s | 2.80 s | 94 | 100 |
| qatar | 1.36 s | 2.88 s | 94 | 100 |
| hong-kong | 1.36 s | 2.82 s | 94 | 100 |
| saudi-arabia | 1.36 s | 2.88 s | 93 | 100 |

Mobile LCP still exceeds the requested 1.8–2.0 s target. A mobile score of 100 has not been achieved or guaranteed. Analytics remains automatic on every visit. Best Practices had existing third-party findings before and after this change.

Server handoff:

1. Inspect the active configuration with sudo nginx -T and back up the actual site file before editing. Its path was unavailable during this task.
2. Merge ops/nginx/investor-delivery.conf.example into the existing HTTPS server block. Update existing gzip directives rather than defining them twice. Check that static locations do not override gzip with off. Keep current cache, TLS, routing and proxy settings.
3. The live audits negotiated HTTP/1.1. If HTTP/2 is enabled by the installed Nginx build, update the existing listener using the version-specific comment in the example. Preserve its current addresses and flags; do not add a second listener.
4. Run sudo nginx -t. Reload with sudo systemctl reload nginx only after validation succeeds. If validation fails, restore the backup and validate again before reloading.
5. Deploy the application through the existing workflow. That workflow archives .next/standalone and package.json, so ops/docs/scripts are handoff tools, not automatically active server configuration.
6. From a checkout of this repository, run the read-only check below. It discovers current asset hashes and checks all eight country pages, hero preloads, static asset compression and caching. It fails on the current live deployment and passes on the tested compressed model.

```sh
node scripts/check-investor-delivery.mjs https://www.dholerainsider.com
```

7. Rerun PageSpeed/Lighthouse for mobile and desktop on all eight URLs after the check passes. Passing the delivery check does not certify a 100 performance score. Check FCP, LCP, TBT, CLS, Speed Index and automatic page-view tracking on the actual deployed build.

The deployment workflow was not changed. The read-only check can be added as a post-deploy CI step once the server compression policy is fixed.

References: [Nginx gzip configuration](https://nginx.org/en/docs/http/ngx_http_gzip_module.html), [Nginx compression guide](https://docs.nginx.com/nginx/admin-guide/web-server/compression/).
