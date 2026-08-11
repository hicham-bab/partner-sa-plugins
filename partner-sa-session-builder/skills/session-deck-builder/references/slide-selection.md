# Slide selection: pick the best existing slide before writing a new one

**This is the primary job of the build, not an optimisation.** For every block in the outline, the question is
"what is the best slide that already exists for this?" and only then "what do I need to write?". A deck
assembled from the strongest existing material, rebuilt on the current template and unified by one narrative,
beats anything generated from scratch. It is also how the content stays consistent across SAs.

Read this at Stage 2, use it to annotate the Stage 3 outline, and execute it at Stage 4.

---

## Step 1: Build the candidate corpus

Do this once per deck, before scoring anything.

| Source | How |
|---|---|
| Curated registry | `references/deck-corpus.local.md`, if it exists. Read it first. It's a maintained list of known-good decks with presentation IDs, so lookup beats search. |
| User-supplied decks | Anything the user attached or linked in the brief. Highest priority, and never skip these. |
| Google Slides search | `search` with three or four keywords: the topic plus a platform, for example "architecture Fivetran dbt Databricks". Full text, AND logic. |
| Recent first | Add `modifiedAfter` for the last 12 months, then widen if the result set is thin. |
| Internal connector | Enablement decks, messaging frameworks, and one-pagers on the same subject. |
| Drive | `search_files` for decks and exported diagram images the Slides search missed. |

Then, for each candidate deck, `fetch` it once to get the title and full text cheaply, and `list_slides` plus
`get_slide` only on the slides that look relevant. Do not `get_slide` an entire 60-slide deck to find two
slides.

**Record the corpus in the research brief**: deck title, presentation ID, date, language, and which blocks it
might serve. This is what makes the Stage 3 outline honest about provenance.

---

## Step 2: Score each candidate against the block

Score per block, not per deck. The same deck may win one block and lose another.

| Dimension | Points | What earns them |
|---|---|---|
| Currency | 0 to 3 | 3 = every fact still true today. 1 = minor drift, fixable from docs. **0 = disqualified**, see below. |
| Argument fit | 0 to 3 | 3 = makes exactly the claim this block needs. 1 = mentions the topic but argues something else. |
| Platform and audience match | 0 to 2 | 2 = the partner's primary platform vocabulary and the right audience depth. |
| Language | 0 to 2 | 2 = already in the target language. 1 = a language you can source from directly. 0 = needs translation. |
| Visual value | 0 to 2 | 2 = carries a diagram or visual you would otherwise hand-build. |
| Provenance | 0 to 2 | 2 = approved internal material, or a deck known to have been delivered. 0 = someone's working draft. |

Maximum 14.

**Currency is a gate, not a weight.** A slide stating a retired product name, "dbt Cloud" in platform or Fusion
content, a superseded price, or a passed end-of-life date scores 0 on currency and is disqualified as-is. You
may still reuse its structure or its diagram, but the stale fact gets re-resolved from docs first. Verify
against `brand-voice.md` and `lifecycle-and-migrations.md`, not from memory.

---

## Step 3: Decide what to do with the winner

| Score | Action |
|---|---|
| 10 to 14 | **Reuse.** Rebuild the slide on the mapped template layout, keeping its wording and its diagram. Trim to the character budgets in `layout-and-fit.md`. |
| 6 to 9 | **Reuse the parts, rewrite the text.** Usually the diagram or the structure is worth keeping and the prose isn't. |
| 0 to 5, or nothing found | **Write it new**, from the research brief. |

Reuse means rebuild on the template, never a screenshot of someone else's slide, and never a slide left on its
original off-template layout. `duplicate_slide` works only within one presentation, so there is no cross-deck
copy: read the source with `get_slide`, then rebuild. Images follow the embed-or-reserve procedure in
`slide-library.md`.

**Two slides may not be merged into one just because both scored well.** That is how a slide ends up over
budget. Pick one, or make it two slides.

---

## Step 4: Unify the narrative, or it reads as a patchwork

This is where assembled decks usually fail, and it is worth more attention than the selection itself.

- **Rewrite every reused slide's title** to state this deck's claim, in this deck's voice. Borrowed titles are
  the most visible seam.
- **Write a fresh bridge line for every reused slide.** The continuity gate in `storytelling.md` still applies:
  bridge lines must read end to end as one coherent paragraph, no matter how many decks the slides came from.
- **Normalise vocabulary to the partner's primary platform.** A reused Snowflake slide in a Databricks deck
  says "catalog.schema.table", not "database.schema".
- **Normalise the running example.** A reused slide with a different example either adopts this deck's example
  or doesn't get reused. Two running examples is worse than none.
- **Normalise tense, person, and capitalisation** to `brand-voice.md`. Reused slides commonly carry an older
  house style.

If unifying a reused slide takes more work than writing it fresh, write it fresh. Reuse is for leverage, not
for its own sake.

---

## Step 5: Report provenance

Every reused slide records in its speaker notes: source deck title, presentation ID, slide number, and the
score's one-line justification. The user needs to know what came from where before presenting it.

The Stage 3 outline gains a **Source** column with one of:

- `reuse: <deck> s<N>` for a rebuild of an existing slide
- `diagram: <deck> s<N>` for structure or diagram reuse with new text
- `reserve: <deck> s<N>` for a diagram you cannot embed and the user must paste
- `new` for written from scratch

Then report the tally in the handover: how many slides reused, how many part-reused, how many reserved, how
many new. **A deck that is 90% new when a good corpus exists means the search was too narrow, and it is worth
saying so rather than presenting it as a result.** Equally, a deck that is 90% reused has probably not been
unified enough, so check the bridge lines read as one paragraph.

---

## The corpus registry

`references/deck-corpus.local.md` is deliberately **not tracked in git**, because it holds internal
presentation IDs and this repository is public. Each person maintains their own. Format:

```markdown
| Deck | Presentation ID | Date | Language | Best for |
|---|---|---|---|---|
| Partner enablement, Databricks | 1abc… | 2026-06 | EN | architecture anchor, Mesh block |
| Atelier partenaire, Snowflake | 1def… | 2026-03 | FR | data journey, pricing |
```

If the file doesn't exist, say so once, fall back to search, and offer to build the registry from what the
search found. Do not treat its absence as a reason to skip selection.
