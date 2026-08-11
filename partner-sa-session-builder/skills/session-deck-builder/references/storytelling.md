# Storytelling — the narrative contract

The deck must read as one continuous argument, built from the ground up. Accuracy and branding are
necessary but not sufficient; a deck that is correct and still feels like a list of topics has failed.

## Always start from the basics

Open at first principles for every audience, regardless of seniority.

**Basics is not beginner content.** It means establishing the shared foundation before layering anything
on top. For an advanced room those opening slides move fast and act as framing. For a new room they are
taught. The arc never changes — only the pace and the depth.

Hold this rule even for expert audiences: people who know dbt deeply often can't say where ingestion ends,
and Fivetran experts often can't place the semantic layer. Skipping the foundation produces an audience
that follows every slide and still can't reconstruct the picture afterward.

## The five-act arc

Fixed. Recipes vary the contents of each act, never the order.

| Act | Purpose | Rule |
|---|---|---|
| 1. The world | Where data teams and their clients are today, and what hurts | No product names at all |
| 2. The journey of one piece of data | End to end and concrete, using the running example | Introduces the running example |
| 3. Where Fivetran fits | Ingestion as a solved problem, not a maintained one | First product act |
| 4. Where dbt fits | Transformation as the trust, logic, and governance layer | Balanced with act 3 |
| 5. The whole picture | Integrated view, then Fusion / dbt Mesh / dbt Catalog where relevant, then next steps | Answers "so what?" |

**Swap acts 3 and 4 when the audience is stronger on Fivetran** — start where they already stand, then move
into the gap. The dbt/Fivetran balance is even by default; neither product is a bolt-on to the other's
story.

## Entry point by fluency

From intake Q5.

| Stronger on | Open with |
|---|---|
| dbt | The transformation layer they already own, then how much hand-built extraction work disappears |
| Fivetran | Reliably landed data, then the trust-and-logic gap immediately after it |
| Both | The integrated picture; spend recovered time on governance, Fusion, dbt Mesh, dbt Catalog |
| Neither | The data journey end to end, conceptually, before any product name appears |

## One running example, carried the whole way

Assembled at intake from vertical + Fivetran source + platform. Present on every slide from act 2 onward.
One dataset, one business question, followed from API call to dashboard.

This does more for perceived quality than any amount of polish. A deck that follows Shopify orders from
ingestion through to revenue-by-channel *is* a story. The same deck with a different example per section is
a topic tour, however good the individual slides are.

Name the example explicitly on its introducing slide, and refer back to it by the same name every time.
Never introduce a second example unless the deck is explicitly comparing two paths.

## Bridge lines

Every slide's speaker notes open with one sentence connecting it to the slide before. Generated, not
optional.

**The check that makes this real: read only the bridge lines, in order. They must form a coherent
paragraph.** If they don't, the deck has a structural gap — fix the outline rather than polishing the
prose.

Bridge lines carry the argument forward; they don't recap. "Now that the orders are landed and typed, the
question becomes whether anyone can trust them" is a bridge. "In the last slide we discussed ingestion" is
not.

## Speaker notes structure

For each slide:

1. **Bridge line** — one sentence connecting from the previous slide
2. **Talk track** — 3–6 sentences of what to actually say
3. **Source** — the resolved link backing any claim on the slide

The source line exists so a colleague can deliver a deck they didn't build.

## Continuity gates

Enforced at Stage 5:

- No orphan slides — every slide traces to an act and has a bridge line
- No product name before act 3
- The running example appears in every act from 2 onward
- Acts 3 and 4 within ~20% of each other in slide count, unless intake said otherwise
- The final slide answers "so what?" in the audience's own terms
- Reading bridge lines alone produces a coherent paragraph
