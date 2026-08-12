---
description: Build a business-value deck for a partner manager, with BVA scenarios and a co-sell motion
---

Launch the `partner-value-builder` skill now and run it from the beginning.

If the user supplied text after the command, treat it as the brief: parse it for the partner name, the goal,
their team size, their clients, a named prospect, day rates, and the language, then ask only what is left open.

If the user supplied nothing, go straight to the four discovery questions. Keep them business-language only:
this is a partner manager, not a solutions architect, so no adapter, materialization, or connector-category
questions reach them.

Every number comes from the Partner BVA model, run through `scripts/bva-run.mjs` or read from the app at
`https://hicham-bab.github.io/partner-bva/`. Never compute, interpolate, or round a value figure yourself, and
never present a midpoint of a range.

Do not skip the scenario approval gate, and do not build slides before the scenarios and their assumptions are
approved. Run the verification gate before calling the deck ready.
