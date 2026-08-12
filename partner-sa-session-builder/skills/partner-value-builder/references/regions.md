# Regional rate cards

The single most consequential input in the whole model is what the partner bills per day, and the app's default
rate card is a premium one. Getting this wrong by a factor of two makes every other number on the deck wrong by
a factor of two.

## The finding that makes this file necessary

The BVA app defaults to 2,200 for an architect, 1,800 for a senior engineer, and 1,400 for an engineer, in euro.
Those are plausible for a US partner or a European boutique at the top of the market. They are well above the
published market for continental Europe. Same client, same 250 jobs and 12 sources, three-year services revenue
per client:

| Rate card | Three-year revenue per client |
|---|---|
| App defaults, 2200 / 1800 / 1400 | 423k to 779k |
| Germany and Austria, top of band | 248k to 457k |
| Germany and Austria, floor of band | 190k to 350k |
| France, top of band | 200k to 368k |
| France, floor of band | 148k to 272k |

**Presenting the defaults to a French partner overstates their services revenue by roughly two to three times.**
That is not a rounding difference, it is the difference between a credible business case and one the partner's
practice lead dismisses in the first minute, because they know their own rate card better than we do.

## Always ask, then fall back to a region

1. **Ask for their rate card.** One question: "what do you bill a day for an architect, a senior engineer, and
   an engineer?" A partner manager usually knows, or can get it in a message. Their number beats every
   benchmark here, always, and no source in this file overrides a figure the partner gave you.
2. **If they don't have it to hand, apply the region**, and say on the slide that you did:

```bash
node scripts/bva-run.mjs --region france --rate-band low  --scenarios scenarios.json --lang fr
node scripts/bva-run.mjs --region france --rate-band high --scenarios scenarios.json --lang fr
```

Run both bands and present the span. That gives a defensible range built on published market data rather than
one number nobody can defend. `--rate-band` accepts `low` (the default), `mid`, or `high`.

3. **See the bands and their sources** with `node scripts/bva-run.mjs --list-regions`. The sources belong on the
   appendix slide, not just in the file.

## Which region

Infer it, then confirm it in the closing echo rather than spending a discovery question:

| Signal | Region key |
|---|---|
| Deck language French | `france` |
| Deck language German | `dach` |
| Deck language Spanish or Italian | `southern-europe` |
| Deck language Japanese | Not covered. Ask, and see the gaps below |
| Deck language English | **Ambiguous, so ask.** UK, US, Nordics, and Benelux differ by more than any other pair here |
| Partner delivers from Poland, Romania, or nearby | `cee`, often alongside a western band |
| North American partner with a nearshore arm | `us` plus `latam-nearshore` |

Region keys: `france`, `dach`, `benelux-nordics`, `southern-europe`, `cee`, `uk`, `us`, `latam-nearshore`.

**A partner who sells in one region and delivers in another needs two rate cards**, and the model takes one. Run
the selling region for revenue and note the delivery region as a margin comment rather than trying to blend
them into a single fictional rate.

## What these numbers are, and are not

Three different quantities get confused constantly, and mixing them up is how a business case falls apart:

| Quantity | Who pays it | Where it appears |
|---|---|---|
| **Bill rate** | The partner's client, per consultant-day | `archRate`, `senRate`, `engRate` |
| **Freelance or contractor rate** | The partner, to a contractor | Not a model input. It is the public data these presets are built from |
| **Loaded cost** | The client, per data engineer per year | `loadedCost`, which drives the capacity-released half |

The presets are built from published contractor and freelance day rates, because those are the only broadly
sourced public figures. **A consultancy's rate card normally sits above a freelance rate**, since it carries
overhead, delivery management, and margin. So these presets are a conservative floor and they bias partner
revenue downward. Say that on the slide. Understating a partner's own revenue is a recoverable error; overstating
it is not.

## Sources

Held with the data in `data/regional-rates.json`, dated, per region. In summary:

- **Germany and Austria**: freelancermap Freelancer-Kompass 2026, over 5,400 freelancers. Average freelance rate
  103 EUR an hour, IT median 95, data scientists and ML engineers 95 to 130. Employer contributions about 20 to
  21 percent and capped, per PwC Worldwide Tax Summaries.
- **France**: Malt, Free-Work, and Hays France TJM benchmarks 2026. Data roles average about 533 EUR a day, data
  science 550 to 900, senior from about 640, consultant median about 675, Île-de-France about 620 against 450 to
  540 in the regions. Employer contributions 42 to 45 percent, the highest in this set.
- **United Kingdom**: ITJobsWatch and ContractorUK, August 2026. Senior data engineer contract benchmark about
  555 GBP a day, median about 450, up to 700 or more for lead roles.
- **United States and Canada**: dataconsultingfirms.com and WebFX 2026. Senior data engineers 150 to 185 USD an
  hour, commoditised ETL 90 to 160, AI engineering architects 220 to 400.
- **Netherlands, Belgium, Nordics, Spain, Italy, Poland**: Index.dev, Rise, MarsDevs, and TechStaQ European rate
  guides 2026.

**Re-verify every 12 months.** These studies republish annually and the currency check tracks them. A rate
figure older than a year is the kind of detail a practice lead catches.

## Gaps, stated rather than filled

- **India and other offshore delivery**: no sourced figure. Ask the partner rather than extrapolating.
- **Switzerland**: materially above the DACH band and not separately sourced.
- **Middle East and Africa**: not covered.
- **Japan**: not covered here. The model has yen defaults, but its own comments say they are a conversion of the
  euro defaults and explicitly not a Japan benchmark, so treat them as placeholders and ask.
- **Consultancy rate cards** as opposed to contractor rates are not public at any useful scale, which is the
  reason these presets are a floor rather than a midpoint.

Where a gap applies, say so on the slide and use the partner's own figure. An honest gap costs nothing. An
invented benchmark costs the relationship.
