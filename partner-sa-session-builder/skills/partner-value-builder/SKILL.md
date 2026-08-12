---
name: partner-value-builder
description: >
  Build a business-value deck for a partner manager to run a sales enablement session with a partner,
  showing what the partner earns in services revenue and what their client gets back in budget and capacity.
  Runs the Partner BVA model for several scenarios, sized to the partner's practice and their typical clients
  or a named prospect, and turns the ranges into a branded deck with a co-sell motion and next steps.
  Use when a partner manager wants a business case, a value deck, a sales enablement session, a partner
  recruitment pitch, a practice growth conversation, or numbers for a specific prospect; or when they say
  things like "build me a business case for this partner", "what would this be worth to them",
  "sales enablement for my partner", "run the BVA", or "/partner-value".
  Produces decks in English, French, Spanish, Italian, German, or Japanese.
---

# Partner value builder

For partner managers, not solutions architects. The audience is commercial, the argument is business value,
and the numbers come from the Partner BVA model rather than from you.

**What it answers, in the partner's own terms:** what putting the dbt platform and Fivetran in front of a client
is worth as services revenue, what the client gets back, whether the partner's team can actually deliver it, and
what to do next.

## Hard rules

1. **Never compute a value number yourself.** Every figure comes from the Partner BVA model, run through
   `scripts/bva-run.mjs` or read from the app. Mental arithmetic, interpolation between scenarios, and
   "roughly" are all forbidden. A wrong number in front of a partner is worse than no number.
2. **Ranges stay ranges.** Never present a midpoint as the number, never average the low and high, and never
   drop the low end because the high one sells better.
3. **Not a quote, not a forecast.** The app says so and every deck must too, on the slide that carries figures,
   not only in an appendix.
4. **Never leave the default rate card in place for a European partner.** The app defaults to 2,200, 1,800, and
   1,400 a day, which is a premium rate card and overstates continental European services revenue by roughly two
   to three times. Ask for the partner's real rates; failing that apply a sourced regional band from
   `references/regions.md`, run its low and high, and say on the slide which you used.
5. **Defaults are assumptions, and get labelled.** The model's own comments are explicit that its inputs are
   starting points. Four partnership levers, the reinvest share, the Wizard share, and the software margin all
   default to zero or to the partner's own estimate because no sourced benchmark exists. Never fill one in
   silently, and never present one as a benchmark.
6. **No customer names, logos, or case studies** unless resolved from internal content. Same rule as
   `../session-deck-builder/references/research-protocol.md`.
7. **Say what the partner has to believe.** Every scenario rests on inputs somebody guessed. List them on the
   slide, so the partner can argue with the assumption instead of distrusting the number.
8. **Stop at the scenario gate.** Show the scenarios and their inputs, and get them approved before building
   any slides.
9. **Run the verification gate.** `../session-deck-builder/references/verification.md` applies to this deck too.

## Workflow

### Stage 1: Discovery, kept short

This audience is not technical and did not ask for a questionnaire. **Four questions, one call, business
language only.** No adapters, no materializations, no connector categories.

```
1. header "Goal"        multiSelect: false
   "What is this session for?"
   - Grow an existing partner practice   (recommended)
   - Recruit a new partner
   - Build the case for one named prospect
   - Re-engage a partner who has gone quiet

2. header "Their team"  multiSelect: false
   "How big is the partner's delivery team?"
   - 1 to 3 people
   - 4 to 10
   - 11 to 30
   - More than 30

3. header "Clients"     multiSelect: false
   "What do their clients usually look like?"
   - Mid-market, a handful of data people   (recommended)
   - Small, one or two data people
   - Large enterprise, a real data platform team
   - A mix, so show the spread

4. header "Language"    multiSelect: false
   "What language should the deck be in?"
   - English   (recommended)
   - French
   - German
   - Spanish
```

Four questions and four options, per the tool's limits. Italian, Japanese, and anything else arrive through the
automatic "Other". Currency follows the language unless they say otherwise, and Japanese opens in yen because
the model does.

**Then ask once, in prose, not as a question card:** "do you have this partner's day rates for an architect, a
senior engineer, and an engineer? And any real figures for their team or a prospect's estate?" Their rate card is
the most consequential input in the model, and a partner manager usually knows it or can get it in a message.
Accept a paste of anything they have.

**Work out the region** from the deck language, the partner's location, or the brief, and confirm it in the
closing echo rather than spending a question on it. Ask only when the language is English, since UK, US, Nordics,
and Benelux differ more than any other pair. See `references/regions.md`.

### Stage 2: Build the scenarios

Read `references/bva-inputs.md` and map the answers to model inputs. Default to **three scenarios** so the
partner sees a spread rather than a single number they will distrust: their small client, their typical client,
their large client. For a named prospect, run that prospect plus one smaller and one larger.

Run them:

```bash
# With the partner's own rate card, which always wins:
node scripts/bva-run.mjs --scenarios scenarios.json --lang de \
  --account "Partner or prospect name" --prepared-by "Your name, dbt Labs"

# Without it, apply a sourced regional band and run both ends:
node scripts/bva-run.mjs --scenarios scenarios.json --lang de --region dach --rate-band low
node scripts/bva-run.mjs --scenarios scenarios.json --lang de --region dach --rate-band high
```

`--list-regions` prints the bands and their sources. A partner's own figure always beats a benchmark, and an
explicit scenario input always overrides the regional preset.

The script fetches the published app and calls the app's own model, so it cannot drift from what the partner
sees in the browser. Output is JSON per scenario: partner revenue by year and over three years, practice
revenue per year both nominal and capacity-feasible, client value, the capacity check with the role that runs
out first, the workstream breakdown, and a share link that reopens that exact scenario.

**If a shell isn't available**, which is common in the desktop app, do not guess the numbers. Instead print the
input table per scenario, ask the partner manager to enter them at
`https://hicham-bab.github.io/partner-bva/` and paste back the result or the tool's own copied brief. Say plainly
that this is what you are doing and why.

**Sanity-check before anything reaches a slide.** The model warns about one thing specifically: the dbt State
target-table estimate comes from a regression, and at 500 models and 6 runs a day it implies roughly 7,700
daily active target tables. If a client's real count is known and differs, use theirs. Also confirm the
currency, since the dbt State unit price is the one figure published in dollars and converted.

### Stage 3: Scenario gate

Show a table of the scenarios, their inputs, and their headline ranges, and **wait for approval**. Name every
assumption you supplied. This is the cheapest place to correct a wrong day rate, and the most expensive place
to skip.

### Stage 4: Build the deck

Read `references/business-narrative.md` for the arc, then build with the shared machinery:
`../session-deck-builder/references/slide-library.md` for layouts and the template ID,
`layout-and-fit.md` for budgets, `brand-voice.md` for naming, `languages.md` for non-English decks,
`slide-selection.md` to reuse existing business slides rather than writing new ones, and `verticals.md` when the
partner's clients sit in one industry.

Charts: the numbers are ranges, so use a table or a simple two-bar comparison rather than a false-precision
chart. There is no table layout in the template, so follow the table procedure in `slide-library.md`.

### Stage 5: Verification and handover

Run `../session-deck-builder/references/verification.md` in full, two passes, and report the table. Then hand
over:

- The deck link
- One share link per scenario, so the partner manager can reopen or forward any scenario live
- The assumption list, restated
- The five slides worth a human glance

## What this deliberately does not do

- **No technical depth.** If the conversation turns to adapters, incremental strategies, or a live product demo,
  hand off to the `session-deck-builder` skill instead of half-answering.
- **No commitments.** Discounts, co-marketing funds, tier promises, and pricing negotiations are not yours to
  put on a slide. Nor is a partner's own margin target.
- **No pipeline claims.** The model produces what work is worth if it happens, which is not a forecast that it
  will.

## References

- `references/bva-inputs.md`: the model's inputs in business language, and how practice and client size map onto them
- `references/regions.md`: regional day-rate bands with sources, why the app defaults overstate Europe, and the gaps
- `references/business-narrative.md`: the six-part arc for a commercial audience, and the slide blocks
- `../session-deck-builder/references/`: template, layouts, fit, brand voice, languages, verticals, verification
