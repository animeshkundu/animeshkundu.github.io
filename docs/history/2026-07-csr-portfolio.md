# Retired: Client-rendered portfolio shell

In July 2026 the React Router SPA, imperative `SEOHead` effect, and viewport-gated presentation were retired as the production architecture.

The SPA required JavaScript for route content and per-route metadata. Its preview routing used hash URLs, and full-page captures could contain blank regions until intersection-based animations ran.

Astro static output now owns production routes. Existing React modules may remain temporarily as test compatibility fixtures, but they are not imported by the production build.
