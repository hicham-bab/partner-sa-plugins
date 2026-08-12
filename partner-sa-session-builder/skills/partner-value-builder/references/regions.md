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
| Germany, top of band | 248k to 457k |
| Germany, floor of band | 190k to 350k |
| France, top of band | 200k to 368k |
| France, floor of band | 148k to 272k |

**Presenting the defaults to a French partner overstates their services revenue by roughly two to three times.**
That is not a rounding difference, it is the difference between a credible business case and one the partner's
practice lead dismisses in the first minute, because they know their own rate card better than we do.

## Always ask, then fall back to the country band

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

## Which country

**Country keys only, never a grouping.** An earlier version of this file grouped Benelux with the Nordics and
Spain with Italy and Portugal. That hid differences of up to two times. Same client, three-year services revenue
per client, each country at the top of its own band:

| Country | Senior day rate | Three-year revenue per client |
|---|---|---|
| Netherlands | 1,280 | 280k to 516k |
| Denmark | 1,180 | 278k to 512k |
| Sweden | 1,060 | 250k to 460k |
| Germany | 1,040 | 248k to 457k |
| Belgium | 1,000 | 233k to 430k |
| France | 900 | 200k to 368k |
| United Kingdom | 700 GBP | 162k to 298k |
| Ireland | 700 | 159k to 293k |
| Spain | 615 | 141k to 259k |
| Poland | 600 | 140k to 257k |

The Netherlands runs roughly twice Spain for identical work. Grouping those two produces a number that is wrong
for both, so passing a grouping asks you which country you mean instead:

```
$ node scripts/bva-run.mjs --region nordics
bva-run: "nordics" covers more than one country with materially different rates.
         Pick one: sweden, denmark, norway, finland.
```

Sourced keys: `france`, `germany`, `netherlands`, `belgium`, `uk`, `ireland`, `sweden`, `denmark`, `spain`,
`poland`, `us`, `latam-nearshore`.

Placeholder keys, flagged and warned about at run time: `austria` from Germany, `norway` from Denmark, `finland`
from Sweden, `italy` and `portugal` from Spain.

**UKI is two countries, not one.** The UK bills in pounds with a 15 percent employer contribution above a small
threshold; Ireland bills in euro with 11.05 to 11.85 percent, the lowest in western Europe. Never blend them,
and never quote an Irish partner a sterling figure.

Infer the country from the partner's location or the brief, then confirm it in the closing echo rather than
spending a discovery question. Ask outright when the deck language is English, since the UK, Ireland, the US, and
the Nordics all speak it and none of them share a band.

**A partner who sells in one country and delivers in another needs two rate cards**, and the model takes one. Run
the selling country for revenue and note the delivery country as a margin comment rather than blending them into
a single fictional rate. Poland and Portugal show up in this role constantly.

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

Held with the data in `data/regional-rates.json`, dated, per country, and printed by
`node scripts/bva-run.mjs --list-regions`. They belong on the appendix slide, not just in the file.

| Country | Behind the band |
|---|---|
| Germany | freelancermap Freelancer-Kompass 2026, over 5,400 freelancers: average 103 EUR an hour, IT median 95, data scientists and ML engineers 95 to 130 |
| France | Malt, Free-Work, and Hays France TJM benchmarks 2026: data roles about 533 EUR a day, data science 550 to 900, Île-de-France about 620 against 450 to 540 in the regions |
| Netherlands | Freelapp and ZZP rate guides 2026: senior data engineers 120 to 160 EUR an hour, ICT generally 60 to 130 |
| Belgium | dailyrate.be and Freelancers In Belgium 2026: junior 550 to 650, mid 650 to 750, senior 800 to 1,000 a day, from security engineering as the closest published proxy |
| United Kingdom | ITJobsWatch and ContractorUK, August 2026: senior data engineer about 555 GBP a day, median about 450, up to 700 plus for leads |
| Ireland | HERO 2026 Ireland IT contracting guide: IT average 572 EUR, median 500, senior specialists 850 plus. Morgan McKinley and PayMetric Labs: senior software engineers 400 to 550 |
| Sweden | Workamo and FindITconsultants 2026, citing the Brainville consultant index: median 1,100 to 1,300 SEK an hour, senior specialists 1,500 to 1,800 |
| Denmark | Same Swedish sources, which put Danish rates 5 to 15 percent above Sweden |
| Spain | tarifaautonomo 2026: 225 to 615 EUR a day across seniorities, senior data engineer on a 58,000 base at 390 to 465 |
| Poland | Index.dev and MarsDevs 2026: CEE seniors 40 to 70 EUR an hour, Polish seniors 50 to 75 USD, AI and ML seniors 75 to 115 USD |
| United States and Canada | dataconsultingfirms.com and WebFX 2026: senior data engineers 150 to 185 USD an hour, ETL 90 to 160, AI architects 220 to 400 |
| Employer contributions, all countries | countrytaxcalc employer payroll rates 2026, with PwC Worldwide Tax Summaries for Germany |

**Two conversions to know about.** Swedish and Danish bands are converted to euro at roughly 11.3 SEK and 7.46
DKK, August 2026, because the BVA app's currency picker offers only euro, dollar, pound, and yen. Indicative, not
a treasury rate, and worth saying if a Nordic partner queries a figure.

**Salary aggregators disagree badly**, which is why loaded-cost bands are wide. France alone returned published
averages of 46k, 47k, and 86k in the same month. A client's own figure always beats the band.

**Re-verify every 12 months.** These studies republish annually and the currency check tracks them.

## Gaps, stated rather than filled

**Placeholder bands**, derived from a neighbour and flagged as unsourced. The runner prints a warning when one is
used, and the slide has to say so:

| Country | Derived from | Why it is only a guess |
|---|---|---|
| Austria | Germany, minus about 10 percent | The usual market relationship, but no Austrian study |
| Norway | Denmark | Closest comparable market, but oil, gas, and public sector work distort Norwegian rates both ways |
| Finland | Sweden | No Finnish study found |
| Italy | Spain, plus 5 to 10 percent | No Italian study found, and Milan sits well above the national picture |
| Portugal | Spain, minus 10 to 15 percent | No Portuguese study found |

**No band at all:**

- **Switzerland**, materially above Germany and not sourced.
- **India and other offshore delivery**, no source specific to data engineering bill rates.
- **Middle East and Africa**, not covered.
- **Japan**, not covered. The app has yen defaults but its own comments say they are a conversion of the euro
  defaults and explicitly not a Japan benchmark, so treat them as placeholders.
- **Consultancy rate cards** as opposed to contractor rates, which are not public at any useful scale. This is
  why every band here is a floor rather than a midpoint.

Where a gap applies, say so on the slide and use the partner's own figure. An honest gap costs nothing. An
invented benchmark costs the relationship.
