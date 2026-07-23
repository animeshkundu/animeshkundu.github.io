# Specification: Evidence-led static portfolio

## Status

Implemented, July 2026. The product, quality gate, preview, and scoped Pages deployment workflows are checked in. Workflow changes require human review before merge.

## Product outcome

The site introduces Animesh Kundu through inspectable public work. It does not use professional self-labels, skill ratings, or resume-style claims. Founders, technical leaders, and people evaluating applied AI work should be able to move from a concrete result to its public source in one step.

Astro emits a complete HTML document for every owned route. Navigation, primary content, project evidence, essay destinations, repository records, and tool fallback links work without JavaScript.

## Information architecture

Owned canonical routes:

- `/`
- `/projects/`
- `/project/<slug>/`
- `/writing/`
- `/tools/`
- `/repositories/`
- `/contact/`
- `404.html`

The home narrative is ordered as:

1. Exact identity and public proof
2. Adoption and output ledger
3. Selected work
4. Model and agent systems
5. Writing
6. Browser tools
7. Public repository trajectory
8. Contact invitation

Dedicated project routes retain all public historical slugs:

`youtube-audio`, `fix`, `oops`, `torrent-dl`, `pyflix`, `mermaid-editor`, `pdf-viewer`, `gist-preview`, `har-viewer`, `saz-viewer`, `media-server`, `pyscrape`, `file-dl`, `yt-flask`, `funnel`, `flake`, `ml`, `msp_api`, `msp_scraper_lib`, `html5_game`, `condukt`, `github-router`, `ai-or-die`, `kusto-mcp`, `runnerize`, `sanger-viewer`, `media-tools`, `file-tools`, and `photo-tools`.

`collabedit` is retired and receives a static redirect stub to `/projects/`.

## Public evidence inventory

Evidence was checked against public sources on 2026-07-21 and is represented with an `asOf` value and source URL.

| Evidence | Public source | Use |
| --- | --- | --- |
| youtube-audio adoption, ratings, reviews | [Mozilla Add-ons API](https://addons.mozilla.org/api/v5/addons/addon/youtube-audio/) | Lead adoption proof |
| youtube-audio source and repository record | [GitHub](https://github.com/animeshkundu/youtube-audio) | Product detail |
| cmd-correct model and training notes | [Hugging Face](https://huggingface.co/animeshkundu/cmd-correct) | Model-building proof |
| fix CLI | [GitHub](https://github.com/animeshkundu/fix) | Model-to-product relationship |
| essays feed and canonical pages | [Essays RSS](https://animesh.kundus.in/essays/rss.xml) | Writing index |
| repositories | [GitHub API](https://api.github.com/users/animeshkundu/repos?per_page=100&sort=updated) | Durable repository snapshot |
| Pages-enabled surfaces | [GitHub repositories API](https://api.github.com/users/animeshkundu/repos?per_page=100) | Same-origin topology |
| public identity | [GitHub profile](https://github.com/animeshkundu) | Exact-name entity signal |

Microsoft and Seattle appear only as subordinate public identity context. They do not lead the narrative.

## Voice and copy rules

- Use short, natural sentences.
- Prefer evidence, source links, dates, commands, and artifacts over adjectives.
- Do not use em dash characters.
- Do not use self-label phrases prohibited by `scripts/check-copy.mjs`.
- Do not claim search rank, availability, intent, or private knowledge.
- Invite contact without implying a specific role or commitment.

## SEO and entity strategy

Each page emits a unique title and description, a production-absolute canonical, Open Graph and Twitter metadata, and page-appropriate JSON-LD in the initial HTML.

The home page uses `Person`, `WebSite`, and `ProfilePage`. The closed `sameAs` set covers GitHub, LinkedIn, Hugging Face, Mozilla Add-ons, and Facebook. Project schema follows the artifact:

- `SoftwareApplication` for runnable applications, tools, and extensions
- `SoftwareSourceCode` for libraries, CLIs, frameworks, and infrastructure
- `CreativeWork` for the cmd-correct model
- `BlogPosting` or `Article` plus `ItemList` for writing

Canonical, Open Graph, and sitemap URLs always use `https://animesh.kundus.in`, including preview builds. Search performance for the exact name and relevant long-tail terms is measured after launch. Generic name ranking is not guaranteed.

## Static and preview URL rules

`VITE_BASE_PATH` controls local links and assets only. Production uses `/`. A branch preview uses `/test-<branch>-<hash>/`, where the hash disambiguates branch names that normalize to the same readable slug. Base-safe route helpers add the preview prefix while canonical helpers never do.

Production, preview, and cleanup workflows update the shared `gh-pages` source branch and then explicitly request a GitHub Pages build. A workflow-authored branch commit does not itself start another workflow, so publication is part of the same deployment contract rather than an assumed side effect.

Preview validation serves the preview artifact at its configured base path and runs the browser contract against those prefixed routes before publishing. The screenshot command follows the same base-path rule so root and preview artifacts can be reviewed with identical route coverage.

## Durable data contract

Repository and same-origin surface inventories are committed dated snapshots. Optional browser refresh may add information, but it may not remove, replace, or blank published content.

Writing is ingested from the essays RSS feed by the snapshot script. A committed curated fallback is used when the feed is unavailable.

Changeable values carry:

```ts
interface Metric {
  value: string;
  asOf: string;
  sourceUrl: string;
}
```

## Same-origin surface topology

The root portfolio and project Pages repositories share the custom domain but deploy independently. The dated inventory contains 23 Pages-enabled repositories, including `/pyflix/` and `/torrent-dl/`.

Featured and referenced surfaces include:

- `/essays/`
- `/mermaid-editor/`, `/pdf-viewer/`, `/gist-preview/`, `/har-viewer/`, `/saz-viewer/`, `/sanger-viewer/`
- `/github-router/`, `/ai-or-die/`, `/kusto-mcp/`
- `/media-tools/`, `/file-tools/`, `/photo-tools/`
- `/fix/`, `/oops/`, `/runnerize/`, `/youtube-audio/`

Existing low-signal surfaces remain live but are not promoted. Separate repository deployments are not copied into this repository output.

## Tool embed and fallback contract

Every tool record defines `embedUrl`, `fallbackUrl`, `purpose`, `sandboxTokens`, `referrerPolicy`, and `privacyVerifiedSource`.

Each iframe has a unique title, lazy loading, its record-specific sandbox, and its record-specific referrer policy. A direct open link is always present in static HTML. No sandbox configuration is described as a security boundary when scripts and same-origin access are both required.

Privacy wording appears only when a public repository or published `ai.txt` verifies local processing or no upload behavior.

## Public-only exclusions

The UI and generated data exclude:

- forks
- empty or artifact repositories `collabedit`, `Misc-Scripts`, and `factory-selftest`
- personal gists for a pregnancy tracker and H1B calculator
- CBP quiz and interview gists
- private, internal-looking, or unverifiable work

Only `static_file_server.py`, `loggly.py`, `facebook_scrapper.py`, and `rotate_ip_address` may appear as public gist context.

## Design checkpoint

The July 2026 review examined the current site plus Rauno Freiberg, Paco Coursey, and Anthropic at desktop and mobile widths.

- Paco demonstrates compact, readable information density and plain-language links.
- Anthropic demonstrates confident editorial scale, ruled metadata, and cream/ink contrast.
- Rauno demonstrates that a personal site benefits from one authored visual idea rather than a generic card grid.
- The current site demonstrates the failure mode to avoid: viewport animation leaves long blank regions and no-JavaScript output becomes a fallback paragraph.

The shipped system does not imitate those sites. It uses a warm evidence ledger: a 12-column editorial grid, an offset proof rail, ruled records, terracotta source marks, teal technical accents, and a paper texture made with CSS gradients. Type is fluid with a serif display face and a clear sans-serif reading face. Motion is limited to small hover translations and theme transitions.

## Accessibility and resilience

- Semantic header, nav, main, sections, articles, and footer are present.
- A skip link is the first focusable element.
- Mobile navigation is a native `details` disclosure.
- Focus rings remain visible in both themes.
- Light and dark colors meet WCAG 2.1 AA contrast.
- `prefers-reduced-motion` removes non-essential transitions.
- Content is never initialized at zero opacity or gated by intersection observers.
- Tool embed failures do not affect surrounding content.

## Refresh policy

Run repository, surface, and essay snapshot scripts for each release. The committed `asOf` value makes freshness explicit until the owner adopts a schedule.

## Acceptance

Implementation is complete when root and preview builds emit full static HTML for all routes, production metadata remains absolute, preserved surfaces are referenced, excluded artifacts do not render, and a clean lockfile install can build the site.
