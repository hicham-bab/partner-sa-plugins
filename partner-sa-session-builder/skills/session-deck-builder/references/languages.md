# Building decks in other languages

Supported output languages: **English (default), French, Spanish, Italian, German, Japanese.**

Ask early; language affects word budgets, layout, and which certification claims are true. It is not a
post-processing step, and translating a finished English deck produces worse results than writing it in the
target language from the start.

## What never gets translated

| Category | Examples | Rule |
|---|---|---|
| Product names | dbt, dbt platform, dbt Mesh, dbt Catalog, dbt Wizard, dbt State, dbt Fusion, dbt Summit, Fivetran | Keep in English, keep dbt Labs casing |
| Code and identifiers | `dbt_project.yml`, `ref()`, `dbt build`, `lag_tolerance`, `incremental_strategy`, `dbt-snowflake` | Never translate, never localise |
| Config keys and YAML | `materialized`, `unique_key`, `access: public` | Never translate |
| Official exam names | dbt Analytics Engineering Certification Exam, dbt Architect Certification Exam | Keep the official English name; a translated gloss may follow in parentheses |
| Platform product names | Snowflake, Databricks, BigQuery, Microsoft Fabric, Unity Catalog, BigLake | Keep as the vendor writes them |

**The lowercase-dbt rule survives translation.** dbt stays lowercase in every language, including at the start
of a sentence, and including in German where nouns are otherwise capitalised. Never *DBT*, never *Dbt*.

Job titles and team names stay lowercase in English; in other languages follow that language's normal
conventions for common nouns, *analytics engineer*, *ingénieur analytics*, *Data Engineer* in German follows
German noun capitalisation because it's a German noun, not a brand.

## Certification language availability: verify, don't assume

This has changed and is genuinely nuanced. Older study guides still say "Only English at this time"; that is
**out of date**. What internal sources showed as of early 2026:

| Language | Analytics Engineering exam | Architect exam |
|---|---|---|
| English | Yes | Yes |
| Japanese | **Yes**, localised, announced late 2025 | Reported as part of a fully localised Japanese programme, verify |
| French | Not yet, as of Feb 2026 | **Yes** |
| Spanish, Italian, German | No evidence, assume English only | No evidence, assume English only |

**Always re-verify before a session promises anything.** Ask partner support or check the certification pages;
this is exactly the kind of detail that moves. Getting it wrong in either direction is costly; telling a
French cohort the AE exam is available in French when it isn't wastes their preparation, and telling a Japanese
cohort it's English-only understates what dbt Labs has built for them.

For the certification slide in a non-English session, state the exam language explicitly. If the exam is
English-only for that audience, say so plainly and early; it changes how people prepare, and it's better
heard in the session than discovered at the exam.

## Source material: search the target language first

**Follow the target-language sourcing procedure in `research-protocol.md` before writing anything.** Existing
approved material in the language beats anything you translate, so look for it first, per block, and only
translate the genuine gaps. Report the split in the handover: reused, localised, translated.

- **Don't assume internal content is English-only.** EMEA SAs have built French, German, and Spanish
  enablement material. Search the internal connector, Drive, and Slides using the language's own vocabulary,
  not English keywords, then run the English query as well and compare.
- **dbt docs are English.** Cite the English URLs; that's the canonical source and what the audience will use
  day to day. Worth saying out loud in the session so nobody expects localised docs.
- **Fivetran has localised pricing pages** for German, French, and Spanish (`fivetran.com/de|fr|es/pricing`).
  Prefer the local version when it exists, and verify the figures match the English page.
- Where only English internal content exists, translate the *substance*; never translate a customer quote or a
  case study without flagging that it's a translation.
- **Reuse diagrams across languages.** An approved architecture diagram in an English deck needs its labels
  translated, not the diagram redrawn.

## Layout and typography per language

Word budgets in `slide-library.md` are calibrated for English. Adjust, then **check the rendered slide
visually**; these are heuristics, not guarantees.

| Language | Budget adjustment | Typographic notes |
|---|---|---|
| French | ×0.85 | Narrow non-breaking space before `; : ! ?`. Guillemets « » for quotes. Watch elision. |
| Spanish | ×0.85 | Opening ¿ and ¡ required. Longer compound phrasing than English. |
| Italian | ×0.85 | Similar expansion to French; no space before punctuation. |
| German | **×0.7** | Expands most, often 30% longer. Compound nouns break layouts badly; prefer shorter synonyms over hyphenation on slides. Formal *Sie* unless the partner is clearly informal. |
| Japanese | Count characters, ≈2× the English word budget | No inter-word spaces; line breaking differs. Avoid breaking product names across lines. Confirm the template's font renders Japanese, check a real slide before building the full deck. |

German is where decks break. If a heading overflows, rewrite it shorter rather than shrinking the font; the
template's type scale is part of the brand.

## Speaker notes can be a different language from the slides

Ask, because both combinations are common:

- **Slides local, notes local**: a native-speaker presenter delivering in-language
- **Slides local, notes English**: the audience reads their language; an English-speaking SA presents from
  English notes, often with a local co-presenter
- **Slides English, notes local**: rarer, but happens when the partner wants reusable English assets and a
  local delivery

Default to matching, and ask when the session involves a co-presenter.

## Quality expectations: be straight about this

Output quality in these five languages is good, and for internal enablement material it's generally
presentation-ready. For a high-stakes session (a new marquee partner, an executive audience, anything that
will be reused as a standing asset), **have a native speaker review before presenting.** Technical register in
particular drifts: the natural phrasing for "incremental model" or "deferral" in French or Japanese is a
choice, and a native reviewer will make it sound like it was written by a practitioner rather than translated.

Say this to the user when generating a non-English deck. It's not hedging; it's the difference between a deck
that reads as local and one that reads as translated.

## Slide shapes

Nothing structural changes: the five-act arc, the certification block, and the platform content all work the
same. What changes is word budget, punctuation, and any claim about language availability.

One addition worth making in non-English sessions: a short slide naming **which resources exist in their
language** (the exam, if applicable), and which don't. Partners plan around it.
