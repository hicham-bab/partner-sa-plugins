# Research protocol

## Source hierarchy: follow in order

1. **User-supplied material**: attached transcript, notes, or a past deck. Highest value available; mine
   it before any search.
2. **Internal content**: internal search connector (Glean-style) for existing decks, enablement material,
   messaging frameworks, and Slack precedent. Notion for partner enablement plans and past assessments.
   Google Drive for past session decks. Salesforce for partner and account context.
3. **Official product docs**: dbt docs via the dbt MCP (`search_product_docs`, then
   `get_product_doc_pages`). Fivetran docs via web fetch on `fivetran.com/docs`.
4. **Nothing else.** No general web search for product behaviour, no memory, no inference from adjacent
   products.

**Internal before docs, always.** Internal framing is already approved and already familiar to the team;
reinventing it creates inconsistency across SAs. Docs fill the gaps and verify specifics.

Where internal messaging and your own framing differ, internal messaging wins. This includes the narrative
spines in the platform profiles; those are starting drafts, not approved positioning.

## Target-language sourcing, when the deck isn't in English

Run this as part of Stage 2, before writing anything. A deck in French assembled entirely from English
internal material and then written in French is a translation job wearing a research job's clothes. The
better material often already exists in the target language, and it is already approved.

**Order of preference for every block:**

1. **Approved internal content already in the target language.** Search the internal connector, Drive, and
   Slides in that language, not in English. Query with the language's own terms, since a French enablement
   deck is titled "socle de données", not "data foundation". Run the English query too, then compare.
2. **Official docs in that language, where they exist.** Check rather than assume; coverage differs by
   language and by page, and a stale localised page is worse than the current English one. If the localised
   page lags the English one on a fact, use the English fact and write it in the target language.
3. **English internal content, translated by you.** Only once 1 and 2 come up empty for that block.

**Record which of the three every block came from**, and report the tally in the handover: how many blocks
came from existing target-language material, how many from localised docs, how many you translated. That
number tells the user how much native review the deck actually needs, and it is the difference between
"reviewed this" and "glanced at it".

**Translating a gap:**

- Write it in the target language from the source facts. Do not draft English prose and convert it.
- Keep product names, code, config keys, CLI flags, and official exam names in English. See `languages.md`.
- Flag every translated block explicitly in the handover, since these are the ones a native speaker should
  read first.
- Where an internal English deck has an approved diagram, reuse the diagram and translate only its labels.
  Per `slide-library.md`, reuse still beats redrawing, in any language.

**When good material exists in a third language**, say a strong German deck for a Spanish session, use it as
a structural model rather than a text source, and note it. Translating German to Spanish through English
loses more than it gains.

## What must be resolved, never recalled

Resolve these from docs at run time, every time:

- Connector names and their exact spelling
- Supported materializations and incremental strategies per adapter
- Adapter behaviour flags
- Destination setup requirements and constraints
- Feature availability, release phase (beta / preview / GA), and platform support
- Certification requirements, exam structure, prices, and the dbt Core version an exam tracks
- Cross-platform Mesh supported combinations and their catalog prerequisites
- Plan tier requirements (Enterprise / Enterprise+) for any capability
- **Any pricing figure at all**: re-fetch `getdbt.com/pricing` and `fivetran.com/pricing` every time; never
  use third-party pricing aggregators, and never build a pricing slide from a previous deck. See `pricing.md`.
- **Whether anything in the deck is being retired**: check `lifecycle-and-migrations.md` and re-verify the
  dates. Building a session around an end-of-life version is the mistake a partner remembers.

### Connector-naming guardrail

Fivetran's catalogue has **no plain "SAP", "NetSuite", or "Workday" connector**. Real names include
`SAP ERP on HANA`, `SAP ECC on Oracle`, `NetSuite SuiteAnalytics`, `Workday HCM`. Fivetran's docs also never
label a category "CDC" or "log-based"; high-volume database connectors are named
`High-Volume Agent Oracle`, `High-Volume Agent SQL Server`.

Fivetran's own connector categories are: **Applications, Databases, Events, Files, Functions, Logs.**

A plausible-sounding wrong connector name is the error a Fivetran-strong audience catches instantly. Resolve
every name from `fivetran.com/docs/connectors` before it reaches a slide.

## Verification rules

- Every substantive claim carries a resolved source link, recorded in the slide's speaker notes
- A claim that can't be resolved does not go on a slide; say what's unresolved rather than softening it
  into vague phrasing
- Note release phase explicitly when a feature is beta or preview; presenting a preview feature as GA in
  front of a partner creates a commitment nobody agreed to
- Cross-check anything found in an internal deck older than ~12 months against current docs, since naming
  and positioning have moved

## Customer references

Named customers, logos, outcomes, and case studies come from internal sources **only**. Never construct a
plausible customer story, and never attach a real customer name to an invented outcome. If the vertical
calls for a reference and none is found internally, use an unnamed composite and label it as illustrative.

## Research brief output

Before the outline gate, produce:

| Key point | Act | Source | Confidence |
|---|---|---|---|

Confidence is `resolved` (doc or internal link), `internal-only`, or `unresolved`. Nothing marked
`unresolved` proceeds to a slide.
